export const listItems = /* GraphQL */ `
  query listTodos($limit: Int, $nextToken: String) {
    listTodos(limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
      }
      nextToken
    }
  }
`;
