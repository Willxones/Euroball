import { gql } from "@apollo/client";

export const GET_LEAGUES = gql`
  query GetLeagues($isActive: Boolean) {
    leagueCollection(
      where: { isActive: $isActive }
      order: sys_firstPublishedAt_DESC
    ) {
      items {
        name
        logo {
          url
        }
        sys {
          id
        }
        weeksCollection {
          items {
            sys {
              id
            }
            weekName
          }
        }
      }
    }
  }
`;
export const GET_WEEK_BY_ID = gql`
  query GetWeek($weekId: String!) {
    week(id: $weekId) {
      sys {
        id
      }
      weekName
      isPlayoffWeek
    }
  }
`;

export const GET_LEAGUE_BY_ID = gql`
  query GetLeague($leagueId: String!) {
    league(id: $leagueId) {
      sys {
        id
      }
      name
      logo {
        url
      }
    }
  }
`;

export const GET_DIVISIONS_BY_LEAGUE = gql`
  query GetDivisionsByLeague($leagueName: String!) {
    divisionCollection(
      order: sys_firstPublishedAt_ASC
      where: { league: { name: $leagueName } }
    ) {
      items {
        sys {
          id
        }
        name
      }
    }
  }
`;

export const GET_TEAMS_WITHIN_DIVISION = gql`
  query GetTeamsWithinDivision($divisionId: String!, $limit: Int!) {
    divisionCollection(where: { sys: { id: $divisionId } }) {
      items {
        sys {
          id
        }
        name
        teamsCollection(limit: $limit) {
          items {
            sys {
              id
            }
            locationName
            teamName
            logo {
              url
            }
            wins
            draws
            losses
            pointsFor
            pointsAgainst
          }
        }
      }
    }
  }
`;

export const GET_WEEKS_BY_LEAGUE = gql`
  query GetWeeksByLeague($limit: Int!, $leagueId: String!) {
    leagueCollection(where: { sys: { id: $leagueId } }) {
      items {
        sys {
          id
        }
        name
        weeksCollection(limit: $limit) {
          items {
            sys {
              id
            }
            weekName
            isPlayoffWeek
          }
        }
      }
    }
  }
`;

export const GET_GAMES_BY_WEEKS = gql`
  query GetGamesByWeeks($limit: Int!, $weekIds: [String!]) {
    gameCollection(
      limit: $limit
      order: dateAndTime_DESC
      where: { week: { sys: { id_in: $weekIds } } }
    ) {
      items {
        sys {
          id
        }
        dateAndTime
        week {
          sys {
            id
          }
          weekName
        }
        homeScore
        awayScore
      }
    }
  }
`;

export const GET_GAMES_BY_WEEK = gql`
  query GetGamesByWeek($limit: Int!, $weekId: String!) {
    gameCollection(
      limit: $limit
      order: dateAndTime_DESC
      where: { week: { sys: { id: $weekId } } }
    ) {
      items {
        sys {
          id
        }
        dateAndTime
        week {
          sys {
            id
          }
          weekName
        }
        homeTeam {
          sys {
            id
          }
          teamName
          locationName
          shortenedName
          logo {
            url
          }
        }
        awayTeam {
          sys {
            id
          }
          teamName
          locationName
          shortenedName
          logo {
            url
          }
        }
        homeScore
        awayScore
        relatedArticle {
          sys {
            id
          }
        }
        gameReplay
      }
    }
  }
`;

