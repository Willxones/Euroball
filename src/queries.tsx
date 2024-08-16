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