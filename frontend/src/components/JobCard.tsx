import React from 'react';
import { motion } from 'framer-motion';

export default function JobCard({ job }: any) {
  return (
    <motion.article
      whileHover={{ translateY: -6, boxShadow: '0 10px 30px rgba(2,6,23,0.08)' }}
      className="bg-surface rounded-xl p-5 border border-transparent"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-primary">{job.title}</h3>
          <p className="text-sm text-muted mt-1">{job.description}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted">Budget</div>
          <div className="font-bold text-primary">$500</div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          <span className="px-2 py-1 text-xs bg-surface rounded border text-muted">React</span>
          <span className="px-2 py-1 text-xs bg-surface rounded border text-muted">Tailwind</span>
        </div>
        <a href={`/jobs/${job.id}`} className="text-sm text-primary hover:underline">View</a>
      </div>
    </motion.article>
  );
}
