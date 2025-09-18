import React from 'react';
import JobCard from '../components/JobCard';
import { motion } from 'framer-motion';

const dummy = Array.from({ length: 8 }).map((_, i) => ({
  id: String(i),
  title: `Job ${i + 1}`,
  description: 'Short description',
}));

export default function Jobs() {
  return (
    <div className="bg-bg">
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6 text-primary">Jobs</h1>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dummy.map((j) => (
            <motion.div key={j.id} whileHover={{ scale: 1.02 }}>
              <JobCard job={j} />
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
