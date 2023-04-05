//
//  NewsViewController.swift
//  ATP_Football
//
//  Created by Will Jones on 13/03/2023.
//

import Foundation
import UIKit
import Firebase

class NewsViewController: UIViewController, UITableViewDelegate {
    let db = Firestore.firestore()
    
    @IBOutlet weak var LeagueBar: UIStackView!
    @IBOutlet weak var AllNewsButton: UIButton!
    @IBOutlet weak var ELFButton: UIButton!
    @IBOutlet weak var BUCSButton: UIButton!
    @IBOutlet weak var BAFAButton: UIButton!
    @IBOutlet weak var newsTableView: UITableView!
    
    var articles: [NewsArticle] = []

    override func viewDidLoad() {
        super.viewDidLoad()
        newsTableView.delegate = self
        newsTableView.dataSource = self
        newsTableView.register(UINib.init(nibName: "NewsCell", bundle: nil), forCellReuseIdentifier: "cell")
        loadArticles(league: "BAFA", allPage: true)
    }
    override func viewWillAppear(_ animated: Bool) {
        self.tabBarController?.tabBar.isHidden = false
    }
    
    @IBAction func AllNewsPressed(_ sender: UIButton) {
        if AllNewsButton.isSelected == false {
            loadArticles(league: "BAFA", allPage: true)
            BAFAButton.isSelected = false
            BUCSButton.isSelected = false
            ELFButton.isSelected = false
            AllNewsButton.isSelected = true
        }
    }
    
    @IBAction func BAFAPressed(_ sender: UIButton) {
        if BAFAButton.isSelected == false {
            loadArticles(league: "BAFA", allPage: false)
            BAFAButton.isSelected = true
            BUCSButton.isSelected = false
            ELFButton.isSelected = false
            AllNewsButton.isSelected = false
            
        }
    }
    @IBAction func BUCSPressed(_ sender: UIButton) {
        if BUCSButton.isSelected == false {
            loadArticles(league: "BUCS", allPage: false)
            BAFAButton.isSelected = false
            BUCSButton.isSelected = true
            ELFButton.isSelected = false
            AllNewsButton.isSelected = false
            
        }
    }
    @IBAction func ELFPressed(_ sender: UIButton) {
        if ELFButton.isSelected == false {
            loadArticles(league: "ELF", allPage: false)
            BAFAButton.isSelected = false
            BUCSButton.isSelected = false
            ELFButton.isSelected = true
            AllNewsButton.isSelected = false
        }
    }
    
    func loadArticles(league: String, allPage: Bool){
        self.articles = []
        if allPage == false {
            db.collection("articles").whereField("category", isEqualTo: league).order(by: "articleOrderDate", descending: true).getDocuments { querySnapshot, error in
                if let e = error {
                    print("Issue retrieving data from Firestore. \(e)")
                } else {
                    if let snapshotDocuments = querySnapshot?.documents {
                        for doc in snapshotDocuments {
                            let data = doc.data()
                            
                            if let articleTitle = data["title"] as? String,
                               let articleText = data["content"] as? String,
                               let articleSource = data["sourceImage"] as? String,
                               let articleDate = data["date"] as? String,
                               let articleOrderDate = data["articleOrderDate"] as? Double,
                               let articleCategory = ["category"].joined() as String?,
                               let articleImage = data["headerImage"] as? String, let articleID = doc.documentID as String? {
                                let newArticle = NewsArticle(articleTitle: articleTitle, articleText: articleText, articleImage: URL(string: articleImage)!, articleSource: URL(string: articleSource)!, articleDate: self.dateFormatter(datePosted: articleDate), articleOrderDate: articleOrderDate, articleCategory: articleCategory, articleID: articleID)
                                self.articles.append(newArticle)
                                DispatchQueue.main.async {
                                    self.newsTableView.reloadData()
                                }
                            } else {
                                print("There is no news available")
                            }
                        }
                    }
                }
            }
        } else {
            self.articles = []
            db.collection("articles").order(by: "articleOrderDate", descending: true).getDocuments { querySnapshot, error in
                if let e = error {
                    print("Issue retrieving data from Firestore. \(e)")
                } else {
                    if let snapshotDocuments = querySnapshot?.documents {
                        for doc in snapshotDocuments {
                            let data = doc.data()
                            
                            if let articleTitle = data["title"] as? String,
                               let articleText = data["content"] as? String,
                               let articleSource = data["sourceImage"] as? String,
                               let articleDate = data["date"] as? String,
                               let articleOrderDate = data["articleOrderDate"] as? Double,
                               let articleCategory = ["category"].joined() as String?,
                               let articleImage = data["headerImage"] as? String, let articleID = doc.documentID as String? {
                                let newArticle = NewsArticle(articleTitle: articleTitle, articleText: articleText, articleImage: URL(string: articleImage)!, articleSource: URL(string: articleSource)!, articleDate: self.dateFormatter(datePosted: articleDate), articleOrderDate: articleOrderDate, articleCategory: articleCategory, articleID: articleID)
                                self.articles.append(newArticle)
                                DispatchQueue.main.async {
                                    self.newsTableView.reloadData()
                                }
                            } else {
                                print("There is no news available")
                            }
                        }
                    }
                }
            }
        }
    }
    }


