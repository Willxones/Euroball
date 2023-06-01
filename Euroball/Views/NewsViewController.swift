//
//  NewsViewController.swift
//  ATP_Football
//
//  Created by Will Jones on 13/03/2023.
//

import Foundation
import UIKit
import Firebase
import FirebaseStorage

class NewsViewController: UIViewController, UITableViewDelegate {
    let db = Firestore.firestore()
    var currentPage = 1
    @IBOutlet weak var addArticleView: UIView!
    @IBOutlet weak var addArticleButton: UIButton!
    @IBOutlet weak var LeagueBar: UIStackView!
    @IBOutlet weak var AllNewsButton: UIButton!
    @IBOutlet weak var ELFButton: UIButton!
    @IBOutlet weak var BUCSButton: UIButton!
    @IBOutlet weak var BAFAButton: UIButton!
    @IBOutlet weak var newsTableView: UITableView!
    
    @IBOutlet weak var GFLButton: UIButton!
    var articles: [NewsArticle] = []
    var headerImage: UIImage?

    override func viewDidLoad() {
        super.viewDidLoad()
        addArticleButton.layer.cornerRadius = 5
        ELFButton.layer.cornerRadius = 12
        ELFButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
        AllNewsButton.layer.cornerRadius = 12
        AllNewsButton.tintColor = UIColor(named: "DarkGreyBackground")
        AllNewsButton.layer.backgroundColor = CGColor(red: 0, green: 1, blue: 1, alpha: 1)
        GFLButton.layer.cornerRadius = 12
        GFLButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
        BAFAButton.layer.cornerRadius = 12
        BAFAButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
        BUCSButton.layer.cornerRadius = 12
        BUCSButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
        Auth.auth().currentUser?.getIDTokenResult(completion: { (result, error) in
            if let error = error {
                print("Error getting token: \(error)")
                return
            }
            if let isAdmin = result?.claims["admin"] as? Bool {
                if isAdmin {
                    self.addArticleView.isHidden = false
                } else {
                    print("is not admin")
                }
            } else {
                print("is not admin")
            }
        })
        newsTableView.delegate = self
        newsTableView.dataSource = self
        newsTableView.register(UINib.init(nibName: "NewsCell", bundle: nil), forCellReuseIdentifier: "cell")
        loadArticles()
    }
    override func viewWillAppear(_ animated: Bool) {
        self.tabBarController?.tabBar.isHidden = false
    }
    
    @IBAction func swipedRight(_ sender: UISwipeGestureRecognizer) {
        if ELFButton.tintColor == UIColor(named: "DarkGreyBackground") {
            AllNewsButton.tintColor = UIColor(named: "DarkGreyBackground")
            AllNewsButton.layer.backgroundColor = CGColor(red: 0, green: 1, blue: 1, alpha: 1)
            ELFButton.tintColor = UIColor(named: "EuroballPurple")
            ELFButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            reloadArticles()
            loadArticles()
        } else if GFLButton.tintColor == UIColor(named: "DarkGreyBackground") {
            ELFButton.tintColor = UIColor(named: "DarkGreyBackground")
            ELFButton.layer.backgroundColor = CGColor(red: 0, green: 1, blue: 1, alpha: 1)
            GFLButton.tintColor = UIColor(named: "EuroballPurple")
            GFLButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            reloadArticles()
            loadArticles(league: "ELF")
        } else if BAFAButton.tintColor == UIColor(named: "DarkGreyBackground") {
            GFLButton.tintColor = UIColor(named: "DarkGreyBackground")
            GFLButton.layer.backgroundColor = CGColor(red: 0, green: 1, blue: 1, alpha: 1)
            BAFAButton.tintColor = UIColor(named: "EuroballPurple")
            BAFAButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            reloadArticles()
            loadArticles(league: "GFL")
        } else if BUCSButton.tintColor == UIColor(named: "DarkGreyBackground") {
            BAFAButton.tintColor = UIColor(named: "DarkGreyBackground")
            BAFAButton.layer.backgroundColor = CGColor(red: 0, green: 1, blue: 1, alpha: 1)
            BUCSButton.tintColor = UIColor(named: "EuroballPurple")
            BUCSButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            reloadArticles()
            loadArticles(league: "BAFA")
        } else {
            return
        }
    }
    
