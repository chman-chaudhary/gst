import { GetOutwardPaymentById } from "@/actions/OutwardPayment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const Page = async ({ params }) => {
  const { id } = await params;
  const outwardPayment = await GetOutwardPaymentById(id[0]);
  return (
    <div className="flex justify-center">
      <div className="w-4/5 md:w-3/5 py-5 space-y-8">
        <h1 className="text-center text-3xl font-semibold">
          Outward Payment Details
        </h1>
        <div className="space-y-5">
          <InputFeild label={"Receipt No"} value={outwardPayment.receiptNo} />
          <InputFeild
            label={"Company Name"}
            value={outwardPayment.customerVendorId.companyName}
          />
          <InputFeild
            label={"Billing Address"}
            value={(() => {
              const address = outwardPayment.customerVendorId.billingAddress;
              return (
                address.address1 +
                ", " +
                address.city +
                ", " +
                address.state +
                ", " +
                address.country +
                " - " +
                address.pincode
              );
            })()}
          />
          <InputFeild
            label={"GSTIN"}
            value={outwardPayment.customerVendorId.gstin}
          />
          <InputFeild
            label={"Payment Date"}
            value={outwardPayment.paymentDate.toDateString()}
          />
          <InputFeild label={"Payment Amount"} value={outwardPayment.payment} />
          <InputFeild
            label={"Payment Type"}
            value={outwardPayment.paymentType}
          />
        </div>
        <div className="flex justify-end items-center">
          <Link href={"/dashboard/outward-payment"}>
            <Button>
              <ChevronLeft /> Back
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;

const InputFeild = ({ label, value }) => {
  return (
    <div className="space-y-2">
      <Label className="px-1 text-base">{label}:</Label>
      <Input value={value} readOnly />
    </div>
  );
};
