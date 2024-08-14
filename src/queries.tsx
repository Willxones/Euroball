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

export const GET_ARTICLES_BY_LEAGUE = gql`
  query GetArticlesByLeague($limit: Int!, $skip: Int!, $leagueName: String) {
    articleCollection(
      limit: $limit
      skip: $skip
      order: sys_firstPublishedAt_DESC
      where: {
        league: { name: $leagueName }
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

export const GET_ALL_ARTICLES = gql`
  query GetAllArticles($limit: Int!, $skip: Int!) {
    articleCollection(
      limit: $limit
      skip: $skip
      order: sys_firstPublishedAt_DESC
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
