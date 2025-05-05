// Define the NotFoundPage component as a functional component
export default function NotFoundPage() {
  return (
    // Main container with center alignment and margin-top
    <div className="text-center mt-12">
      {/* Display the 404 error code with large, bold, and red color */}
      <h1 className="text-4xl font-bold text-red-400">404</h1>
      
      {/* Display a message indicating the page was not found */}
      <p className="text-lg">Page Not Found</p>
    </div>
  )
}