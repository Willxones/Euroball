//
//  League.swift
//  Euroball
//
//  Created by Will Jones on 23/05/2023.
//

import Foundation

class League {
    let leagueName: String
    let divisions: [String]
    init(leagueName: String, divisions: [String]) {
        self.leagueName = leagueName
        self.divisions = divisions
    }
}
class Division {
    let divisionName: String
    let teams: [String]
    init(divisionName: String, teams: [String]) {
        self.divisionName = divisionName
        self.teams = teams
    }
}
class Team {
    let teamName: String
    init(teamName: String) {
        self.teamName = teamName
    }
}
