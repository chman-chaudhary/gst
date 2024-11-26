"use server";

import { redirect } from "next/navigation";

const Page = () => {
  redirect("/dashboard/customer-vendor");

  return (
    <div className="flex justify-center items-center h-[calc(100vh-150px)]">
      <h1 className="text-2xl">Redirecting to Customer/Vendor page...</h1>
    </div>
  );
};

export default Page;
