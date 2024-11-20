import { GetInwardPayments } from "@/actions/InwardPayment";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession();

  if (!session) {
    return redirect("/login");
  }

  const inwardPayments = await GetInwardPayments(session.user.email);

  return (
    <div className="px-10 py-5 space-y-5 w-full">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-semibold">Inward Payments</span>
        <Link href={"/dashboard/inward-payment/add"}>
          <Button>
            <PlusIcon /> Add New
          </Button>
        </Link>
      </div>
      <hr />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center text-base">Receipt No</TableHead>
            <TableHead className="text-center text-base">
              Company Name
            </TableHead>
            <TableHead className="text-center text-base">
              Payment Date
            </TableHead>
            <TableHead className="text-center text-base">
              Payment Type
            </TableHead>
            <TableHead className="text-center text-base">
              Payment Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inwardPayments.map((ip) => (
            <Link
              href={`/dashboard/inward-payment/view/${ip._id}`}
              key={ip._id}
              legacyBehavior
            >
              <TableRow>
                <TableCell className="text-center text-base">
                  {ip.receiptNo}
                </TableCell>
                <TableCell className="text-center text-base">
                  {ip.customerVendorId.companyName}
                </TableCell>
                <TableCell className="text-center text-base">
                  {ip.paymentDate.toDateString()}
                </TableCell>
                <TableCell className="text-center text-base">
                  {ip.paymentType}
                </TableCell>
                <TableCell className="text-center text-base">
                  {ip.payment}
                </TableCell>
              </TableRow>
            </Link>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
