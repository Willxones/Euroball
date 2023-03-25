//
//  AccountViewController.swift
//  ATP_Football
//
//  Created by Will Jones on 13/03/2023.
//

import Foundation
import UIKit
import Firebase

class AccountViewController: UIViewController {

    @IBOutlet weak var userEmailLabel: UILabel!
    @IBAction func logoutButtonPressed(_ sender: UIButton) {
        let firebaseAuth = Auth.auth()
        do {
          try firebaseAuth.signOut()
            self.performSegue(withIdentifier: "logoutSegue", sender: self)
            
        } catch let signOutError as NSError {
          print("Error signing out: %@", signOutError)
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        userEmailLabel.text = Auth.auth().currentUser?.email
    }


}
