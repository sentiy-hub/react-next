export const createItem = /* GraphQL */ `
  mutation createTodo(
    $input: CreateTodoInput!
  ) {
    createTodo(input: $input) {
      id
      name
      description
    }
  }
`;