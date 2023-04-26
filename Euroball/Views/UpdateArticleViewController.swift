import Foundation
import UIKit
import Firebase

class UpdateArticleViewController: UIViewController {
    let db = Firestore.firestore()
    
    var category = "BAFA"
    
    @IBOutlet weak var updateButton: UIButton!
    @IBOutlet weak var titleTextField: UITextField!
    @IBOutlet weak var headerImageTextField: UITextField!
    
    @IBOutlet weak var sourceImageTextField: UITextField!
    
    @IBOutlet weak var categoryPopUpButton: UIButton!
    @IBOutlet weak var contentTextView: UITextView!
    
    @IBAction func backButtonPressed(_ sender: UIButton) {
        navigationController?.popViewController(animated: true)
    }
    @IBAction func updateButtonPressed(_ sender: UIButton) {
        if let title = titleTextField.text,
        let headerImage = headerImageTextField.text,
        let sourceImage = sourceImageTextField.text,
        let articleOrderDate = Date().timeIntervalSince1970 as Double?,
        let content = contentTextView.text {
            db.collection("articles").document(SelectedArticle.selectedArticle).updateData([
                "title": title, "headerImage": headerImage, "sourceImage": sourceImage, "articleOrderDate": articleOrderDate, "content": content, "category": category]) { (error) in
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
        setupAllFields(fields: [titleTextField, sourceImageTextField, headerImageTextField])
        
    }
    override func viewDidAppear(_ animated: Bool) {
        titleTextField.text = SelectedArticle.articleTitle
        headerImageTextField.text = SelectedArticle.articleHeaderImage?.absoluteString
        sourceImageTextField.text = SelectedArticle.articleSourceImage?.absoluteString
        contentTextView.text = SelectedArticle.articleContent
    }
    func setupAllFields(fields: [UITextField]) {
        setUpTextFields(fields: fields)
        let whiteColor = CGColor(red: 255, green: 255, blue: 255, alpha: 1)
        contentTextView.layer.borderWidth = 1.0
        contentTextView.layer.cornerRadius = 10.0
        contentTextView.layer.borderColor = whiteColor
        categoryPopUpButton.layer.borderWidth = 1.0
        categoryPopUpButton.layer.cornerRadius = 10.0
        categoryPopUpButton.layer.borderColor = whiteColor
        updateButton.layer.cornerRadius = 10
        
    }
    func setUpTextFields(fields: [UITextField]) {
        for myTextField in fields {
            myTextField.layer.borderWidth = 1.0
            myTextField.layer.cornerRadius = 10.0
            myTextField.layer.borderColor = CGColor(red: 255, green: 255, blue: 255, alpha: 1)
        }
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
