export function OfferViewSkeleton() {
  return (
    <div className="w-[85vw] md:w-[50vw] 2xl:w-[40vw] max-w-[90%] mx-auto">
      <div className="w-full aspect-video bg-gray-500 animate-pulse rounded-md"></div>
      <div className="my-3 min-h-4 bg-gray-400 animate-pulse rounded-lg w-full"></div>
      <div className="my-2 min-h-4 bg-gray-400 animate-pulse rounded-lg w-[60%] block sm:hidden"></div>
      <div className="min-h-6 rounded-lg w-16 bg-gray-600 animate-pulse my-4 "></div>
      <div className="mt-6 flex justify-between gap-x-4">
        <div className="w-full min-h-6 rounded-md bg-gray-400 animate-pulse"></div>
        <div className="w-full min-h-8 rounded-md bg-gray-400 animate-pulse"></div>
      </div>
    </div>
  );
}
