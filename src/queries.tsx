import { gql } from '@apollo/client';

export const GET_LEAGUES = gql`
  query GetLeagues {
    leagueCollection {
      items {
        name
        logo {
          url
        }
      }
    }
  }
`;

export const GET_ARTICLES = gql`
  query GetArticles($limit: Int!, $skip: Int!) {
    articleCollection(limit: $limit, skip: $skip, order: sys_firstPublishedAt_DESC) {
      items {
        sys {
          id
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
        sys {
          firstPublishedAt
        }
      }
      total
    }
  }
`;