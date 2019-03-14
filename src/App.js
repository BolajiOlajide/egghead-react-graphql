import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, ApolloConsumer } from 'react-apollo';
import Recipes from './Recipes';


const client = new ApolloClient({
  uri: 'http://localhost:4000'
});

// client
//   .query({
//     query: gql`
//       {
//         recipes {
//           id
//           title
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        {/* <ApolloConsumer>
          {
            client => {
                client
                  .query({
                    query: gql`
                      {
                        recipes {
                          id
                          title
                        }
                      }
                    `
                  })
                  .then(result => console.log(result));
                return null;
            }
          }
        </ApolloConsumer> */}
        <Recipes />
      </ApolloProvider>
    );
  }
}

export default App;
