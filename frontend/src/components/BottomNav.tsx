import React from 'react'
import { Link } from 'react-router-dom'

export default function BottomNav(){
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-lg py-2 px-3 flex justify-between items-center md:hidden">
      <Link to="/" className="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200">
        <span>🏠</span>
        <span>Home</span>
      </Link>
      <Link to="/jobs" className="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200">
        <span>💼</span>
        <span>Jobs</span>
      </Link>
      <Link to="/post-job" className="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200">
        <span>➕</span>
        <span>Post</span>
      </Link>
      <Link to="/messages" className="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200">
        <span>💬</span>
        <span>Msgs</span>
      </Link>
      <Link to="/profile/you" className="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200">
        <span>👤</span>
        <span>Profile</span>
      </Link>
    </nav>
  )
}
