"use client";

import React, { useState, useEffect } from "react";

import RedStar from "@/components/custom/RedStart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileIcon, PlusIcon, PrinterIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { IconLeft } from "react-day-picker";
import { AddSaleInvoice } from "@/actions/SaleInvoice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GetVendors } from "@/actions/Leagers";
import InputField from "@/components/custom/Dashboard/InputFeildAddForm";
import { AddPurchaseInvoice } from "@/actions/PurchaseInvoice";
import { useToast } from "@/hooks/use-toast";

// Initial product row structure
const initialProductRow = {
  id: 1,
  product: "",
  hsnCode: "",
  quantity: 0,
  uom: "",
  price: 0,
  discount: 0,
  cess: 0,
  total: 0,
};

const Page = () => {
  const session = useSession();
  const router = useRouter();
  const { toast } = useToast();

  // Vendor Information State
  const [vendorInfo, setVendorInfo] = useState({
    vendorId: "",
    contactPerson: "",
    phone: "",
    gstPan: "",
    revCharge: "",
    placeOfSupply: "",
  });

  const [vendors, setVendors] = useState([]);

  // Invoice Details State
  const [invoiceDetails, setInvoiceDetails] = useState({
    type: "",
    number: "",
    date: null,
    challanNo: "",
    challanDate: null,
    lrNo: "",
    eWayNo: "",
    delivery: "",
  });

  // Product Rows State
  const [productRows, setProductRows] = useState([initialProductRow]);

  // Additional Details State
  const [additionalDetails, setAdditionalDetails] = useState({
    dueDate: null,
    notes: [{ title: "", details: "" }],
    tcs: { isPercentage: false, isPositive: true, value: 0 },
    discount: { isPercentage: false, isPositive: false, value: 0 },
    paymentType: "",
  });

  // Totals State
  const [totals, setTotals] = useState({
    totalTaxable: 0,
    totalTax: 0,
    grandTotal: 0,
    payment: 0,
  });

  // Calculate row total
  const calculateRowTotal = (row) => {
    const baseAmount = row.quantity * row.price;
    const discountAmount = (baseAmount * row.discount) / 100;
    const cessAmount = (baseAmount * row.cess) / 100;
    return baseAmount - discountAmount + cessAmount;
  };

  // Handle product row change
  const handleProductRowChange = (index, field, value) => {
    const updatedRows = [...productRows];
    updatedRows[index] = {
      ...updatedRows[index],
      [field]: value,
      total: calculateRowTotal({
        ...updatedRows[index],
        [field]: parseFloat(value) || 0,
      }),
    };
    setProductRows(updatedRows);
  };

  // Add new product row
  const addProductRow = () => {
    setProductRows([
      ...productRows,
      { ...initialProductRow, id: productRows.length + 1 },
    ]);
  };

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        if (session.data) {
          const vendors = await GetVendors(session.data.user.email);
          setVendors(vendors);
        }
      } catch (e) {
        console.log("ERROR! while fetching vendors", e);
      }
    };
    fetchVendors();
  }, []);

  // Calculate totals
  useEffect(() => {
    const subtotal = productRows.reduce((sum, row) => sum + row.total, 0);
    const tcsAmount = additionalDetails.tcs.isPercentage
      ? (subtotal * additionalDetails.tcs.value) / 100
      : additionalDetails.tcs.value;
    const discountAmount = additionalDetails.discount.isPercentage
      ? (subtotal * additionalDetails.discount.value) / 100
      : additionalDetails.discount.value;

    const finalTotal =
      subtotal +
      (additionalDetails.tcs.isPositive ? tcsAmount : -tcsAmount) +
      (additionalDetails.discount.isPositive
        ? discountAmount
        : -discountAmount);

    setTotals((prev) => ({
      totalTaxable: subtotal,
      totalTax: tcsAmount,
      grandTotal: finalTotal,
      payment: prev.payment,
    }));
  }, [productRows, additionalDetails.tcs, additionalDetails.discount]);

  // Handle form submission
  const handleSubmit = async (action) => {
    // Validate form data
    try {
      // Here you would add your validation logic
      const invoiceData = {
        vendorInfo,
        invoiceDetails,
        productRows,
        additionalDetails,
        totals,
      };

      if (!session || !session.data) {
        alert("Please login to proceed with the invoice creation.");
        router.push("/login");
      }

      const SendData = async () => {
        const response = await AddPurchaseInvoice(
          invoiceData,
          session.data.user.email
        );
        if (response.ok) {
          toast({
            title: "Purchase Invoice Added Successfully",
          });
          router.push("/dashboard/purchase-invoice");
          return;
        }
        toast({
          toast: response.message,
          variant: "destructive",
        });
        router.push("/dashboard/purchase-invoice");
        return;
      };

      switch (action) {
        case "save":
          // Save logic
          console.log("Saving invoice", invoiceData);
          SendData();
          break;
        case "print":
          console.log("Printing & Saving invoice", invoiceData);
          // Print logic
          SendData();
          // Print LogicInvoice
          break;
        case "discard":
          // Reset form
          setVendorInfo({});
          setInvoiceDetails({});
          setProductRows([initialProductRow]);
          setAdditionalDetails({});
          break;
      }
    } catch (error) {
      console.error("Form validation error:", error);
    }
  };

  return (
    <div className="px-10 py-5 space-y-5 w-full">
      <div className="flex justify-center items-center">
        <span className="text-2xl font-semibold">Create Purchase Invoice</span>
      </div>
      <hr />

      <div>
        <div className="block lg:flex gap-4">
          {/* Vendor Information Card */}
          <VendorInformationCard
            vendorInfo={vendorInfo}
            vendors={vendors}
            setVendorInfo={setVendorInfo}
          />

          {/* Invoice Details Card */}
          <InvoiceDetailsCard
            invoiceDetails={invoiceDetails}
            setInvoiceDetails={setInvoiceDetails}
          />
        </div>

        {/* Products Table Card */}
        <Card className="space-y-8">
          <div className="flex justify-between items-center p-3">
            <span className="text-lg font-semibold">Product Items</span>
            <div className="flex items-center gap-x-3">
              <Button size="sm" onClick={addProductRow}>
                <PlusIcon /> Add Product Row
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 text-center">SR.</TableHead>
                <TableHead className="text-center">Product</TableHead>
                <TableHead className="text-center w-28">HSN/SAC</TableHead>
                <TableHead className="text-center w-28">Qty</TableHead>
                <TableHead className="text-center w-28">UOM</TableHead>
                <TableHead className="text-center w-28">Price</TableHead>
                <TableHead className="text-center w-28">Discount(%)</TableHead>
                <TableHead className="text-center w-28">CESS(%)</TableHead>
                <TableHead className="text-center w-28">TOTAL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="z-0">
              {productRows.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Input
                      value={row.product}
                      onChange={(e) =>
                        handleProductRowChange(index, "product", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={row.hsnCode}
                      onChange={(e) =>
                        handleProductRowChange(index, "hsnCode", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min={0}
                      value={row.quantity}
                      onChange={(e) =>
                        handleProductRowChange(
                          index,
                          "quantity",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={row.uom}
                      onChange={(e) =>
                        handleProductRowChange(index, "uom", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      min={0}
                      type="number"
                      value={row.price}
                      onChange={(e) =>
                        handleProductRowChange(index, "price", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      min={0}
                      type="number"
                      value={row.discount}
                      onChange={(e) =>
                        handleProductRowChange(
                          index,
                          "discount",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      min={0}
                      type="number"
                      value={row.cess}
                      onChange={(e) =>
                        handleProductRowChange(index, "cess", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    {row.total.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={8} className="text-right font-medium">
                  Total
                </TableCell>
                <TableCell className="text-right font-medium">
                  {totals.totalTaxable.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          {/* Additional Details and Totals */}
          <div className="flex flex-col-reverse lg:flex-row gap-x-10 px-5">
            {/* Notes Section */}
            <div className="w-full space-y-3 mb-10">
              <InputField
                type="date"
                label="Due Date"
                value={additionalDetails.dueDate}
                onChange={(date) =>
                  setAdditionalDetails((prev) => ({ ...prev, dueDate: date }))
                }
              />
              <Separator />
              <h3 className="font-medium">
                Terms & Condition / Additional Note
              </h3>
              {additionalDetails.notes.map((note, index) => (
                <div key={index} className="space-y-2">
                  <InputField
                    label="Title"
                    value={note.title}
                    onChange={(e) => {
                      const newNotes = [...additionalDetails.notes];
                      newNotes[index].title = e.target.value;
                      setAdditionalDetails((prev) => ({
                        ...prev,
                        notes: newNotes,
                      }));
                    }}
                  />
                  <InputField
                    label="Details"
                    type="textarea"
                    value={note.details}
                    onChange={(e) => {
                      const newNotes = [...additionalDetails.notes];
                      newNotes[index].details = e.target.value;
                      setAdditionalDetails((prev) => ({
                        ...prev,
                        notes: newNotes,
                      }));
                    }}
                  />
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setAdditionalDetails((prev) => ({
                    ...prev,
                    notes: [...prev.notes, { title: "", details: "" }],
                  }))
                }
              >
                <PlusIcon /> Add Notes
              </Button>
            </div>

            {/* Totals Section */}
            <div className="w-full space-y-3">
              <div className="flex justify-between items-center">
                <span>Total Taxable</span>
                <span>{totals.totalTaxable.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span>Total Tax</span>
                <span>{totals.totalTax.toFixed(2)}</span>
              </div>
              <Separator />

              {/* TCS and Discount Controls */}
              <div className="grid grid-cols-4 items-center">
                <span>TCS</span>
                <div className="flex gap-x-1 items-center">
                  <span>Rs</span>
                  <Switch
                    checked={additionalDetails.tcs.isPercentage}
                    onCheckedChange={(checked) =>
                      setAdditionalDetails((prev) => ({
                        ...prev,
                        tcs: { ...prev.tcs, isPercentage: checked },
                      }))
                    }
                  />
                  <span>%</span>
                </div>
                <div className="flex gap-x-1 items-center">
                  <span>-</span>
                  <Switch
                    checked={additionalDetails.tcs.isPositive}
                    onCheckedChange={(checked) =>
                      setAdditionalDetails((prev) => ({
                        ...prev,
                        tcs: { ...prev.tcs, isPositive: checked },
                      }))
                    }
                  />
                  <span>+</span>
                </div>
                <Input
                  type="number"
                  value={additionalDetails.tcs.value}
                  onChange={(e) =>
                    setAdditionalDetails((prev) => ({
                      ...prev,
                      tcs: {
                        ...prev.tcs,
                        value: parseFloat(e.target.value) || 0,
                      },
                    }))
                  }
                />
              </div>

              <div className="grid grid-cols-4 items-center">
                <span>Discount</span>
                <div className="flex gap-x-1 items-center">
                  <span>Rs</span>
                  <Switch
                    checked={additionalDetails.discount.isPercentage}
                    onCheckedChange={(checked) =>
                      setAdditionalDetails((prev) => ({
                        ...prev,
                        discount: { ...prev.discount, isPercentage: checked },
                      }))
                    }
                  />
                  <span>%</span>
                </div>
                <div className="flex gap-x-1 items-center">
                  <span>-</span>
                  <Switch
                    checked={additionalDetails.discount.isPositive}
                    onCheckedChange={(checked) =>
                      setAdditionalDetails((prev) => ({
                        ...prev,
                        discount: { ...prev.discount, isPositive: checked },
                      }))
                    }
                  />
                  <span>+</span>
                </div>
                <Input
                  type="number"
                  value={additionalDetails.discount.value}
                  onChange={(e) =>
                    setAdditionalDetails((prev) => ({
                      ...prev,
                      discount: {
                        ...prev.discount,
                        value: parseFloat(e.target.value) || 0,
                      },
                    }))
                  }
                />
              </div>

              <Separator />

              {/* Grand Total */}
              <div className="flex justify-between items-center">
                <span className="font-bold">GRAND TOTAL</span>
                <span className="font-bold text-lg">
                  ₹{totals.grandTotal.toFixed(2)}
                </span>
              </div>
              <Separator />

              {/* Payment Type Selection */}
              <div className="flex justify-between items-center">
                <span>
                  Payment Type
                  <RedStar />
                </span>
                <div className="flex items-center gap-x-3">
                  {["Credit", "Cash", "Cheque", "Online"].map((type) => (
                    <Button
                      key={type}
                      variant={
                        additionalDetails.paymentType === type.toLowerCase()
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        setAdditionalDetails((prev) => ({
                          ...prev,
                          paymentType: type.toLowerCase(),
                        }))
                      }
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="pb-8">
                <InputField
                  label={"Payment Amount"}
                  type={"number"}
                  value={totals.payment || 0}
                  onChange={(e) =>
                    setTotals((prev) => ({
                      ...prev,
                      payment: parseFloat(e.target.value) || 0,
                    }))
                  }
                  required="true"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center gap-x-5 border-t-[0.5px] py-5 px-3">
            <Button variant="outline" onClick={() => window.history.back()}>
              <IconLeft className="mr-2" /> Back
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleSubmit("discard")}
            >
              <Trash2 className="mr-2" /> Discard
            </Button>
            <Button variant="outline" onClick={() => handleSubmit("print")}>
              <PrinterIcon className="mr-2" /> Print & Save
            </Button>
            <Button onClick={() => handleSubmit("save")}>
              <FileIcon className="mr-2" /> Save
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Enhanced InputField component with better date handling

export default Page;

const VendorInformationCard = ({ vendorInfo, setVendorInfo, vendors }) => (
  <Card className="w-full lg:w-2/5 mb-5">
    <CardContent className="p-3 space-y-5">
      <div className="flex justify-between items-end h-8">
        <span>Vendor Information</span>
        <Link href={"/dashboard/customer-vendor/add"}>
          <Button size="sm">
            <PlusIcon /> Add Vendor
          </Button>
        </Link>
      </div>
      <Separator />

      {/* M/S Selection */}
      <div className="grid grid-cols-3 gap-3">
        <Label className="col-span-1">
          M/S.
          <RedStar />
        </Label>
        <Select
          onValueChange={(value) =>
            setVendorInfo((prev) => ({
              ...prev,
              vendorId: value,
            }))
          }
          value={vendorInfo.vendorId}
        >
          <SelectTrigger className="col-span-2">
            <SelectValue
              placeholder="Select Vendor"
              value={
                vendors.find((c) => c._id === vendorInfo.vendorId)
                  ?.companyName || "Select Vendor"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {vendors &&
              vendors.map((customer) => (
                <SelectItem key={customer._id} value={customer._id}>
                  {customer.companyName}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {/* Address */}
      <InputField
        label="Address"
        type="textarea"
        value={(() => {
          const vendorAddress = vendors.find(
            (c) => c._id === vendorInfo.vendorId
          )?.billingAddress;
          if (!vendorAddress) return "";
          return (
            vendorAddress.address1 +
            ", " +
            vendorAddress.city +
            ", " +
            vendorAddress.state +
            ", " +
            vendorAddress.country
          );
        })()}
        disabled={true}
      />

      {/* Contact Person */}
      <InputField
        label="Contact Person"
        required={true}
        value={vendorInfo.contactPerson}
        onChange={(e) =>
          setVendorInfo((prev) => ({
            ...prev,
            contactPerson: e.target.value,
          }))
        }
      />

      {/* Phone */}
      <InputField
        label="Phone No"
        required={true}
        type="tel"
        value={vendorInfo.phone}
        onChange={(e) =>
          setVendorInfo((prev) => ({
            ...prev,
            phone: e.target.value,
          }))
        }
      />

      {/* GSTIN/PAN */}
      <InputField
        label="GSTIN/PAN"
        required={true}
        value={vendorInfo.gstPan}
        onChange={(e) =>
          setVendorInfo((prev) => ({
            ...prev,
            gstPan: e.target.value,
          }))
        }
      />

      {/* Rev Charge */}
      <div className="grid grid-cols-3 gap-3">
        <Label className="col-span-1">
          Rev Charge
          <RedStar />
        </Label>
        <Select
          value={vendorInfo.revCharge}
          onValueChange={(value) =>
            setVendorInfo((prev) => ({
              ...prev,
              revCharge: value,
            }))
          }
        >
          <SelectTrigger className="col-span-2">
            <SelectValue placeholder="Select Option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Place of Supply */}
      <InputField
        label="Place of Supply"
        required={true}
        value={vendorInfo.placeOfSupply}
        onChange={(e) =>
          setVendorInfo((prev) => ({
            ...prev,
            placeOfSupply: e.target.value,
          }))
        }
      />
    </CardContent>
  </Card>
);

// Invoice Details Card
const InvoiceDetailsCard = ({ invoiceDetails, setInvoiceDetails }) => (
  <Card className="w-full lg:w-3/5 mb-5">
    <CardContent className="p-3 space-y-5">
      <div className="flex justify-between items-end h-8">
        <span>Purchase Invoice Details</span>
      </div>
      <Separator />

      {/* Invoice Type */}
      <div className="grid grid-cols-3 gap-3">
        <Label className="col-span-1">
          Invoice Type
          <RedStar />
        </Label>
        <Select
          value={invoiceDetails.type}
          onValueChange={(value) =>
            setInvoiceDetails((prev) => ({
              ...prev,
              type: value,
            }))
          }
        >
          <SelectTrigger className="col-span-2">
            <SelectValue placeholder="Select Invoice Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="regular">Regular</SelectItem>
            <SelectItem value="bill-of-supply">Bill of Supply</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Invoice Number */}
      <InputField
        label="Invoice No"
        required={true}
        value={invoiceDetails.number}
        onChange={(e) =>
          setInvoiceDetails((prev) => ({
            ...prev,
            number: e.target.value,
          }))
        }
      />

      {/* Invoice Date */}
      <InputField
        label="Date"
        type="date"
        required={true}
        value={invoiceDetails.date}
        onChange={(date) =>
          setInvoiceDetails((prev) => ({
            ...prev,
            date,
          }))
        }
      />

      {/* Challan Details */}
      <InputField
        label="Challan No"
        value={invoiceDetails.challanNo}
        onChange={(e) =>
          setInvoiceDetails((prev) => ({
            ...prev,
            challanNo: e.target.value,
          }))
        }
      />
      <InputField
        label="Challan Date"
        type="date"
        value={invoiceDetails.challanDate}
        onChange={(date) =>
          setInvoiceDetails((prev) => ({
            ...prev,
            challanDate: date,
          }))
        }
      />

      {/* LR and E-Way Details */}
      <InputField
        label="L.R. No"
        value={invoiceDetails.lrNo}
        onChange={(e) =>
          setInvoiceDetails((prev) => ({
            ...prev,
            lrNo: e.target.value,
          }))
        }
      />
      <InputField
        label="E-Way No"
        value={invoiceDetails.eWayNo}
        onChange={(e) =>
          setInvoiceDetails((prev) => ({
            ...prev,
            eWayNo: e.target.value,
          }))
        }
      />

      {/* Delivery Mode */}
      <div className="grid grid-cols-3 gap-3">
        <Label className="col-span-1">
          Delivery
          <RedStar />
        </Label>
        <Select
          value={invoiceDetails.delivery}
          onValueChange={(value) =>
            setInvoiceDetails((prev) => ({
              ...prev,
              delivery: value,
            }))
          }
        >
          <SelectTrigger className="col-span-2">
            <SelectValue placeholder="Select Delivery Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hand">Hand Delivery</SelectItem>
            <SelectItem value="road-regular">Road - Regular</SelectItem>
            <SelectItem value="road-dimensional">
              Road - Dimensional Cargo
            </SelectItem>
            <SelectItem value="rail">Rail</SelectItem>
            <SelectItem value="air">Air</SelectItem>
            <SelectItem value="ship">Ship</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  </Card>
);
