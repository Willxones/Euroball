//
//  loadingView.swift
//  Euroball
//
//  Created by Will Jones on 22/05/2023.
//

import Foundation
import UIKit
import NVActivityIndicatorView



class LoadingViewController: UIViewController {
    @IBOutlet weak var activityIndicator: NVActivityIndicatorView!
    override func viewDidLoad() {
        self.tabBarController?.tabBar.isHidden = true
        super.viewDidLoad()
        activityIndicator.startAnimating()
    }
}
