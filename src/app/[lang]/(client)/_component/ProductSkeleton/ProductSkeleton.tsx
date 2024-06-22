export function ProductSkeleton() {
  return (
    <div className="bg-gray-400 animate-pulse rounded-md m-2 p-3 flex flex-col justify-between gap-y-9">
      <div>
        <div className="w-full aspect-video  animate-pulse bg-gray-600 rounded-md"></div>
        <div className="bg-gray-600 w-[80%] animate-pulse min-h-4 rounded-lg my-3"></div>
        <div className="bg-gray-600 w-full animate-pulse min-h-2 rounded-lg my-3"></div>
        <div className="bg-gray-600 w-[70%] animate-pulse min-h-2 rounded-lg my-3"></div>
      </div>
      <div className="w-full min-h-6 rounded-md animate-pulse bg-gray-600"></div>
    </div>
  );
}