extension NewsViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return articles.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = newsTableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath) as! NewsCell
        cell.articleTitleLabel.text = articles[indexPath.row].articleTitle
        cell.articleDateLabel.text = articles[indexPath.row].articleDate
        cell.articleImageView.load(url: articles[indexPath.row].articleImage)
        cell.articleSourceImageView.load(url: articles[indexPath.row].articleSource)
        return cell
    }
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        SelectedArticle.selectedArticle = articles[indexPath.row].articleID
        let vc = storyboard?.instantiateViewController(withIdentifier: "articleViewController") as! ArticleViewController
        navigationController?.show(vc, sender: self)
    }
    
    func dateFormatter(datePosted: String) -> String {
        let fullDateFormatter = DateFormatter()
        let shortDateFormatter = DateFormatter()
        fullDateFormatter.dateFormat = "MM-dd-yyyy HH:mm:ss"
        shortDateFormatter.dateFormat = "MMM d"
        let shortDate = processDate(string: datePosted)
        let postedDate = fullDateFormatter.date(from: datePosted)
        let currentDate = Date().getFormattedDate(format: "MM-dd-yyyy HH:mm:ss")
        let formattedDate = fullDateFormatter.date(from: currentDate)
        let timeInterval = formattedDate!.timeIntervalSince(postedDate!)
        let minutesBetweenDates = Int(timeInterval / 60)
        let hoursBetweenDates = Int(timeInterval / (60 * 60))
        let daysBetweenDates = Int(timeInterval / (60 * 60 * 24))
        if daysBetweenDates > 6 {
            return shortDate!
        } else if daysBetweenDates > 0 {
            return "\(daysBetweenDates)d ago"
        } else {
            if hoursBetweenDates > 0 {
                return "\(hoursBetweenDates)h ago"
            } else {
                if minutesBetweenDates > 0 {
                    return "\(minutesBetweenDates)m ago"
                } else {
                    return "Just Now"
                }
            }
        }
        func processDate(string: String, fromFormat: String = "MM-dd-yyyy HH:mm:ss", toFormat: String = "MMM d") -> String? {
            let formatter = DateFormatter()

            formatter.dateFormat = fromFormat
            guard let date = formatter.date(from: string) else { return nil }

            formatter.dateFormat = toFormat
            return formatter.string(from: date)
        }
    }
    
    
}

extension UIImageView {
    func load(url: URL) {
        DispatchQueue.global().async { [weak self] in
            if let data = try? Data(contentsOf: url) {
                if let image = UIImage(data: data) {
                    DispatchQueue.main.async {
                        self?.image = image
                    }
                }
            } else {
                print("error")
            }
        }
    }
}

extension Date {
   func getFormattedDate(format: String) -> String {
        let dateformat = DateFormatter()
        dateformat.dateFormat = format
        return dateformat.string(from: self)
    }
}
