import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-boost';

export default new VueApollo({
  defaultClient: new ApolloClient({
    uri: 'https://grapher.caryjonathan.com/api/graphql',
  }),
});
