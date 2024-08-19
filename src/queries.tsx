import { gql } from '@apollo/client';

export const GET_LEAGUES = gql`
  query GetLeagues {
    leagueCollection (
      order: sys_firstPublishedAt_ASC
    ) {
      items {
        name
        logo {
          url
        }
      }
    }
  }
`;

export const GET_WEEKS_BY_LEAGUE = gql`
  query GetWeeksByLeague($limit: Int!, $leagueName: String) {
    weekCollection(
      limit: $limit
      order: sys_firstPublishedAt_ASC
      where: {
        league: { name: $leagueName }
      }
    ) {
      items {
        sys {
          id
        }
        weekName
        isPlayoffWeek
      }
    }
  }
`;

export const GET_GAMES_BY_WEEKS = gql`
  query GetGamesByWeeks($limit: Int!, $weekIds: [String!]) {
    gameCollection(
      limit: $limit
      order: dateAndTime_DESC
      where: {
        week: { sys: { id_in: $weekIds } }
      }
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
      where: {
        week: { sys: { id: $weekId } }
      }
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
      }
    }
  }
`;


export const GET_ARTICLES_BY_LEAGUE = gql`
  query GetArticlesByLeague($limit: Int!, $skip: Int!, $leagueName: String, $searchQuery: String) {
    articleCollection(
      limit: $limit
      skip: $skip
      order: sys_firstPublishedAt_DESC
      where: {
        league: { name: $leagueName }
        title_contains: $searchQuery
      }
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

export const GET_ALL_ARTICLES = gql`
  query GetAllArticles($limit: Int!, $skip: Int!, $searchQuery: String) {
    articleCollection(
      limit: $limit
      skip: $skip
      order: sys_firstPublishedAt_DESC
      where: {
        title_contains: $searchQuery
      }
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
`


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
      }
    }
  }
`;