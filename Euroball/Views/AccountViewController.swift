//
//  AccountViewController.swift
//  ATP_Football
//
//  Created by Will Jones on 13/03/2023.
//
import Firebase
import Foundation
import UIKit
import FirebaseFunctions

class AccountViewController: UIViewController {
    
    lazy var functions = Functions.functions()
    
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
    let user = Auth.auth().currentUser
    let userEmail = Auth.auth().currentUser?.email
    @IBAction func makeAdminPressed(_ sender: UIButton){
        functions.httpsCallable("addAdminRole").call(["email": userEmail]) { result, error in
          if let error = error as NSError? {
            if error.domain == FunctionsErrorDomain {
            /*
             Error handling constants
              let code = FunctionsErrorCode(rawValue: error.code)
              let message = error.localizedDescription
              let details = error.userInfo[FunctionsErrorDetailsKey]
            */
            }
              self.user?.getIDTokenResult {
                  (result, error) in
                  guard let admin = result?.claims["admin"] as? Bool else {
                          print("Error")
                          return
                      }
                  if admin {
                      print("User is an admin")
                  } else {
                      print("User is not an admin")
                  }
              }
          }
        }
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        userEmailLabel.text = userEmail
    }


}
