'use client' // Error components must be Client Components
 
// import { useEffect } from 'react'
 
export default function ErrorBoundary({
  error,
}: {
  error: Error & { digest?: string }
}) {
//   useEffect(() => {
//     // Log the error to an error reporting service
//     console.error(error)
//   }, [error])
 
  return (
    <div>
      <div className="text-5xl">Something went wrong!</div>
      {/* <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button> */}
    </div>
  )
}