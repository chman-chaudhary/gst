"use client";

// import RedStar from "@/components/custom/RedStart";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Separator } from "@/components/ui/separator";
// import { Switch } from "@/components/ui/switch";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Textarea } from "@/components/ui/textarea";
// import { cn } from "@/lib/utils";
// import {
//   CalendarIcon,
//   FileIcon,
//   PlusIcon,
//   PrinterIcon,
//   Trash2,
// } from "lucide-react";
// import Link from "next/link";
// import { IconLeft } from "react-day-picker";

// const Page = () => {
//   return (
//     <div className="px-10 py-5 space-y-5 w-full">
//       <div className="flex justify-center items-center">
//         <span className="text-2xl font-semibold">Create Sale Invoice</span>
//       </div>
//       <hr />
//       <div>
//         <div className="block lg:flex gap-4">
//           <Card className="w-full lg:w-2/5 mb-5">
//             <CardContent className="p-3 space-y-5">
//               <div className="flex justify-between items-end h-8">
//                 <span>Customer Information</span>
//                 <Button size="sm">
//                   <PlusIcon /> Add Customer
//                 </Button>
//               </div>
//               <Separator />
//               <div className="grid grid-cols-3 gap-3">
//                 <Label className="col-span-1">
//                   M/S.
//                   <RedStar />
//                 </Label>
//                 <Select>
//                   <SelectTrigger className="col-span-2">
//                     <SelectValue placeholder="Select Customer" />
//                   </SelectTrigger>
//                   <SelectContent></SelectContent>
//                 </Select>
//               </div>
//               <InputFeild label={"Address"} type="textarea" required={true} />
//               <InputFeild label={"Contact Person"} required={true} />
//               <InputFeild label={"Phone"} required={true} />
//               <InputFeild label={"GST/PAN"} required={true} />
//               <InputFeild label={"Rev. Charge"} required={true} />
//               <InputFeild label={"Place of Supply"} required={true} />
//             </CardContent>
//           </Card>
//           <Card className="w-full lg:w-3/5 mb-5">
//             <CardContent className="p-3 space-y-5">
//               <div className="flex justify-between items-end h-8">
//                 <span>Invoice Details</span>
//               </div>
//               <Separator />
//               <div className="grid grid-cols-3 gap-3">
//                 <Label>
//                   Invoice Type
//                   <RedStar />
//                 </Label>
//                 <Select>
//                   <SelectTrigger className="col-span-2">
//                     <SelectValue placeholder="Select Invoice Type" />
//                   </SelectTrigger>
//                   <SelectContent></SelectContent>
//                 </Select>
//               </div>
//               <InputFeild label={"Invoice No."} required={true} />
//               <Separator className="my-2" />
//               <InputFeild label={"Challan No."} />
//               <InputFeild label={"Challan Date"} type="date" />
//               <InputFeild label={"P.O. No."} />
//               <InputFeild label={"P.O. Data"} type="date" />
//               <InputFeild label={"L.R. No."} />
//               <InputFeild label={"L.R. Date"} type="date" />
//               <Separator className="my-2" />
//               <div className="grid grid-cols-3 gap-3">
//                 <Label className="col-span-1">
//                   Delivery
//                   <RedStar />
//                 </Label>
//                 <Select>
//                   <SelectTrigger className="col-span-2">
//                     <SelectValue placeholder="Select Delivery Mode" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="hand">Hand Delivery</SelectItem>
//                     <SelectItem value="road-regular">
//                       Transport/Road - Regular
//                     </SelectItem>
//                     <SelectItem value="road-cargo">
//                       Road - Over Dimensional Cargo
//                     </SelectItem>
//                     <SelectItem value="rail">Rail</SelectItem>
//                     <SelectItem value="air">Air</SelectItem>
//                     <SelectItem value="ship">Ship</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <Card className="space-y-8">
//           {/* Header */}
//           <div className="flex justify-between items-center p-3">
//             <span className="text-lg font-semibold">Product Items</span>
//             <span className="flex items-center gap-x-3">
//               <Link href={"/dashboard/product-services/add"}>
//                 <Button size="sm">
//                   <PlusIcon />
//                   Add Product
//                 </Button>
//               </Link>
//               <Button size="sm">
//                 <PlusIcon />
//                 Add Additional Charges
//               </Button>
//             </span>
//           </div>

