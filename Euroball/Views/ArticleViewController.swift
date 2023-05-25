//
//  ArticleViewController.swift
//  ATP_Football
//
//  Created by Will Jones on 26/03/2023.
//

import Foundation
import UIKit
import Firebase

class ArticleViewController: UIViewController {
    let db = Firestore.firestore()
    
    @IBOutlet weak var deleteArticleButton: UIButton!
    @IBOutlet weak var updateArticleButton: UIButton!
    @IBOutlet weak var articleContentLabel: VerticalTopAlignLabel!
    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var sourceImageView: UIImageView!
    @IBOutlet weak var articleTitleLabel: UILabel!
    @IBOutlet weak var articleImageView: UIImageView!
    @IBOutlet weak var StackView: UIStackView!
    @IBOutlet weak var ScrollView: UIScrollView!
    @IBOutlet weak var GradientView: GradientView!
    
    @IBAction func backButtonPressed(_ sender: UIButton) {
        navigationController?.popViewController(animated: true)
    }
    @IBAction func swipeRight(_ sender: UISwipeGestureRecognizer) {
        navigationController?.popViewController(animated: true)
    }
    func loadArticle() {
        db.collection("articles").document(SelectedArticle.selectedArticle).getDocument { (document, error) in
            if let document = document, document.exists,
            let articleTitle = document.get("title") as? String,
               let articleImage = document.get("headerImage") as? String,
               let articleSource = document.get("sourceImage") as? String,
               let articleDate = document.get("date") as? String,
               let content = document.get("content") as? String {
                self.articleTitleLabel.text = articleTitle
                self.articleImageView.load(url: URL(string: articleImage)!)
                self.sourceImageView.load(url: URL(string: articleSource)!)
                self.dateLabel.text = self.dateFormatter(datePosted: articleDate)
                self.articleContentLabel.text = content
            }
        }
    }
    override var prefersStatusBarHidden: Bool {
        return true
    }
    
    override func viewDidLoad() {
        self.tabBarController?.tabBar.isHidden = true
        super.viewDidLoad()
        loadArticle()
        GradientView.configureGradientLayer()
        ScrollView.contentInsetAdjustmentBehavior = .never
        Auth.auth().currentUser?.getIDTokenResult(completion: { (result, error) in
            if let error = error {
                print("Error getting token: \(error)")
                return
            }
            if let isAdmin = result?.claims["admin"] as? Bool {
                if isAdmin {
                    self.updateArticleButton.isHidden = false
                    self.deleteArticleButton.isHidden = false
                } else {
                    print("is not admin")
                }
            } else {
                print("is not admin")
            }
        })
        
    }
    
    func update(number:String) {
        if number == "Edit" {
            print("Edit selected")
            
        }
    }
    
    @IBAction func deleteButtonPressed(_ sender: UIButton) {
        let alert = UIAlertController(title: "Are you sure?", message: "This will permanently delete the article", preferredStyle: .actionSheet)
        let deleteAction = UIAlertAction(title: "Delete", style: .destructive) { (action) in
            self.db.collection("articles").document(SelectedArticle.selectedArticle).delete() { err in
                if let err = err {
                    print("Error removing document: \(err)")
                } else {
                    print("Document successfully removed!")
                    self.navigationController?.popViewController(animated: true)
                }
            }
        }
        let cancelAction = UIAlertAction(title: "Cancel", style: .default)
        alert.addAction(deleteAction)
        alert.addAction(cancelAction)
        present(alert, animated: true, completion: nil)
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
