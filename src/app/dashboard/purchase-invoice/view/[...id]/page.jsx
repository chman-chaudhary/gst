import { getPurchaseInvoiceById } from "@/actions/PurchaseInvoice";
import ViewPurchaseInvoiceDetails from "@/components/custom/PurchaseInvoice/ViewInvoice";

const Page = async ({ params }) => {
  const { id } = await params;
  const response = await getPurchaseInvoiceById(id[0]);
  const invoice = JSON.parse(JSON.stringify(response.invoice));

  return (
    <ViewPurchaseInvoiceDetails
      vendorInfo={invoice.vendorInfo}
      additionalDetails={invoice.additionalDetails}
      invoiceDetails={invoice.invoiceDetails}
      totals={invoice.totals}
      productRows={invoice.productRows}
    />
  );
};

export default Page;