//           <div>
//             <div className="pb-3 flex justify-end items-center px-3">
//               <Button size="sm" variant="outline">
//                 <PlusIcon /> Product Row
//               </Button>
//             </div>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead className="w-16 text-center">SR.</TableHead>
//                   <TableHead className="text-center">
//                     Product / Other Charges
//                   </TableHead>
//                   <TableHead className="text-center w-28">
//                     HSN/SAC Code
//                   </TableHead>
//                   <TableHead className="text-center w-28">
//                     Qty. / Stock
//                   </TableHead>
//                   <TableHead className="text-center w-28">UOM</TableHead>
//                   <TableHead className="text-center w-28">Price (Rs)</TableHead>
//                   <TableHead className="text-center w-28">
//                     Discount(%)
//                   </TableHead>
//                   <TableHead className="text-center w-28">CESS(%)</TableHead>
//                   <TableHead className="text-center w-28">TOTAL(Rs)</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 <TableRow>
//                   <TableCell>
//                     <Input />
//                   </TableCell>
//                   <TableCell>
//                     <Input />
//                   </TableCell>
//                   <TableCell>
//                     <Input />
//                   </TableCell>
//                   <TableCell>
//                     <Input />
//                   </TableCell>
//                   <TableCell>
//                     <Input />
//                   </TableCell>
//                   <TableCell>
//                     <Input />
//                   </TableCell>
//                   <TableCell>
//                     <Input />
//                   </TableCell>
//                   <TableCell>
//                     <Input />
//                   </TableCell>
//                   <TableCell>
//                     <Input />
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//               <TableFooter>
//                 <TableRow>
//                   <TableCell colSpan={2} className="text-right">
//                     Total Inv. Value
//                   </TableCell>
//                   <TableCell className="text-right"></TableCell>
//                   <TableCell className="text-right">0</TableCell>
//                   <TableCell className="text-right"></TableCell>
//                   <TableCell className="text-right">0</TableCell>
//                   <TableCell className="text-right">0</TableCell>
//                   <TableCell className="text-right">0</TableCell>
//                   <TableCell className="text-right">0</TableCell>
//                 </TableRow>
//               </TableFooter>
//             </Table>
//           </div>

//           <div className="flex gap-x-10 px-5">
//             <div className="w-full space-y-3">
//               <InputFeild type="date" label={"Due Date"} />
//               <Separator />
//               <h3 className="font-medium">
//                 Terms & Condition / Additional Note
//               </h3>
//               <InputFeild label={"Title"} />
//               <InputFeild label={"Details"} type="textarea" />
//               <Button variant="outline" size="sm">
//                 <PlusIcon /> Add Notes
//               </Button>
//             </div>

//             <div className="w-full space-y-3">
//               <div className="flex justify-between items-center">
//                 <span>Total Taxable</span>
//                 <span>0</span>
//               </div>
//               <Separator />
//               <div className="flex justify-between items-center">
//                 <span>Total Tax</span>
//                 <span>0</span>
//               </div>
//               <Separator />
//               <div className="grid grid-cols-4 items-center">
//                 <span>TCS</span>
//                 <span className="flex gap-x-1 items-center">
//                   <span>Rs</span>
//                   <Switch />
//                   <span>%</span>
//                 </span>
//                 <span className="flex gap-x-1 items-center">
//                   <span>-</span>
//                   <Switch />
//                   <span>+</span>
//                 </span>
//                 <Input />
//               </div>
//               <div className="grid grid-cols-4 items-center">
//                 <span>Discount</span>
//                 <span className="flex gap-x-1 items-center">
//                   <span>Rs</span>
//                   <Switch />
//                   <span>%</span>
//                 </span>
//                 <span className="flex gap-x-1 items-center">
//                   <span>-</span>
//                   <Switch />
//                   <span>+</span>
//                 </span>
//                 <Input />
//               </div>
//               <Separator />
//               <div className="flex justify-between items-center">
//                 <span>GRAND TOTAL</span>
//                 <span>0</span>
//               </div>

//               <Separator />

//               <div className="flex justify-between items-center ">
//                 <span>
//                   Payment Type
//                   <RedStar />
//                 </span>
//                 <span className="flex items-center gap-x-3">
//                   <Button variant="outline">Credit</Button>
//                   <Button variant="outline">Cash</Button>
//                   <Button variant="outline">Cheque</Button>
//                   <Button variant="outline">Online</Button>
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-end items-center gap-x-5 border-t-[0.5px] py-5 px-3">
//             <Button>
//               <IconLeft /> Back
//             </Button>
//             <Button>
//               <Trash2 /> Discard
//             </Button>
//             <Button>
//               <PrinterIcon /> Print & Save
//             </Button>
//             <Button>
//               <FileIcon /> Save
//             </Button>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Page;

