import React from 'react';
import { motion } from 'framer-motion';
import JobCard from '../components/JobCard';

const jobs = [
  {
    id: '1',
    title: 'Build a marketing website',
    description: 'React + Tailwind, 3 page site, responsive',
  },
  { id: '2', title: 'Design a landing page', description: 'Figma to HTML/CSS, conversion-focused' },
  { id: '3', title: 'Integrate payments', description: 'Stripe/Chapa integration with webhooks' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 16 } },
};

export default function Home() {
  return (
    <div className="bg-bg">
      <main className="container mx-auto px-6 py-12">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Find top freelance talent or your next great project
            </h1>
            <p className="text-gray-600 text-lg">
              Browse curated job posts, hire trusted freelancers, and manage contracts and payments
              — all in one beautiful place.
            </p>
            <div className="flex gap-4">
              <a className="btn-primary shadow" href="#jobs">
                Browse Jobs
              </a>
              <a
                className="inline-flex items-center px-6 py-3 border rounded-lg hover:shadow transition"
                href="/post-job"
              >
                Post a Job
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-surface rounded-2xl shadow p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Featured jobs</h3>
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
              {jobs.map((job) => (
                <motion.div key={job.id} variants={item}>
                  <JobCard job={job} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section id="jobs" className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Latest Jobs</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {jobs.concat(jobs).map((job, i) => (
              <motion.div key={`${job.id}-${i}`} variants={item}>
                <JobCard job={job} />
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
    </div>
  );
}
