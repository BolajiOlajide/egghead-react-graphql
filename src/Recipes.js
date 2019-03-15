import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { recipesQuery } from './recipesQuery';


export default class Recipes extends Component {
    state = {
        title: '',
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
                    <span>vegetarian</span>
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
