//
//  ArticleViewController.swift
//  ATP_Football
//
//  Created by Will Jones on 26/03/2023.
//

import Foundation
import UIKit

class ArticleViewController: UIViewController {
    
    @IBOutlet weak var GradientView: GradientView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        GradientView.configureGradientLayer()
    }
    
}
