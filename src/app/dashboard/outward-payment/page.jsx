import { GetOutwardPayments } from "@/actions/OutwardPayment";
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

  const outwardPayments = await GetOutwardPayments(session.user.email);

  return (
    <div className="px-10 py-5 space-y-5 w-full">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-semibold">Outward Payments</span>
        <Link href={"/dashboard/outward-payment/add"}>
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
          {outwardPayments.map((op) => (
            <Link
              href={`/dashboard/outward-payment/view/${op._id}`}
              key={op._id}
              legacyBehavior
            >
              <TableRow key={op._id}>
                <TableCell className="text-center text-base">
                  {op.receiptNo}
                </TableCell>
                <TableCell className="text-center text-base">
                  {op.customerVendorId.companyName}
                </TableCell>
                <TableCell className="text-center text-base">
                  {op.paymentDate.toDateString()}
                </TableCell>
                <TableCell className="text-center text-base">
                  {op.paymentType}
                </TableCell>
                <TableCell className="text-center text-base">
                  {op.payment}
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