    @IBAction func swipedLeft(_ sender: UISwipeGestureRecognizer) {
        if AllNewsButton.tintColor == UIColor(named: "DarkGreyBackground") {
            ELFButton.tintColor = UIColor(named: "DarkGreyBackground")
            ELFButton.layer.backgroundColor = CGColor(red: 0, green: 1, blue: 1, alpha: 1)
            AllNewsButton.tintColor = UIColor(named: "EuroballPurple")
            AllNewsButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            reloadArticles()
            loadArticles(league: "ELF")
        } else if ELFButton.tintColor == UIColor(named: "DarkGreyBackground") {
            GFLButton.tintColor = UIColor(named: "DarkGreyBackground")
            GFLButton.layer.backgroundColor = CGColor(red: 0, green: 1, blue: 1, alpha: 1)
            ELFButton.tintColor = UIColor(named: "EuroballPurple")
            ELFButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            reloadArticles()
            loadArticles(league: "GFL")
        } else if GFLButton.tintColor == UIColor(named: "DarkGreyBackground") {
            BAFAButton.tintColor = UIColor(named: "DarkGreyBackground")
            BAFAButton.layer.backgroundColor = CGColor(red: 0, green: 1, blue: 1, alpha: 1)
            GFLButton.tintColor = UIColor(named: "EuroballPurple")
            GFLButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            reloadArticles()
            loadArticles(league: "BAFA")
        } else if BAFAButton.tintColor == UIColor(named: "DarkGreyBackground") {
            BUCSButton.tintColor = UIColor(named: "DarkGreyBackground")
            BUCSButton.layer.backgroundColor = CGColor(red: 0, green: 1, blue: 1, alpha: 1)
            BAFAButton.tintColor = UIColor(named: "EuroballPurple")
            BAFAButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            reloadArticles()
            loadArticles(league: "BUCS")
        } else {
            return
        }
    }
    @IBAction func AllNewsPressed(_ sender: UIButton) {
        if AllNewsButton.tintColor != UIColor(named: "DarkGreyBackground") {
            reloadArticles()
            loadArticles()
            BAFAButton.tintColor = UIColor(named: "EuroballPurple")
            BAFAButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            BUCSButton.tintColor = UIColor(named: "EuroballPurple")
            BUCSButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            ELFButton.tintColor = UIColor(named: "EuroballPurple")
            ELFButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            GFLButton.tintColor = UIColor(named: "EuroballPurple")
            GFLButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            AllNewsButton.tintColor = UIColor(named: "DarkGreyBackground")
            AllNewsButton.layer.backgroundColor = CGColor(red: 0, green: 1, blue: 1, alpha: 1)
        }
    }
    
    @IBAction func BAFAPressed(_ sender: UIButton) {
        if BAFAButton.isSelected == false {
            reloadArticles()
            loadArticles(league: "BAFA")
            AllNewsButton.tintColor = UIColor(named: "EuroballPurple")
            AllNewsButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            BUCSButton.tintColor = UIColor(named: "EuroballPurple")
            BUCSButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            ELFButton.tintColor = UIColor(named: "EuroballPurple")
            ELFButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            GFLButton.tintColor = UIColor(named: "EuroballPurple")
            GFLButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            BAFAButton.tintColor = UIColor(named: "DarkGreyBackground")
            BAFAButton.layer.backgroundColor = CGColor(red: 0, green: 1, blue: 1, alpha: 1)
            
        }
    }
    @IBAction func BUCSPressed(_ sender: UIButton) {
        if BUCSButton.isSelected == false {
            reloadArticles()
            loadArticles(league: "BUCS")
            BAFAButton.tintColor = UIColor(named: "EuroballPurple")
            BAFAButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            AllNewsButton.tintColor = UIColor(named: "EuroballPurple")
            AllNewsButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            ELFButton.tintColor = UIColor(named: "EuroballPurple")
            ELFButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            GFLButton.tintColor = UIColor(named: "EuroballPurple")
            GFLButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            BUCSButton.tintColor = UIColor(named: "DarkGreyBackground")
            BUCSButton.layer.backgroundColor = CGColor(red: 0, green: 1, blue: 1, alpha: 1)
            
        }
    }
    @IBAction func ELFPressed(_ sender: UIButton) {
        if ELFButton.isSelected == false {
            reloadArticles()
            loadArticles(league: "ELF")
            BAFAButton.tintColor = UIColor(named: "EuroballPurple")
            BAFAButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            BUCSButton.tintColor = UIColor(named: "EuroballPurple")
            BUCSButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            AllNewsButton.tintColor = UIColor(named: "EuroballPurple")
            AllNewsButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            GFLButton.tintColor = UIColor(named: "EuroballPurple")
            GFLButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            ELFButton.tintColor = UIColor(named: "DarkGreyBackground")
            ELFButton.layer.backgroundColor = CGColor(red: 0, green: 1, blue: 1, alpha: 1)
        }
    }
    
