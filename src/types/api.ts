export interface Item {
    id: string;
    name: string;
    description: string;
    // createdAt: string;
    // updatedAt: string;
  }
  
  export interface ListItemsQuery {
    listItems: {
      items: Item[];
      nextToken?: string;
    }
  }
  
  export interface CreateItemInput {
    name: string;
    description: string;
  }
  
  export interface CreateItemMutation {
    createItem: Item;
  }