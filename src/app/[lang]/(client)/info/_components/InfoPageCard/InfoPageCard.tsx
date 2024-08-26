import Image, { StaticImageData } from "next/image";
import { PropsWithChildren } from "react";

interface InfoPageCardProps {
  image: StaticImageData;
  title: string;
}

export function InfoPageCard({
  children,
  image,
  title,
}: PropsWithChildren<InfoPageCardProps>) {
  return (
    <div className="flex flex-col items-start odd:sm:flex-row even:sm:flex-row-reverse sm:text-center gap-3 sm:gap-6 px-1 my-2 sm:my-6">
      <div className="relative w-full sm:min-w-[300px] sm:w-[300px] md:min-w-[400px] md:w-[400px] lg:min-w-[40%] lg:w-[40%] aspect-video inline-block sm:mt-9">
        <Image
          priority
          src={image}
          alt={`Image for ${title}`}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div>
        <h3 className="text-xl md:text-2xl mb-3 font-semibold">{title}</h3>
        <div>{children}</div>
      </div>
    </div>
  );
}
