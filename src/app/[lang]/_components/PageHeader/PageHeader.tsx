import { PropsWithChildren } from "react";


export function PageHeader({ children }: PropsWithChildren) {
    return <h1 className="mx-6 mt-4 font-semibold text-3xl md:text-5xl">{children}</h1>
}