// const InputFeild = ({ label, required = false, type = "text", value = "", onChange=()=>{} }) => {
//   return (
//     <div className="grid grid-cols-3 gap-3 items-start">
//       <Label className="col-span-1 pt-1">
//         {label}
//         {required && <RedStar />}
//       </Label>
//       {type === "date" ? (
//         <Popover>
//           <PopoverTrigger asChild>
//             <Button
//               variant={"outline"}
//               className={cn(
//                 "col-span-2 w-full pl-3 text-left font-normal",
//                 !value && "text-muted-foreground"
//               )}
//             >
//               {field.value ? (
//                 format(value, "PPP")
//               ) : (
//                 <span>Pick a date</span>
//               )}
//               <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-auto p-0" align="start">
//             <Calendar
//               mode="single"
//               selected={value}
//               onSelect={onChange}
//               disabled={(date) =>
//                 date > new Date() || date < new Date("1900-01-01")
//               }
//               initialFocus
//             />
//           </PopoverContent>
//         </Popover>
//       ) : type === "textarea" ? (
//         <Textarea className="col-span-2" value={value} onChange={onChange} />
//       ) : (
//         <Input type={type} className="col-span-2" />
//       )}
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { z } from "zod";
import RedStar from "@/components/custom/RedStart";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  FileIcon,
  PlusIcon,
  PrinterIcon,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { IconLeft } from "react-day-picker";

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
  // Customer Information State
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    contactPerson: "",
    phone: "",
    gstPan: "",
    revCharge: "",
    placeOfSupply: "",
  });

  // Invoice Details State
  const [invoiceDetails, setInvoiceDetails] = useState({
    type: "",
    number: "",
    challanNo: "",
    challanDate: null,
    poNo: "",
    poDate: null,
    lrNo: "",
    lrDate: null,
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

    setTotals({
      totalTaxable: subtotal,
      totalTax: tcsAmount,
      grandTotal: finalTotal,
    });
  }, [productRows, additionalDetails.tcs, additionalDetails.discount]);

  // Handle form submission
  const handleSubmit = async (action) => {
    // Validate form data
    try {
      // Here you would add your validation logic
      const invoiceData = {
        customerInfo,
        invoiceDetails,
        productRows,
        additionalDetails,
        totals,
      };

      switch (action) {
        case "save":
          // Save logic
          console.log("Saving invoice:", invoiceData);
          break;
        case "print":
          // Print logic
          console.log("Printing invoice:", invoiceData);
          break;
        case "discard":
          // Reset form
          setCustomerInfo({});
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
        <span className="text-2xl font-semibold">Create Sale Invoice</span>
      </div>
      <hr />

      <div>
        <div className="block lg:flex gap-4">
          {/* Customer Information Card */}
          <CustomerInformationCard
            customerInfo={customerInfo}
            setCustomerInfo={setCustomerInfo}
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
            <TableBody>
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
                      type="number"
                      value={row.price}
                      onChange={(e) =>
                        handleProductRowChange(index, "price", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
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
          <div className="flex gap-x-10 px-5">
            {/* Notes Section */}
            <div className="w-full space-y-3">
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
const InputField = ({
  label,
  required = false,
  type = "text",
  value,
  onChange,
  ...props
}) => {
  if (type === "date") {
    return (
      <div className="grid grid-cols-3 gap-3 items-start">
        <Label className="col-span-1 pt-1">
          {label}
          {required && <RedStar />}
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "col-span-2 w-full pl-3 text-left font-normal",
                !value && "text-muted-foreground"
              )}
            >
              {value ? format(value, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={onChange}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className="grid grid-cols-3 gap-3 items-start">
        <Label className="col-span-1 pt-1">
          {label}
          {required && <RedStar />}
        </Label>
        <Textarea
          className="col-span-2"
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3 items-start">
      <Label className="col-span-1 pt-1">
        {label}
        {required && <RedStar />}
      </Label>
      <Input
        type={type}
        className="col-span-2"
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default Page;

const CustomerInformationCard = ({ customerInfo, setCustomerInfo }) => (
  <Card className="w-full lg:w-2/5 mb-5">
    <CardContent className="p-3 space-y-5">
      <div className="flex justify-between items-end h-8">
        <span>Customer Information</span>
        <Link href={"/dashboard/customer-vendor/add"}>
          <Button size="sm">
            <PlusIcon /> Add Customer
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
            setCustomerInfo((prev) => ({ ...prev, name: value }))
          }
          value={customerInfo.name}
        >
          <SelectTrigger className="col-span-2">
            <SelectValue placeholder="Select Customer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="customer1">Customer 1</SelectItem>
            <SelectItem value="customer2">Customer 2</SelectItem>
            <SelectItem value="customer3">Customer 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Address */}
      <InputField
        label="Address"
        type="textarea"
        required={true}
        value={customerInfo.address}
        onChange={(e) =>
          setCustomerInfo((prev) => ({
            ...prev,
            address: e.target.value,
          }))
        }
      />

      {/* Contact Person */}
      <InputField
        label="Contact Person"
        required={true}
        value={customerInfo.contactPerson}
        onChange={(e) =>
          setCustomerInfo((prev) => ({
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
        value={customerInfo.phone}
        onChange={(e) =>
          setCustomerInfo((prev) => ({
            ...prev,
            phone: e.target.value,
          }))
        }
      />

      {/* GSTIN/PAN */}
      <InputField
        label="GSTIN/PAN"
        required={true}
        value={customerInfo.gstPan}
        onChange={(e) =>
          setCustomerInfo((prev) => ({
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
          value={customerInfo.revCharge}
          onValueChange={(value) =>
            setCustomerInfo((prev) => ({
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
        value={customerInfo.placeOfSupply}
        onChange={(e) =>
          setCustomerInfo((prev) => ({
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
        <span>Invoice Details</span>
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

      {/* PO Details */}
      <InputField
        label="P.O. No"
        value={invoiceDetails.poNo}
        onChange={(e) =>
          setInvoiceDetails((prev) => ({
            ...prev,
            poNo: e.target.value,
          }))
        }
      />
      <InputField
        label="P.O. Date"
        type="date"
        value={invoiceDetails.poDate}
        onChange={(date) =>
          setInvoiceDetails((prev) => ({
            ...prev,
            poDate: date,
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
