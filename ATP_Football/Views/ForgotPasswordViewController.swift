//
//  ForgotPasswordViewController.swift
//  ATP_Football
//
//  Created by Will Jones on 25/04/2023.
//

import Foundation
import UIKit
import Firebase

class ForgotPasswordViewController: UIViewController {
    @IBOutlet weak var resetEmailSentStackView: UIStackView!
    @IBOutlet weak var backButton: UIButton!
    @IBOutlet weak var sendEmailButton: UIButton!
    @IBOutlet weak var emailTextField: UITextField!
    override func viewDidLoad() {
        super.viewDidLoad()
        setupAllFields()
    }
    @IBAction func sendEmailButtonPressed(_ sender: UIButton) {
        Auth.auth().sendPasswordReset(withEmail: emailTextField.text!) { (error) in
            if let error {
                print("\(error)")
            } else {
                self.emailTextField.text = ""
                self.resetEmailSentStackView.isHidden = false
            }
        }
    }
    func setupAllFields() {
        let whiteColor = CGColor(red: 255, green: 255, blue: 255, alpha: 1)
        emailTextField.layer.borderWidth = 1.0
        emailTextField.layer.cornerRadius = 10.0
        emailTextField.layer.borderColor = whiteColor
        backButton.layer.cornerRadius = 10
        sendEmailButton.layer.cornerRadius = 10
        
    }
    override func viewDidAppear(_ animated: Bool) {
        resetEmailSentStackView.isHidden = true
    }
}
