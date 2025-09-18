import React from 'react';

export default function PostJob() {
  return (
    <div className="bg-bg">
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6 text-primary">Post a job</h1>
        <div className="bg-surface p-8 rounded-xl shadow">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted">Title</label>
              <input className="mt-1 block w-full border rounded px-3 py-2 bg-surface" />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted">Description</label>
              <textarea className="mt-1 block w-full border rounded px-3 py-2 h-32 bg-surface" />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="px-6 py-2 btn-primary">Post</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
