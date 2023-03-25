//
//  NewsViewController.swift
//  ATP_Football
//
//  Created by Will Jones on 13/03/2023.
//

import Foundation
import UIKit
import Firebase

class NewsViewController: UIViewController {
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
        newsTableView.dataSource = self
        newsTableView.register(UINib.init(nibName: "NewsCell", bundle: nil), forCellReuseIdentifier: "cell")
        loadArticles(league: "BAFA", allPage: true)
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
                               let articleImage = data["headerImage"] as? String {
                                let newArticle = NewsArticle(articleTitle: articleTitle, articleText: articleText, articleImage: URL(string: articleImage)!, articleSource: URL(string: articleSource)!, articleDate: articleDate, articleOrderDate: articleOrderDate, articleCategory: articleCategory)
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
                               let articleImage = data["headerImage"] as? String {
                                let newArticle = NewsArticle(articleTitle: articleTitle, articleText: articleText, articleImage: URL(string: articleImage)!, articleSource: URL(string: articleSource)!, articleDate: articleDate, articleOrderDate: articleOrderDate, articleCategory: articleCategory)
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
