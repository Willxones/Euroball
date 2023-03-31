//
//  ArticleViewController.swift
//  ATP_Football
//
//  Created by Will Jones on 26/03/2023.
//

import Foundation
import UIKit

class ArticleViewController: UIViewController {
    
    @IBOutlet weak var articleContentLabel: VerticalTopAlignLabel!
    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var sourceImageView: UIImageView!
    @IBOutlet weak var articleTitleLabel: UILabel!
    @IBOutlet weak var articleImageView: UIImageView!
    @IBOutlet weak var StackView: UIStackView!
    @IBOutlet weak var ScrollView: UIScrollView!
    @IBOutlet weak var GradientView: GradientView!
    
    override func viewDidLoad() {
        self.tabBarController?.tabBar.isHidden = true
        super.viewDidLoad()
        GradientView.configureGradientLayer()
        ScrollView.contentInsetAdjustmentBehavior = .never
    }
    
}
