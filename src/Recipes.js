import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';


const recipesQuery = gql`
    query recipes($vegetarian: Boolean!) {
        recipes(vegetarian: $vegetarian) {
            id
            title
        }
    }
`;

export default class Recipes extends Component {
    state = {
        vegetarian: false
    }

    updateVegetarianStatus = ({ target: { checked} }) => {
        this.setState({ vegetarian: checked });
    }

    render() {
        return (
            <Fragment>
                <label>
                    <input
                        type="checkbox"
                        checked={this.state.vegetarian}
                        onChange={this.updateVegetarianStatus}
                    />
                </label>
                <Query
                    query={recipesQuery}
                    variables={{ vegetarian: this.state.vegetarian }}
                >
                    {({ data, loading, error }) => {
                    if (loading) return <p>Loading...</p>
                    if (error) return <p>Something went wrong. {error.message} </p>
                    return (
                        <ul>
                        {data.recipes.map(({ id, title }) => <li key={id}>{title}</li>)}
                        </ul>
                    );
                    }}
                </Query>
            </Fragment>
        );
    }
}
