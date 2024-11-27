import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";
import { getLeagers } from "@/actions/Leagers";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getServerSession } from "next-auth";

const CustomerVendor = async () => {
  const session = await getServerSession();
  const leagers = await getLeagers(session.user.email);
  console.log(leagers);

  if (!leagers) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-xl">No data found</h1>
      </div>
    );
  }

  return (
    <div className="px-10 py-5 space-y-5 w-full">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-semibold">Leagers</span>
        <Link href={"/dashboard/leagers/add"}>
          <Button>
            <PlusIcon /> Add New
          </Button>
        </Link>
      </div>
      <hr />
      {leagers.length ? (
        <div className="pt-5">
          <Table className="text-base">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">S No.</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">GST</TableHead>
                <TableHead className="text-center">Type</TableHead>
                <TableHead className="text-center">State</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leagers.map((leager, index) => {
                return (
                  <Link
                    legacyBehavior
                    key={leager._id}
                    href={`/dashboard/leagers/view/${leager._id}`}
                    className="cursor-pointer"
                  >
                    <TableRow>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell className="text-center">
                        {leager.businessName}
                      </TableCell>
                      <TableCell className="text-center">
                        {leager.gstin ? leager.gstin : "Unregister"}
                      </TableCell>
                      <TableCell className="text-center">
                        {leager.gstin ? "B2B" : "B2C"}
                      </TableCell>
                      <TableCell className="text-center">
                        {leager.state ?? "Haryana"}
                      </TableCell>
                    </TableRow>
                  </Link>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="h-full flex justify-center items-center pt-40">
          <h1 className="text-xl">No data found</h1>
        </div>
      )}
    </div>
  );
};

export default CustomerVendor;
