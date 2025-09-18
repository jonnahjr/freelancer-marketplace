import React from 'react';
import { User } from '@freelancer-marketplace/types';

export function TypesExample() {
  const sampleUser: User = { id: 'u1', name: 'Alice', email: 'alice@example.com', role: 'freelancer' };
  // This component is a no-op example to show how to import shared types
  console.log('TypesExample sampleUser', sampleUser);
  return <div style={{ display: 'none' }} />;
}

export default TypesExample;
