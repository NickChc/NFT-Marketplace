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
    <div className="flex flex-col odd:sm:flex-row even:sm:flex-row-reverse text-center gap-3 sm:gap-6 px-1 ">
      <div className="relative min-w-full sm:min-w-[35%] aspect-video">
        <Image src={image} alt={`Image for ${title}`} fill />
      </div>
      <div>
        <h3 className="text-xl mb-3 font-semibold">{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}
