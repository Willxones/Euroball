//
//  ViewController.swift
//  ATP_Football
//
//  Created by Will Jones on 09/03/2023.
//

import UIKit
import AVFoundation
import Firebase

class ViewController: UIViewController {
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
        if Auth.auth().currentUser != nil {
            let storyboard = UIStoryboard(name: "Main", bundle: nil)
            let initialViewController = storyboard.instantiateViewController(withIdentifier: "mainTabVC")
            self.view.window!.rootViewController = initialViewController
        } else { return }
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

