//
//  NewsArticle.swift
//  ATP_Football
//
//  Created by Will Jones on 13/03/2023.
//

import Foundation
import Firebase
import UIKit

class NewsArticle {
    let articleTitle: String
    let articleText: String
    let articleImage: URL
    let articleSource: URL
    let articleDate: String
    let articleCategory: String
    
    init(articleTitle: String, articleText: String, articleImage: URL, articleSource: URL, articleDate: String, articleCategory: String) {
        self.articleTitle = articleTitle
        self.articleText = articleText
        self.articleImage = articleImage
        self.articleSource = articleSource
        self.articleDate = articleDate
        self.articleCategory = articleCategory
    }
}
