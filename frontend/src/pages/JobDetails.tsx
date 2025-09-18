import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function JobDetails() {
  const { id } = useParams();
  return (
    <div className="bg-bg">
      <main className="container mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="bg-surface p-8 rounded-xl shadow">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold">Project: {id}</h1>
                <p className="text-muted mt-2">Full job description and requirements go here.</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted">Budget</div>
                <div className="font-bold text-lg text-primary">$1200</div>
                <button className="mt-4 px-4 py-2 btn-primary">Apply</button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
