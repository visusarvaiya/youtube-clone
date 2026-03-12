import React from 'react'

function Logo() {
  return (
    <div className="flex items-center">
      <span className="inline-flex h-5 w-7 items-center justify-center rounded-sm bg-red-600 sm:h-6 sm:w-8">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-3 w-3 text-white"
        >
          <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
        </svg>
      </span>
      <span className="sr-only">YouTube</span>
    </div>
  )
}

export default Logo