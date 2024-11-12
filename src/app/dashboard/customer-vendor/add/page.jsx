"use client";

import { AddCustomerVendor } from "@/actions/CustomerVendor";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prev) => ({ ...prev, [name]: value }));
  };

  const [newClient, setNewClient] = useState({
    companyType: "customer",
    gstin: "",
    companyName: "",
    contactPerson: "",
    contactNo: "",
    email: "",
    registrationType: "",
    pan: "",
    address1: "",
    address2: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
    distanceForEwayBill: "",
    balanceType: "credit",
    openingBalance: "",
    licenseNo: "",
    faxNo: "",
    website: "",
    dueDays: "",
    note: "",
    enable: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await AddCustomerVendor(newClient);
      if (data.success) {
        router.push("/dashboard/customer-vendor");
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error adding Customer/Vendor:", error);
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="px-10 pt-4 pb-10 space-y-10 max-w-[800px] w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Add New Cutomer/Vendor</h1>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between">
            <Label htmlFor="companyType" className="w-1/4 text-base">
              Company Type
            </Label>
            <RadioGroup
              defaultValue="customer"
              className="flex justify-between items-center w-3/4 text-base"
              value={newClient.companyType || "customer"}
              onValueChange={(value) =>
                setNewClient({ ...newClient, companyType: value })
              }
            >
              <span className="flex items-center space-x-2">
                <RadioGroupItem value="customer" id="customer" />
                <Label htmlFor="customer" className="text-base">
                  Customer
                </Label>
              </span>
              <span className="flex items-center space-x-2">
                <RadioGroupItem value="vendor" id="vendor" />
                <Label htmlFor="vendor" className="text-base">
                  Vendor
                </Label>
              </span>
              <span className="flex items-center space-x-2">
                <RadioGroupItem value="customer/vendor" id="customer/vendor" />
                <Label htmlFor="customer/vendor" className="text-base">
                  Customer/Vendor
                </Label>
              </span>
            </RadioGroup>
          </div>

          <InputField
            label="GSTIN"
            name="gstin"
            value={newClient.gstin || ""}
            onChange={handleChange}
            required={true}
            placeholder="GST Number"
            className="uppercase"
          />
          <InputField
            label="Company Name"
            name="companyName"
            value={newClient.companyName || ""}
            onChange={handleChange}
            required={true}
            placeholder="Company Name"
          />
          <InputField
            label="Contact Person"
            name="contactPerson"
            value={newClient.contactPerson || ""}
            onChange={handleChange}
            required={true}
            placeholder="Contact Person"
          />
          <InputField
            label="Contact Number"
            type="tel"
            name="contactNo"
            value={newClient.contactNo || ""}
            onChange={handleChange}
            required={true}
            placeholder="98765XXXXX"
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            value={newClient.email || ""}
            onChange={handleChange}
            required={true}
            placeholder="youremail@gmail.com"
          />

          <div className="">
            <Label htmlFor="registrationType" className="text-right text-base">
              Registration Type
            </Label>
            <Select
              value={newClient.registrationType}
              onValueChange={(value) =>
                setNewClient((prev) => ({ ...prev, registrationType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue
                  className="text-base"
                  placeholder="Select Registration Type"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unregistered" className="text-base">
                  Unregistered
                </SelectItem>
                <SelectItem value="registered" className="text-base">
                  Registered
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <InputField
            label="PAN"
            name="pan"
            value={newClient.pan || ""}
            onChange={handleChange}
            required={true}
            placeholder="PAN NUMBER"
            className="uppercase"
          />

          <div>
            <hr />
            <h3 className="text-lg font-medium p-3">Billing Address</h3>
            <hr />
          </div>

          <InputField
            label="Address 1"
            name="address1"
            value={newClient.address1 || ""}
            onChange={handleChange}
            required={true}
          />
          <InputField
            label="Address 2"
            name="address2"
            value={newClient.address2 || ""}
            onChange={handleChange}
          />
          <InputField
            label="City"
            name="city"
            value={newClient.city || ""}
            onChange={handleChange}
            required={true}
          />
          <InputField
            label="PIN Code"
            name="pincode"
            type="number"
            value={newClient.pincode || ""}
            onChange={handleChange}
            required={true}
          />
          <InputField
            label="State"
            name="state"
            value={newClient.state || ""}
            onChange={handleChange}
            required={true}
          />
          <InputField
            label="Country"
            name="country"
            value={newClient.country || ""}
            onChange={handleChange}
            required={true}
          />
          <InputField
            label="Distance for E-Way Bill"
            name="distanceForEwayBill"
            value={newClient.distanceForEwayBill || ""}
            type="number"
            onChange={handleChange}
            required={true}
          />

          <div>
            <hr />
            <h3 className="text-lg font-medium p-3">Opening Balance</h3>
            <hr />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="customerBalance" className="w-1/4 text-base ">
              Customer Balance
            </Label>
            <RadioGroup
              defaultValue="credit"
              className="w-3/4 flex justify-around"
              value={newClient.balanceType || "customer"}
              onValueChange={(value) =>
                setNewClient({ ...newClient, balanceType: value })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit" id="credit" />
                <Label htmlFor="credit" className="text-base">
                  Credit
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="debit" id="debit" />
                <Label htmlFor="debit" className="text-base">
                  Debit
                </Label>
              </div>
            </RadioGroup>
          </div>

          <InputField
            label="Amount"
            type="number"
            name="openingBalance"
            value={newClient.openingBalance || ""}
            onChange={handleChange}
            placeholder="0"
            required={true}
          />

          <div>
            <hr />
            <h3 className="text-lg font-medium p-3">Custom Fields</h3>
            <hr />
          </div>

          <InputField
            label="License No"
            name="licenseNo"
            value={newClient.licenseNo || ""}
            onChange={handleChange}
            required={true}
            className="uppercase"
          />

          <div>
            <hr />
            <h3 className="text-lg font-medium p-3">Additional Details</h3>
            <hr />
          </div>

          <InputField
            label="FAX No"
            name="faxNo"
            value={newClient.faxNo || ""}
            onChange={handleChange}
          />
          <InputField
            label="Website"
            name="website"
            value={newClient.website || ""}
            onChange={handleChange}
            placeholder="www.yoursite.com"
          />
          <InputField
            label="Due Days"
            name="dueDays"
            value={newClient.dueDays || ""}
            type="number"
            onChange={handleChange}
            placeholder="0"
          />
          <InputField
            label="Note"
            name="note"
            value={newClient.note || ""}
            onChange={handleChange}
          />

          <div className="flex items-center gap-x-6">
            <Label htmlFor="enable" className="text-base">
              Enable
            </Label>
            <span className="flex items-center gap-x-2">
              <Checkbox
                id="enable"
                onCheckedChange={(value) =>
                  setNewClient({ ...newClient, enable: value })
                }
                value={newClient.enable}
                className="size-5"
              />
              <Label htmlFor="enable" className="text-base">
                Company will be visible on all document.
              </Label>
            </span>
          </div>
          <Button type="submit">
            <CheckIcon /> Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;

const InputField = ({
  value = "",
  name = "",
  type = "text",
  label = "",
  className = "",
  onChange = () => {},
  placeholder = "",
  required = false,
}) => {
  return (
    <div className={`${className}`}>
      <Label htmlFor={name} className="text-base">
        {label}
      </Label>
      <Input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`text-base ${className}`}
      />
    </div>
  );
};