    @IBAction func GFLPressed(_ sender: UIButton) {
        if GFLButton.isSelected == false {
            reloadArticles()
            loadArticles(league: "GFL")
            BAFAButton.tintColor = UIColor(named: "EuroballPurple")
            BAFAButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            BUCSButton.tintColor = UIColor(named: "EuroballPurple")
            BUCSButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            ELFButton.tintColor = UIColor(named: "EuroballPurple")
            ELFButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            AllNewsButton.tintColor = UIColor(named: "EuroballPurple")
            AllNewsButton.layer.backgroundColor = CGColor(red: 0.091, green: 0.092, blue: 0.092, alpha: 1)
            GFLButton.tintColor = UIColor(named: "DarkGreyBackground")
            GFLButton.layer.backgroundColor = CGColor(red: 0, green: 1, blue: 1, alpha: 1)
        }
    }
    
    @IBAction func morePressed(_ sender: UIButton) {
    }
    
    func reloadArticles() {
        DispatchQueue.main.async {
            self.newsTableView.reloadData()
        }
    }
    
    func loadArticles(league: String? = nil) {
        self.articles = []
        if league != nil {
            db.collection("articles").whereField("category", isEqualTo: league!).order(by: "articleOrderDate", descending: true).getDocuments { querySnapshot, error in
                if let e = error {
                    print("Issue retrieving data from Firestore. \(e)")
                } else {
                    self.addArticle(querySnapshot)
                }
            }
        } else {
            self.articles = []
            db.collection("articles").order(by: "articleOrderDate", descending: true).getDocuments { querySnapshot, error in
                if let e = error {
                    print("Issue retrieving data from Firestore. \(e)")
                } else {
                    self.addArticle(querySnapshot)
                }
            }
        }
    }
    func addArticle(_ querySnapshot:QuerySnapshot?){
        if let snapshotDocuments = querySnapshot?.documents {
            for doc in snapshotDocuments {
                let data = doc.data()
                if let articleTitle = data["title"] as? String,
                   let articleText = data["content"] as? String,
                   let articleSource = data["sourceImage"] as? String,
                   let articleDate = data["date"] as? String,
                   let articleOrderDate = data["articleOrderDate"] as? Double,
                   let articleCategory = ["category"].joined() as String?,
                   let articleImage = data["headerImageRef"] as? String, let articleID = doc.documentID as String? {
                    let storageRef = Storage.storage().reference()
                    let fileRef = storageRef.child("images/articles/headerImages/\(articleImage)")
                    fileRef.getData(maxSize: 5 * 1024 * 1024) { data, error in
                        if error == nil && data != nil {
                            let image = UIImage(data: data!)!
                            DispatchQueue.main.async {
                                let newArticle = NewsArticle(articleTitle: articleTitle, articleText: articleText, articleImage: image, articleSource: URL(string: articleSource)!, articleDate: self.dateFormatter(datePosted: articleDate), articleOrderDate: articleOrderDate, articleCategory: articleCategory, articleID: articleID)
                                self.articles.append(newArticle)
                                DispatchQueue.main.async {
                                    self.newsTableView.reloadData()
                                }
                            }
                            }else {
                                print("There is no news available")
                            }
                        }
                        } else {
                            print("Issue Getting Image")
                            return()
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
        cell.articleImageView.image = articles[indexPath.row].articleImage
        cell.articleSourceImageView.load(url: articles[indexPath.row].articleSource)
        return cell
    }
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        SelectedArticle.selectedArticle = articles[indexPath.row].articleID
        SelectedArticle.articleTitle = articles[indexPath.row].articleTitle
        SelectedArticle.articleHeaderImage = articles[indexPath.row].articleImage
        SelectedArticle.articleSourceImage = articles[indexPath.row].articleSource
        SelectedArticle.articleCategory = articles[indexPath.row].articleCategory
        SelectedArticle.articleContent = articles[indexPath.row].articleText
        let vc = storyboard?.instantiateViewController(withIdentifier: "articleViewController") as! ArticleViewController
        navigationController?.show(vc, sender: self)
    }
    func tableView(_ tableView: UITableView, willDisplay cell: UITableViewCell, forRowAt indexPath: IndexPath) {
        
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
