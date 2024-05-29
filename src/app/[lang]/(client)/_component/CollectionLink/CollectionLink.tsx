"use client";

import { useEffect, useState } from "react";
import { NavLink } from "@/app/[lang]/_components/NavLink";
import { auth } from "@/firebase";
import { useAuthProvider } from "@/providers/AuthProvider";

interface CollectionLinkProps {
  title: string;
  path: string;
}

export function CollectionLink({ title, path }: CollectionLinkProps) {
  const { currentUser } = useAuthProvider();
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (auth.currentUser && currentUser) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [auth.currentUser, currentUser]);

  if (show) {
    return <NavLink title={title} path={path} />;
  }

  return null;
}
