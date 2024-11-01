"use client";

import { Amplify } from 'aws-amplify';

export const configureAmplify = () => {
  Amplify.configure({
    API: {
      GraphQL: {
        endpoint: 'https://jn7xb4vkwfbp5bdkptkbmmwha4.appsync-api.ap-southeast-2.amazonaws.com/graphql',
        region: 'ap-southeast-2',
        authenticationType: 'API_KEY',
        apiKey: 'da2-epc3sa2emzbq3guyp2oua7f36u'
      }
    }
  });
};