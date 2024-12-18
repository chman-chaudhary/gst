import { getSaleInvoiceById } from "@/actions/SaleInvoice";
import ViewSaleInvoiceDetails from "@/components/custom/SaleInvoice/ViewInvoice";

const Page = async ({ params }) => {
  const { id } = await params;
  const response = await getSaleInvoiceById(id[0]);
  const invoice = JSON.parse(JSON.stringify(response.invoice));

  return (
    <ViewSaleInvoiceDetails
      customerInfo={invoice.customerInfo}
      additionalDetails={invoice.additionalDetails}
      invoiceDetails={invoice.invoiceDetails}
      totals={invoice.totals}
      productRows={invoice.productRows}
    />
  );
};

export default Page;
