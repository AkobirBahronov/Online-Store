import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://endpoint-scando.herokuapp.com/",
  cache: new InMemoryCache(),
});

export const fetchingData = async (query) => {
  try {
    const response = await client.query({
      query: gql`
        ${query}
      `,
    });
    return { data: response.data };
  } catch (error) {
    return { error: error.message };
  }
};
