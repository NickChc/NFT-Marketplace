import { PropsWithChildren } from "react";


export function PageHeader({ children }: PropsWithChildren) {
    return <h1 className="mx-6 pt-4 font-semibold whitespace-nowrap text-2xl sm:text-3xl md:text-5xl">{children}</h1>
}