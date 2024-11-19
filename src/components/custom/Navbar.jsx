"use client";
import { useSession, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";

export const Navbar = ({ className }) => {
  const session = useSession();

  return (
    <div
      className={`${className} w-full z-50 fixed top-0 py-2 px-4 flex justify-between items-center border-b-[0.5px] border-gray-400/70 backdrop-blur-md`}
    >
      <span className="text-3xl font-semibold">Go GST</span>
      <span className="text-sm">
        {session.data ? (
          <Button onClick={signOut}>Logout</Button>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </span>
    </div>
  );
};