export const GET_ALL_GAMES = gql`
  query GetAllGames(
    $limit: Int!
    $skip: Int!
    $homeScoreExists: Boolean
    $awayScoreExists: Boolean
  ) {
    gameCollection(
      limit: $limit
      skip: $skip
      order: dateAndTime_DESC
      where: {
        OR: [
          { homeScore_exists: $homeScoreExists }
          { awayScore_exists: $awayScoreExists }
        ]
      }
    ) {
      items {
        sys {
          id
        }
        dateAndTime
        homeTeam {
          sys {
            id
          }
          teamName
          locationName
          shortenedName
          logo {
            url
          }
        }
        awayTeam {
          sys {
            id
          }
          teamName
          locationName
          shortenedName
          logo {
            url
          }
        }
        homeScore
        awayScore
        relatedArticle {
          sys {
            id
          }
        }
        gameReplay
        week {
          sys {
            id
          }
          weekName
          isPlayoffWeek
        }
      }
      total
    }
  }
`;

export const GET_ARTICLES_BY_LEAGUE = gql`
  query GetArticlesByLeague(
    $limit: Int!
    $skip: Int!
    $leagueName: String
    $searchQuery: String
  ) {
    articleCollection(
      limit: $limit
      skip: $skip
      order: sys_firstPublishedAt_DESC
      where: { league: { name: $leagueName }, title_contains: $searchQuery }
    ) {
      items {
        sys {
          id
          firstPublishedAt
        }
        title
        headerImage {
          url
        }
        content {
          json
        }
        author {
          firstName
          lastName
          avatar {
            url
          }
        }
        leagueCollection {
          items {
            name
            logo {
              url
            }
          }
        }
      }
      total
    }
  }
`;
export const GET_USER_BY_ID = gql`
  query GetUserById($id: String!) {
    user(id: $id) {
      firstName
      lastName
    }
  }
`;

export const GET_FEATURED_ARTICLES = gql`
  query GetFeaturedArticles {
    articleCollection(
      limit: 3
      order: sys_firstPublishedAt_DESC
      where: { contentfulMetadata: { tags: { id_contains_all: "featured" } } }
    ) {
      items {
        contentfulMetadata {
          tags {
            id
          }
        }
        sys {
          id
          firstPublishedAt
        }
        title
        headerImage {
          url
        }
        content {
          json
        }
        author {
          firstName
          lastName
          avatar {
            url
          }
        }
        leagueCollection {
          items {
            name
            logo {
              url
            }
          }
        }
      }
      total
    }
  }
`;

export const GET_ALL_ARTICLES = gql`
  query GetAllArticles($limit: Int!, $skip: Int!, $searchQuery: String) {
    articleCollection(
      limit: $limit
      skip: $skip
      order: sys_firstPublishedAt_DESC
      where: { title_contains: $searchQuery }
    ) {
      items {
        sys {
          id
          firstPublishedAt
        }
        title
        headerImage {
          url
        }
        content {
          json
        }
        author {
          firstName
          lastName
          avatar {
            url
          }
        }
        leagueCollection {
          items {
            name
            logo {
              url
            }
          }
        }
      }
      total
    }
  }
`;

export const GET_TEAM_BY_ID = gql`
  query GetTeamById($id: String!) {
    team(id: $id) {
      sys {
        id
      }
      teamName
      locationName
      shortenedName
      logo {
        url
      }
    }
  }
`;

export const GET_ARTICLE_BY_ID = gql`
  query GetArticleById($id: String!) {
    article(id: $id) {
      sys {
        id
        firstPublishedAt
      }
      title
      headerImage {
        url
      }
      author {
        firstName
        lastName
        role
        avatar {
          url
        }
        bio
      }
      content {
        json
      }
      leagueCollection {
        items {
          name
          logo {
            url
          }
        }
      }
    }
  }
`;

export const GET_ASSETS_BY_IDS = gql`
  query GetAssetsByIds($ids: [String!]!) {
    assets: assetCollection(where: { sys: { id_in: $ids } }) {
      items {
        sys {
          id
        }
        url
        title
        contentType
        description
      }
    }
  }
`;

export const GET_TWEETS_BY_IDS = gql`
  query GetTweetsByIds($ids: [String!]) {
    tweetCollection(where: { sys: { id_in: $ids } }) {
      items {
        sys {
          id
        }
        tweetId
      }
    }
  }
`;
