import gql from 'graphql-tag';

export const recipesQuery = gql`
    query recipes($vegetarian: Boolean!) {
        recipes(vegetarian: $vegetarian) {
            id
            title
            isStarred @client
        }
    }
`;