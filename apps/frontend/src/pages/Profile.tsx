import React from 'react';
import { useParams } from 'react-router-dom';

export default function Profile() {
  const { id } = useParams();
  return (
    <div className="bg-bg">
      <main className="container mx-auto px-6 py-12">
        <div className="bg-surface p-8 rounded-xl shadow">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-surface border rounded-full" />
            <div>
              <h2 className="text-2xl font-bold text-primary">Freelancer Name</h2>
              <p className="text-muted">{id ? `Profile id: ${id}` : 'Full profile'}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
