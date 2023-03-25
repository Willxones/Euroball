//
//  LoginViewController.swift
//  ATP_Football
//
//  Created by Will Jones on 10/03/2023.
//

import Foundation
import UIKit
import Firebase

class LoginViewController: UIViewController {

    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var emailTextField: UITextField!
    @IBAction func signInToNews(_ sender: UIButton) {
        if let email = emailTextField.text, let password = passwordTextField.text {
            Auth.auth().signIn(withEmail: email, password: password) {  authResult, error in
                if let e = error {
                    print(e)
                } else {
                    self.performSegue(withIdentifier: "signInToNews", sender: self)
                }
            }
        }
        
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

}
