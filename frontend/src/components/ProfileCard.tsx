import React from 'react';

export default function ProfileCard({ profile }: any) {
  return (
    <div className="border p-4 rounded">
      <h3 className="text-lg font-semibold">{profile.displayName}</h3>
      <p>{profile.bio}</p>
    </div>
  );
}
