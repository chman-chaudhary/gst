"use client";

import { Label } from "@/components/ui/label";
import { useState } from "react";
import InputField from "../Dashboard/InputFeildAddForm";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RedStar from "../RedStart";
import { AddInwardPayment } from "@/actions/InwardPayment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const AddForm = ({ customers }) => {
  const session = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    receiptNo: "",
    customerVendorId: "",
    paymentDate: null,
    payment: 0,
    paymentType: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (session.data) {
      const response = await AddInwardPayment(
        formData,
        session.data.user.email
      );
      if (response.ok) {
        toast({
          title: "Inward Payment added successfully.",
        });
        router.push("/dashboard/inward-payment");
      } else {
        toast({
          title: response.message,
          variant: "destructive",
        });
        router.push("/dashboard/inward-payment");
      }
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div className="space-y-5">
        <InputField
          label={"Reciept No"}
          type="number"
          value={formData.receiptNo}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, receiptNo: e.target.value }));
          }}
          required={true}
        />
        <div className="grid grid-cols-3 gap-3 items-start">
          <Label className="col-span-1 pt-1">
            Company Name
            <RedStar />
          </Label>
          <Select
            onValueChange={(value) => {
              setFormData((prev) => ({ ...prev, customerVendorId: value }));
            }}
          >
            <SelectTrigger className="col-span-2">
              <SelectValue
                placeholder="Select Company"
                value={
                  customers.find((c) => c._id === formData.customerVendorId)
                    ?.companyName
                }
              />
            </SelectTrigger>
            <SelectContent>
              {customers &&
                customers.map((c) => (
                  <SelectItem key={c._id} value={c._id}>
                    {c.companyName}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <InputField
          label={"Address"}
          value={(() => {
            const customerAddress = customers.find(
              (c) => c._id === formData.customerVendorId
            )?.billingAddress;
            if (!customerAddress) return "";
            return (
              customerAddress.address1 +
              ", " +
              customerAddress.city +
              ", " +
              customerAddress.state +
              ", " +
              customerAddress.country
            );
          })()}
          required={true}
          type="textarea"
          inputClass={"capitalize"}
          disabled
        />
        <InputField
          label={"GST/PAN"}
          required={true}
          value={
            customers.find((c) => c._id === formData.customerVendorId)?.gstin ||
            ""
          }
          disabled
          inputClass={"capitalize"}
        />
        <InputField
          type="number"
          value={
            customers.find((c) => c._id === formData.customerVendorId)
              ?.remainingAmount || 0
          }
          label={"Total Outstanding"}
          required={true}
          disabled
        />
        <InputField
          label={"Payment Date"}
          required={true}
          type="date"
          value={formData.paymentDate}
          onChange={(date) =>
            setFormData((prev) => ({
              ...prev,
              paymentDate: date,
            }))
          }
        />
        <InputField
          label={"Payment"}
          value={formData.payment}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, payment: e.target.value }));
          }}
          required={true}
        />

        <div className="grid grid-cols-3 gap-3 items-start">
          <Label className="col-span-1 pt-1">
            Payment Type
            <RedStar />
          </Label>
          <Select
            onValueChange={(value) => {
              setFormData((prev) => ({ ...prev, paymentType: value }));
            }}
          >
            <SelectTrigger className="col-span-2">
              <SelectValue
                placeholder="Select Payment Type"
                value={formData.paymentType}
              />
            </SelectTrigger>
            <SelectContent>
              {["CASH", "CHEQUE", "ONLINE", "BANK", "TDS"].map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end items-center">
        <Button>
          <PlusIcon />
          Add Payment
        </Button>
      </div>
    </form>
  );
};

export default AddForm;
