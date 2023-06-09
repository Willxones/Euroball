//
//  GradientView.swift
//  ATP_Football
//
//  Created by Will Jones on 26/03/2023.
//

import Foundation
import UIKit

@IBDesignable public class GradientView: UIView {

    override open class var layerClass: AnyClass {
        return CAGradientLayer.classForCoder()
    }

    required public init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        configureGradientLayer()
    }

    public override init(frame: CGRect) {
        super.init(frame: frame)
        configureGradientLayer()
    }

    func configureGradientLayer() {
        let gradientLayer = layer as! CAGradientLayer
        gradientLayer.colors = [UIColor.clear.cgColor, UIColor.black.cgColor]
    }
}
