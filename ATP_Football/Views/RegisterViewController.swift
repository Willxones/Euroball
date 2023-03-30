//
//  RegisterViewController.swift
//  ATP_Football
//
//  Created by Will Jones on 10/03/2023.
//

import Foundation
import UIKit
import Firebase
import AVFoundation

class RegisterViewController: UIViewController {

    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var emailTextField: UITextField!
    @IBAction func registerPressed(_ sender: UIButton) {
        
        if let email = emailTextField.text, let password = passwordTextField.text {
            Auth.auth().createUser(withEmail: email, password: password) { authResult, error in
                if let e = error {
                    print(e)
                } else {
                    self.performSegue(withIdentifier: "registerToNews", sender: self)
                }
            }
        }
        
        
    }
    var avPlayer: AVPlayer!
    var avPlayerLayer: AVPlayerLayer!
    var paused: Bool = false
    override func viewDidLoad() {
        let theURL = Bundle.main.url(forResource:"welcomeVideo", withExtension: "mp4")

               avPlayer = AVPlayer(url: theURL!)
               avPlayerLayer = AVPlayerLayer(player: avPlayer)
               avPlayerLayer.videoGravity = .resizeAspectFill
               avPlayer.volume = 0
               avPlayer.actionAtItemEnd = .none

               avPlayerLayer.frame = view.layer.bounds
               view.backgroundColor = .clear
               view.layer.insertSublayer(avPlayerLayer, at: 0)

               NotificationCenter.default.addObserver(self,
                                                  selector: #selector(playerItemDidReachEnd(notification:)),
                                                  name: .AVPlayerItemDidPlayToEndTime,
                                                  object: avPlayer.currentItem)
    }
    @objc func playerItemDidReachEnd(notification: Notification) {
           let p: AVPlayerItem = notification.object as! AVPlayerItem
            p.seek(to: CMTime.zero, completionHandler: nil)
       }
    override func viewDidAppear(_ animated: Bool) {
            super.viewDidAppear(animated)
            avPlayer.play()
            paused = false
        }
    override func viewDidDisappear(_ animated: Bool) {
            super.viewDidDisappear(animated)
            avPlayer.pause()
            paused = true
        }

}



