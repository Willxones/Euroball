//
//  NewsCell.swift
//  ATP_Football
//
//  Created by Will Jones on 12/03/2023.
//

import UIKit

class NewsCell: UITableViewCell {

    @IBOutlet weak var stackView: UIStackView!
    @IBOutlet weak var articleSourceImageView: UIImageView!
    @IBOutlet weak var articleImageView: UIImageView!
    @IBOutlet weak var articleDateLabel: UILabel!
    @IBOutlet weak var articleTitleLabel: UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        stackView.layer.cornerRadius = stackView.frame.size.height / 20
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
}
