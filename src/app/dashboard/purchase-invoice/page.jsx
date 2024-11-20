import { GetPurchaseInvoices } from "@/actions/PurchaseInvoice";
import { InvoiceList } from "@/components/custom/PurchaseInvoice/InvoiceList";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  const { invoices } = await GetPurchaseInvoices(session.user.email);
  console.log(invoices);

  return (
    <div className="px-10 py-5 space-y-5 w-full">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-semibold">Purchase Invoices</span>
        <Link href={"/dashboard/purchase-invoice/add"}>
          <Button>
            <PlusIcon /> Add New
          </Button>
        </Link>
      </div>
      <hr />
      <InvoiceList invoices={invoices || []} />
    </div>
  );
};

export default Page;
