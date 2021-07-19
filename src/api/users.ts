import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';

function getUsers () 
{
    const {result, loading} = useQuery(gql`
          query getUsers {
            users{
              name
              username
            }
          }
        `);
    return {result, loading};
}

export {getUsers};
