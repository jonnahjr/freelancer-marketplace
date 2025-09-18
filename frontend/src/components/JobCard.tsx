import React from 'react';
import { motion } from 'framer-motion';

export default function JobCard({ job }: any) {
  return (
    <motion.article
      whileHover={{ translateY: -6 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{job.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
            {job.description}
          </p>
        </div>
        <div className="text-right ml-4">
          <div className="text-sm text-gray-500">Budget</div>
          <div className="font-bold text-gray-900 dark:text-white">
            {job.amount ? `$${job.amount}` : 'TBD'}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {(job.skills || ['React', 'Tailwind']).slice(0, 4).map((s: string, i: number) => (
            <span
              key={i}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded border text-gray-600 dark:text-gray-300"
            >
              {s}
            </span>
          ))}
        </div>
        <a href={`/jobs/${job.id}`} className="text-sm text-primary hover:underline">
          View
        </a>
      </div>
    </motion.article>
  );
}
