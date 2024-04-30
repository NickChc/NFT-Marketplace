"use client";

interface ErrorPageProps {
  error: {
    message: string;
  };
}

export default function ErrorPage({ error }: ErrorPageProps) {
  return <h1 className="text-xl sm:text-3xl font-bold">{error.message}</h1>;
}
