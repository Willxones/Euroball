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
    
    @IBOutlet weak var articleContentLabel: VerticalTopAlignLabel!
    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var sourceImageView: UIImageView!
    @IBOutlet weak var articleTitleLabel: UILabel!
    @IBOutlet weak var articleImageView: UIImageView!
    @IBOutlet weak var StackView: UIStackView!
    @IBOutlet weak var ScrollView: UIScrollView!
    @IBOutlet weak var GradientView: GradientView!
    
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
                self.dateLabel.text = articleDate
                self.articleContentLabel.text = content
            }
        }
    }
    
    override func viewDidLoad() {
        self.tabBarController?.tabBar.isHidden = true
        super.viewDidLoad()
        loadArticle()
        GradientView.configureGradientLayer()
        ScrollView.contentInsetAdjustmentBehavior = .never
    }
    
}
