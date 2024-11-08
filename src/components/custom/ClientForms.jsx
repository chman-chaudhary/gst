"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";
import { AddCustomerVendor } from "@/actions/CustomerVendor";

export function ViewForm({ open, setOpen }) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>View Form</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value="Pedro Duarte"
              className="col-span-3"
              readOnly
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value="@peduarte"
              className="col-span-3"
              readOnly
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function EditForm({ open, setOpen }) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value="Pedro Duarte"
              className="col-span-3"
              readOnly
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value="@peduarte"
              className="col-span-3"
              readOnly
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function AddForm({ open, setOpen }) {
  const [errors, setErrors] = useState({});
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

  const validateForm = () => {
    const newErrors = {};
    for (const key in newClient) {
      if (
        !newClient[key] &&
        key !== "address2" &&
        key !== "faxNo" &&
        key !== "website" &&
        key !== "dueDays" &&
        key !== "note" &&
        key !== "licenseNo"
      ) {
        newErrors[key] = `${key} is required`;
      }
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert("Error");
      return;
    }
    try {
      const data = await AddCustomerVendor(newClient);
      if (data.success) {
        alert("Customer/Vendor added successfully!");
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error adding Customer/Vendor:", error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-3/5">
        <SheetHeader>
          <SheetTitle>Add Form</SheetTitle>
          <SheetDescription>
            Add details to add new Customer/Vendor here. Click save when you're
            done.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="max-h-[calc(100vh-150px)] overflow-y-auto px-2">
          <div className="grid gap-2 py-5 px-1">
            {/* Company Type */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="companyType" className="text-right">
                Company Type
              </Label>
              <RadioGroup
                defaultValue="customer"
                className="col-span-3 flex gap-x-10 items-center"
                value={newClient.companyType || "customer"}
                onValueChange={(value) =>
                  setNewClient({ ...newClient, companyType: value })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="customer" id="customer" />
                  <Label htmlFor="customer">Customer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vendor" id="vendor" />
                  <Label htmlFor="vendor">Vendor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="customer/vendor"
                    id="customer/vendor"
                  />
                  <Label htmlFor="customer/vendor">Customer/Vendor</Label>
                </div>
              </RadioGroup>
            </div>

            {/* GSTIN */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="gstin" className="text-right">
                GSTIN
              </Label>
              <Input
                id="gstin"
                name="gstin"
                value={newClient.gstin || ""}
                onChange={handleChange}
                className="col-span-3 uppercase"
              />
              {errors.gstin && (
                <p className="error text-red-500 text-center col-span-4">
                  {errors.gstin}
                </p>
              )}
            </div>

            {/* Company Name */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="companyName" className="text-right">
                Company Name
              </Label>
              <Input
                id="companyName"
                name="companyName"
                value={newClient.companyName || ""}
                onChange={handleChange}
                className="col-span-3"
              />
              {errors.companyName && (
                <p className="error text-red-500 text-center col-span-4">
                  {errors.companyName}
                </p>
              )}
            </div>

            {/* Contact Person */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="contactPerson" className="text-right">
                Contact Person
              </Label>
              <Input
                id="contactPerson"
                name="contactPerson"
                value={newClient.contactPerson || ""}
                onChange={handleChange}
                className="col-span-3"
              />
              {errors.contactPerson && (
                <p className="error text-red-500 text-center col-span-4">
                  {errors.contactPerson}
                </p>
              )}
            </div>

            {/* Contact Number */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="contactNo" className="text-right">
                Contact Number
              </Label>
              <Input
                id="contactNo"
                name="contactNo"
                value={newClient.contactNo || ""}
                onChange={handleChange}
                className="col-span-3"
              />
              {errors.contactNo && (
                <p className="error text-red-500 text-center col-span-4">
                  {errors.contactNo}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={newClient.email || ""}
                onChange={handleChange}
                className="col-span-3"
              />
              {errors.email && (
                <p className="error text-red-500 text-center col-span-4">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Registration Type */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="registrationType" className="text-right">
                Registration Type
              </Label>
              <Select
                value={newClient.registrationType}
                onValueChange={(value) =>
                  setNewClient((prev) => ({ ...prev, registrationType: value }))
                }
              >
                <SelectTrigger className="w-full col-span-3">
                  <SelectValue placeholder="Select Registration Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unregistered">Unregistered</SelectItem>
                  <SelectItem value="registered">Registered</SelectItem>
                </SelectContent>
              </Select>
              {errors.registrationType && (
                <p className="error text-red-500 text-center col-span-4">
                  {errors.registrationType}
                </p>
              )}
            </div>

            {/* PAN */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="pan" className="text-right">
                PAN
              </Label>
              <Input
                id="pan"
                name="pan"
                value={newClient.pan || ""}
                onChange={handleChange}
                className="col-span-3 uppercase"
              />
              {errors.pan && (
                <p className="error text-red-500 text-center col-span-4">
                  {errors.pan}
                </p>
              )}
            </div>

            {/* Billing Address */}
            <hr />
            <h3 className="text-lg font-medium pl-6">Billing Address</h3>
            <hr />
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="address1" className="text-right">
                Address 1
              </Label>
              <Input
                id="address1"
                name="address1"
                value={newClient.address1 || ""}
                onChange={handleChange}
                className="col-span-3"
              />
              {errors.address1 && (
                <p className="error text-red-500 text-center col-span-4">
                  {errors.address1}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="address2" className="text-right">
                Address 2
              </Label>
              <Input
                id="address2"
                name="address2"
                value={newClient.address2 || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* More Address Fields */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="city" className="text-right">
                City
              </Label>
              <Input
                id="city"
                name="city"
                value={newClient.city || ""}
                onChange={handleChange}
                className="col-span-3"
              />
              {errors.city && (
                <p className="error text-red-500 text-center col-span-4">
                  {errors.city}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="pincode" className="text-right">
                Pin Code
              </Label>
              <Input
                id="pincode"
                name="pincode"
                value={newClient.pincode || ""}
                onChange={handleChange}
                className="col-span-3"
              />
              {errors.pincode && (
                <p className="error text-red-500 text-center col-span-4">
                  {errors.pincode}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="state" className="text-right">
                State
              </Label>
              <Input
                id="state"
                name="state"
                value={newClient.state || ""}
                onChange={handleChange}
                className="col-span-3"
              />
              {errors.state && (
                <p className="error text-red-500 text-center col-span-4">
                  {errors.state}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="country" className="text-right">
                Country
              </Label>
              <Input
                id="country"
                name="country"
                value={newClient.country || ""}
                onChange={handleChange}
                className="col-span-3"
              />
              {errors.country && (
                <p className="error text-red-500 text-center col-span-4">
                  {errors.country}
                </p>
              )}
            </div>

            {/* Distance for E-Way Bill */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="distanceForEwayBill" className="text-right">
                Distance for E-Way Bill
              </Label>
              <Input
                id="distanceForEwayBill"
                name="distanceForEwayBill"
                type="number"
                value={newClient.distanceForEwayBill || ""}
                onChange={handleChange}
                placeholder="In kilometers"
                className="col-span-3"
              />
              {errors.distanceForEwayBill && (
                <p className="error text-red-500 text-center col-span-4">
                  {errors.distanceForEwayBill}
                </p>
              )}
            </div>

            <hr />
            <h3 className="text-lg font-medium pl-6">Opening Balance</h3>
            <hr />

            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="customerBalance" className="text-right">
                Customer Balance
              </Label>
              <RadioGroup
                defaultValue="credit"
                className="col-span-3 flex gap-x-10 items-center"
                value={newClient.balanceType || "customer"}
                onValueChange={(value) =>
                  setNewClient({ ...newClient, balanceType: value })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit" id="credit" />
                  <Label htmlFor="credit">Credit</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="debit" id="debit" />
                  <Label htmlFor="debit">Debit</Label>
                </div>
              </RadioGroup>
              {errors.balanceType && (
                <p className="error text-red-500 text-center col-span-4">
                  {errors.balanceType}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="openingBalance" className="text-right">
                Amount
              </Label>
              <Input
                id="openingBalance"
                name="openingBalance"
                value={newClient.openingBalance || ""}
                onChange={handleChange}
                placeholder="0"
                className="col-span-3"
              />
              {errors.openingBalance && (
                <p className="error text-red-500 text-center col-span-4">
                  {errors.openingBalance}
                </p>
              )}
            </div>

            <hr />
            <h3 className="text-lg font-medium pl-6">Custom Fields</h3>
            <hr />

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="licenseNo" className="text-right">
                License No.
              </Label>
              <Input
                id="licenseNo"
                name="licenseNo"
                value={newClient.licenseNo || ""}
                onChange={handleChange}
                placeholder="Enter Licence No."
                className="col-span-3 uppercase"
              />
            </div>

            <hr />
            <h3 className="text-lg font-medium pl-6">Additional Details</h3>
            <hr />

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="faxNo" className="text-right">
                Fax No.
              </Label>
              <Input
                id="faxNo"
                name="faxNo"
                value={newClient.faxNo || ""}
                onChange={handleChange}
                placeholder="Enter Fax no."
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="website" className="text-right">
                Website
              </Label>
              <Input
                id="website"
                name="website"
                value={newClient.website || ""}
                onChange={handleChange}
                placeholder="www.sitename.com"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDays" className="text-right">
                Due Days
              </Label>
              <Input
                id="dueDays"
                name="dueDays"
                value={newClient.dueDays || ""}
                onChange={handleChange}
                placeholder="Enter Due Days"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="note" className="text-right">
                Note
              </Label>
              <Input
                id="note"
                name="note"
                value={newClient.note || ""}
                onChange={handleChange}
                placeholder="Enter note (Optional)"
                className="col-span-3"
              />
            </div>
            {/* Enable Toggle */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="enable" className="text-right">
                Enable
              </Label>
              <span className="col-span-3 flex items-center gap-x-2">
                <Checkbox
                  id="enable"
                  onCheckedChange={(value) =>
                    setNewClient({ ...newClient, enable: value })
                  }
                  value={newClient.enable}
                />
                <Label htmlFor="enable">
                  Company will be visible on all document.
                </Label>
              </span>
            </div>
          </div>
        </ScrollArea>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={handleSubmit} className="mt-2">
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
