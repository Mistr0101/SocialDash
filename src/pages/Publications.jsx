export default function Publications() {
  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Publications
          </h2>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-blue-500"
          >
            New Post
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <p className="text-gray-500">No publications yet</p>
        </div>
      </div>
    </div>
  )
}
