import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';


const client = new ApolloClient({
  uri: 'http://localhost:4000'
});

class App extends Component {
  render() {
    return (
      <div>Hello World!</div>
    );
  }
}

export default App;
