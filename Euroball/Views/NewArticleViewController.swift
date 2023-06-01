//
//  NewArticleController.swift
//  ATP_Football
//
//  Created by Will Jones on 15/03/2023.
//

import Foundation
import UIKit
import Firebase
import FirebaseStorage

class NewArticleViewController: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    
    let db = Firestore.firestore()
    let storageRef = Storage.storage().reference()
    
    var category = "BAFA"
    var headerImageEntered = false
    
    @IBOutlet weak var sourceImageView: UIView!
    @IBOutlet weak var headerImageView: UIImageView!
    @IBOutlet weak var postButton: UIButton!
    @IBOutlet weak var contentTextView: UITextView!
    @IBOutlet weak var categoryPopUpButton: UIButton!
    @IBOutlet weak var titleTextField: UITextField!
    
    @IBOutlet weak var sourceImageTextField: UITextField!
    @IBAction func postPressed(_ sender: UIButton) {
        
            let currentDate = Date()
            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "MM-dd-yyyy HH:mm:ss"
            if let title = titleTextField.text,
               let sourceImage = sourceImageTextField.text,
               let date = dateFormatter.string(from: currentDate) as String?,
               let articleOrderDate = Date().timeIntervalSince1970 as Double?,
               let headerImageRef = "HI_\(articleOrderDate)" as String?,
               let content = contentTextView.text {
                guard headerImage != nil else {
                    return
                }
                let headerImageData = headerImage!.jpegData(compressionQuality: 0.8)
                guard headerImageData != nil else {
                    return
                }
                let fileRef = storageRef.child("images/articles/headerImages/HI_\(articleOrderDate)")
                _ = fileRef.putData(headerImageData!) { metadata, error in
                    if error == nil && metadata != nil {
                        self.db.collection("articles").addDocument(data: [
                            "title": title, "headerImageRef": headerImageRef, "sourceImage": sourceImage, "date": date, "articleOrderDate": articleOrderDate, "content": content, "category": self.category]) { (error) in
                                if let e = error {
                                    print("There was an issue saving data to firestore, \(e)")
                                } else {
                                    print("Successfully saved data")
                                    self.navigationController?.popViewController(animated: true)
                                }
                            }
                        return()
                    } else {
                        print(error ?? "No Metadata")
                    }
                }
                
        }
    }
    
    override func viewDidLoad() {
        self.tabBarController?.tabBar.isHidden = true
        super.viewDidLoad()
        setupPopUpButton()
        setupAllFields(fields: [titleTextField, sourceImageTextField])
        sourceImageView.isHidden = true
    }
    
    @IBAction func backButton(_ sender: UIButton) {
        navigationController?.popViewController(animated: true)
    }
    
    @IBAction func didChangeSegment(_ sender: UISegmentedControl) {
        if sender.selectedSegmentIndex == 0 {
            sourceImageView.isHidden = true
        } else if sender.selectedSegmentIndex == 1 {
            sourceImageView.isHidden = false
        } else {
            sourceImageView.isHidden = false
        }
    }
    @IBAction func selectHeaderImage(_ sender: UIButton) {
        let imagePickerController = UIImagePickerController()
        imagePickerController.delegate = self
        imagePickerController.sourceType = .photoLibrary
        self.present(imagePickerController, animated: true)
    }
    var headerImage: UIImage?
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        headerImage = info[UIImagePickerController.InfoKey.originalImage] as? UIImage
        headerImageView.image = headerImage
        picker.dismiss(animated: true)
    }
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        picker.dismiss(animated: true)
    }
    func uploadHeaderImage(uploadTime: Double) {
        guard headerImage != nil else {
            return
        }
        let headerImageData = headerImage!.jpegData(compressionQuality: 0.8)
        guard headerImageData != nil else {
            return
        }
        let fileRef = storageRef.child("images/articles/headerImages/HI_\(uploadTime)")
        _ = fileRef.putData(headerImageData!) { metadata, error in
            if error == nil && metadata != nil {
                print("Success")
                return()
            } else {
                print(error ?? "No Metadata")
            }
        }
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
        postButton.layer.cornerRadius = 10
        
    }
    
    func setUpTextFields(fields: [UITextField]) {
        for myTextField in fields {
            myTextField.layer.borderWidth = 1.0
            myTextField.layer.cornerRadius = 10.0
            myTextField.layer.borderColor = CGColor(red: 255, green: 255, blue: 255, alpha: 1)
        }
    }
    
    func setupPopUpButton() {
            let leagues = ["BAFA", "BUCS", "ELF", "GFL", "Other"]
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
