//
//  NewArticleController.swift
//  ATP_Football
//
//  Created by Will Jones on 15/03/2023.
//

import Foundation
import UIKit
import Firebase

class NewArticleViewController: UIViewController {
    
    let db = Firestore.firestore()
    
    var category = ""
    
    @IBOutlet weak var contentTextView: UITextView!
    @IBOutlet weak var categoryPopUpButton: UIButton!
    @IBOutlet weak var titleTextField: UITextField!
    
    @IBOutlet weak var sourceImageTextField: UITextField!
    @IBOutlet weak var headerImageTextField: UITextField!
    @IBAction func postPressed(_ sender: UIButton) {
        let currentDate = Date()
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "MM-dd-yyyy HH:mm:ss"
        if let title = titleTextField.text,
        let headerImage = headerImageTextField.text,
        let sourceImage = sourceImageTextField.text,
        let date = dateFormatter.string(from: currentDate) as String?,
        let articleOrderDate = Date().timeIntervalSince1970 as Double?,
        let content = contentTextView.text {
            db.collection("articles").addDocument(data: [
                "title": title, "headerImage": headerImage, "sourceImage": sourceImage, "date": date, "articleOrderDate": articleOrderDate, "content": content, "category": category]) { (error) in
                    if let e = error {
                        print("There was an issue saving data to firestore, \(e)")
                    } else {
                        print("Successfully saved data")
                        self.navigationController?.popViewController(animated: true)
                    }
                }
        }
        
    }
    
    override func viewDidLoad() {
        self.tabBarController?.tabBar.isHidden = true
        super.viewDidLoad()
        setupPopUpButton()
    }
    
    @IBAction func backButton(_ sender: UIButton) {
        navigationController?.popViewController(animated: true)
    }
    func setupPopUpButton() {
            let leagues = ["BAFA", "BUCS", "ELF", "Other"]
            let optionClosure = {(action: UIAction) in
                self.category = action.title
            }
            var optionsArray = [UIAction]()
            for league in leagues{
                let action = UIAction(title: league, state: .off, handler: optionClosure)
                optionsArray.append(action)
            }
            optionsArray[0].state = .on
            let optionsMenu = UIMenu(title: "", options: .displayInline, children: optionsArray)
            self.categoryPopUpButton.menu = optionsMenu
            self.categoryPopUpButton.changesSelectionAsPrimaryAction = true
            self.categoryPopUpButton.showsMenuAsPrimaryAction = true
    }
}
