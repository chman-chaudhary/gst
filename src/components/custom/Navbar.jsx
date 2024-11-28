"use client";
import { useSession, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

const NavButtons = [
  {
    label: "Sales",
    url: "/dashboard/sale-invoice",
    color:
      "border-blue-700 text-blue-500 hover:bg-blue-500/60 hover:text-white",
  },
  {
    label: "Purchase",
    url: "/dashboard/purchase-invoice",
    color:
      "border-orange-700 text-orange-500 hover:bg-orange-500/60 hover:text-white",
  },
  {
    label: "Payment",
    url: "/dashboard/outward-payment",
    color:
      "border-green-700 text-green-500 hover:bg-green-500/60 hover:text-white",
  },
  {
    label: "Receipt",
    url: "/dashboard/inward-payment",
    color:
      "border-yellow-700 text-yellow-500 hover:bg-yellow-500/60 hover:text-white",
  },
  {
    label: "Leager",
    url: "/dashboard/leagers",
    color:
      "border-indigo-700 text-indigo-500 hover:bg-indigo-500/60 hover:text-white",
  },
];

export const Navbar = ({ className }) => {
  const session = useSession();

  return (
    <div
      className={`${className} w-full z-50 fixed top-0 py-4 px-4 flex justify-between items-center border-b-[0.5px] border-gray-400/70 backdrop-blur-md`}
    >
      <span className="text-3xl font-semibold flex items-center gap-x-2">
        <Image
          className="dark:invert"
          src="/globe.svg"
          alt="logo"
          width={25}
          height={25}
          priority
        />{" "}
        <span>VELOX</span>
      </span>
      <span className="mr-5 space-x-2">
        {NavButtons.map((button, index) => (
          <Link href={button.url} key={index}>
            <Button variant="outline" className={`${button.color}`}>
              {button.label}
            </Button>
          </Link>
        ))}
      </span>
      <span>
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
