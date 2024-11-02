"use client";

import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listItems } from '../../graphql/queries';
import { createItem } from '../../graphql/mutations';
import { Item, CreateItemInput, TodoResponse } from '../../types/api';

const client = generateClient();

export const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await client.graphql({
        query: listItems,
        // authMode: 'apiKey',
        variables: {
          limit: 10
        }
      }) as TodoResponse;;
      setItems(response.data.listTodos.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateItem = async (input: CreateItemInput) => {
    try {
      const response = await client.graphql({
        query: createItem,
        // authMode: 'apiKey', 
        variables: { input }
      }) as TodoResponse;
      if (response.data) {
        setItems(prev => [...prev, response.data.createTodo]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating item');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <form 
        className="mb-6"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget as HTMLFormElement);
          handleCreateItem({
            name: formData.get('name') as string,
            description: formData.get('description') as string
          });
          (e.target as HTMLFormElement).reset();
        }}
      >
        <div className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="记录人"
            className="border p-2 rounded text-black"
            required
          />
          <input
            name="description"
            placeholder="记录事件"
            className="border p-2 rounded text-black"
            required
          />
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            添加
          </button>
        </div>
      </form>
      <h2 className="text-2xl font-bold mb-4">列表</h2>

      <div className="grid gap-4">
        {items.map(item => (
          <div key={item.id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">记录人：{item.name}</h3>
            <p className="text-50 font-semibold">记录事件：{item.description}</p>
            <small className="text-gray-500">
                id：{item.id}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};