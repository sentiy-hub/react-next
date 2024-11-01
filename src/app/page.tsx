"use client";

import React from 'react';
import { configureAmplify } from '../config/amplify-config';
import { ItemList } from './components/ItemList';

// 初始化 Amplify 配置
configureAmplify();

const App: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-6">AppSync Demo</h1>
      <ItemList />
    </div>
  );
};

export default App;