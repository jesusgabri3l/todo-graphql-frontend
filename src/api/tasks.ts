import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";

function getTasksByUserID(userID: string) {
  const { result, loading, onResult, refetch } = useQuery(gql`
    query taskByUser($userID: ID!) {
      tasksByUser(userID: $userID) {
        response {
          status
          message
        }
        tasks {
          id
          title
          description
          status
        }
      }
    }
  `, {userID: userID});
  return { result, loading, onResult, refetch };
}

export { getTasksByUserID };
