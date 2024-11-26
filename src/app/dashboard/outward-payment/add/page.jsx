import { GetVendors } from "@/actions/Leagers";
import AddForm from "@/components/custom/OutwardPayment/AddForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  const vendors = await GetVendors(session.user.email);

  return (
    <div className="flex justify-center w-full">
      <div className="px-10 pt-4 pb-10 space-y-10 max-w-[800px] w-full">
        <h1 className="text-2xl font-semibold text-center">
          Create Outward Payment
        </h1>
        <AddForm vendors={vendors} />
      </div>
    </div>
  );
};

export default Page;
