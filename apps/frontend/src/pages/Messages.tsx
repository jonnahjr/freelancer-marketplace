import React from 'react';
import ChatBox from '../components/ChatBox';

export default function Messages() {
  return (
    <div className="bg-bg">
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-6 text-primary">Messages</h1>
        <div className="bg-surface p-6 rounded-xl shadow">
          <ChatBox />
        </div>
      </main>
    </div>
  );
}
