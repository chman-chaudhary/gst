import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export const InvoiceList = ({ invoices }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center text-base">Invoice No.</TableHead>
            <TableHead className="text-center text-base">
              Company Name
            </TableHead>
            <TableHead className="text-center text-base">Date</TableHead>
            <TableHead className="text-center text-base">Total</TableHead>
            <TableHead className="text-center text-base">
              Payment Type
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, index) => {
            return (
              <Link
                href={`/dashboard/sale-invoice/view/${invoice._id}`}
                key={index}
                legacyBehavior
              >
                <TableRow>
                  <TableCell className="text-center text-base">
                    {invoice.invoiceDetails.number}
                  </TableCell>
                  <TableCell className="text-center text-base flex flex-col gap-x-2">
                    <span>{invoice.customerInfo.name}</span>
                    <span className="text-sm text-gray-500/70">
                      {invoice.customerInfo.contactPerson}
                    </span>
                  </TableCell>
                  <TableCell className="text-center text-base">
                    {new Date(invoice.invoiceDetails.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-center text-base">
                    {invoice.totals.grandTotal}
                  </TableCell>
                  <TableCell className="text-center text-base">
                    {invoice.additionalDetails.paymentType.toUpperCase()}
                  </TableCell>
                </TableRow>
              </Link>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
