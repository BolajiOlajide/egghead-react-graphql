import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { recipesQuery } from './recipesQuery';
import gql from 'graphql-tag';


const updateRecipeStarredMutation = gql`
    mutation updateRecipeStarred($id: ID!, $isStarred: Boolean!) {
        updateRecipeStarred(id: $id, isStarred: $isStarred) @client
    }
`;

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
                    pollInterval={3000}
                >
                    {({ data, loading, error, refetch }) => {
                        if (loading) return <p>Loading...</p>
                        if (error) return <p>Something went wrong. {error.message} </p>
                        return (
                            <Fragment>
                                <ul>
                                    {data.recipes.map(({ id, title, isStarred }) => (
                                        <Fragment key={id}>
                                            <li key={id}>
                                                {title}
                                                <Mutation
                                                    mutation={updateRecipeStarredMutation}
                                                    refetchQueries={[
                                                        {
                                                            query: recipesQuery,
                                                            variables: { vegetarian: true }
                                                        },
                                                        {
                                                            query: recipesQuery,
                                                            variables: { vegetarian: false }
                                                        }
                                                    ]}
                                                    awaitRefetchQueries
                                                >
                                                    {(updateRecipeStarred, { loading, error }) => (
                                                        <button
                                                            onClick={() => updateRecipeStarred({
                                                                variables: {
                                                                    id,
                                                                    isStarred: !isStarred
                                                                }
                                                            })}
                                                            className="star-btn"
                                                            disabled={loading}
                                                            style={{
                                                                color: isStarred ? 'orange' : 'grey',
                                                                animation: loading ? 'inflate 0.7s ease infinte alternate' : 'none'
                                                            }}
                                                        >
                                                            * { error && 'Failed to update'}
                                                        </button>
                                                    )}
                                                </Mutation>
                                            </li>
                                        </Fragment>
                                    ))}
                                </ul>
                                <button onClick={() => refetch()}>Refresh Recipes</button>
                            </Fragment>
                        );
                    }}
                </Query>
            </Fragment>
        );
    }
}
