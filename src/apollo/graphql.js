import gql from 'graphql-tag';

const queries = {
  crawl: gql`
    query crawl ($id: String!) {
      user {
        crawl(id: $id) {
          pages {
            id
            url
            links
          }
        }
      }
    }
  `,
  crawls: gql`
    query crawls {
      user {
        crawls {
          id
        }
      }
    }
  `,
};

const mutations = {
  crawl: gql`
    mutation crawl ($url: String!) {
      crawl(url: $url) {
        id
      }
    }
  `,
};

export default { queries, mutations };
