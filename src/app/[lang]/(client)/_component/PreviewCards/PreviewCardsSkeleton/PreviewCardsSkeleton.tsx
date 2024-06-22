export function PreviewCardsSkeleton() {
  return (
    <>
      <div className="flex  justify-between items-center gap-x-4 max-w-fit">
        <div className="w-40 min-h-6 my-6 bg-gray-500 animate-pulse rounded-lg"></div>
        <div className="w-40 min-h-6 my-6 bg-gray-500 animate-pulse rounded-lg"></div>
      </div>
      <div className="w-full min-h-80 bg-gray-300 my-3 rounded-sm animate-pulse grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <div className="bg-gray-400 animate-pulse rounded-md m-2 p-3 flex flex-col justify-between gap-y-9">
          <div>
            <div className="w-full aspect-video  animate-pulse bg-gray-600 rounded-md"></div>
            <div className="bg-gray-600 w-[80%] animate-pulse min-h-4 rounded-lg my-3"></div>
            <div className="bg-gray-600 w-full animate-pulse min-h-2 rounded-lg my-3"></div>
            <div className="bg-gray-600 w-[70%] animate-pulse min-h-2 rounded-lg my-3"></div>
          </div>
          <div className="w-full min-h-6 rounded-md animate-pulse bg-gray-600"></div>
        </div>
        <div className="bg-gray-400 animate-pulse rounded-md m-2 p-3 flex flex-col justify-between gap-y-9">
          <div>
            <div className="w-full aspect-video  animate-pulse bg-gray-600 rounded-md"></div>
            <div className="bg-gray-600 w-[80%] animate-pulse min-h-4 rounded-lg my-3"></div>
            <div className="bg-gray-600 w-full animate-pulse min-h-2 rounded-lg my-3"></div>
            <div className="bg-gray-600 w-[70%] animate-pulse min-h-2 rounded-lg my-3"></div>
          </div>
          <div className="w-full min-h-6 rounded-md animate-pulse bg-gray-600"></div>
        </div>
        <div className="bg-gray-400 animate-pulse rounded-md m-2 p-3 flex flex-col justify-between gap-y-9">
          <div>
            <div className="w-full aspect-video  animate-pulse bg-gray-600 rounded-md"></div>
            <div className="bg-gray-600 w-[80%] animate-pulse min-h-4 rounded-lg my-3"></div>
            <div className="bg-gray-600 w-full animate-pulse min-h-2 rounded-lg my-3"></div>
            <div className="bg-gray-600 w-[70%] animate-pulse min-h-2 rounded-lg my-3"></div>
          </div>
          <div className="w-full min-h-6 rounded-md animate-pulse bg-gray-600"></div>
        </div>
      </div>
    </>
  );
}
