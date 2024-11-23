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
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import InputField from "@/components/custom/Dashboard/InputFeildAddForm";

const ViewSaleInvoiceDetails = ({
  customerInfo,
  invoiceDetails,
  productRows,
  totals,
  additionalDetails,
}) => {
  return (
    <div className="px-10 py-5 space-y-5 w-full">
      <div className="flex justify-center items-center">
        <span className="text-2xl font-semibold">Sale Invoice</span>
      </div>
      <hr />

      <div>
        <div className="block lg:flex gap-4">
          {/* Customer Information Card */}
          <CustomerInformationCard customerInfo={customerInfo} />

          {/* Invoice Details Card */}
          <InvoiceDetailsCard invoiceDetails={invoiceDetails} />
        </div>

        {/* Products Table Card */}
        <Card className="space-y-8">
          <div className="flex justify-between items-center p-3">
            <span className="text-lg font-semibold">Product Items</span>
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
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Input value={row.product} readOnly />
                  </TableCell>
                  <TableCell>
                    <Input value={row.hsnCode} readOnly />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min={0}
                      value={row.quantity}
                      readOnly
                    />
                  </TableCell>
                  <TableCell>
                    <Input value={row.uom} readOnly />
                  </TableCell>
                  <TableCell>
                    <Input min={0} type="number" value={row.price} readOnly />
                  </TableCell>
                  <TableCell>
                    <Input
                      min={0}
                      type="number"
                      value={row.discount}
                      readOnly
                    />
                  </TableCell>
                  <TableCell>
                    <Input min={0} type="number" value={row.cess} readOnly />
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
                readOnly
              />
              <Separator />
              <h3 className="font-medium">
                Terms & Condition / Additional Note
              </h3>
              {additionalDetails.notes.map((note, index) => (
                <div key={index} className="space-y-2">
                  <InputField label="Title" value={note.title} readOnly />
                  <InputField
                    label="Details"
                    type="textarea"
                    value={note.details}
                    readOnly
                  />
                </div>
              ))}
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
                    readOnly
                  />
                  <span>%</span>
                </div>
                <div className="flex gap-x-1 items-center">
                  <span>-</span>
                  <Switch checked={additionalDetails.tcs.isPositive} readOnly />
                  <span>+</span>
                </div>
                <Input
                  type="number"
                  value={additionalDetails.tcs.value}
                  readOnly
                />
              </div>

              <div className="grid grid-cols-4 items-center">
                <span>Discount</span>
                <div className="flex gap-x-1 items-center">
                  <span>Rs</span>
                  <Switch
                    checked={additionalDetails.discount.isPercentage}
                    readOnly
                  />
                  <span>%</span>
                </div>
                <div className="flex gap-x-1 items-center">
                  <span>-</span>
                  <Switch
                    checked={additionalDetails.discount.isPositive}
                    readOnly
                  />
                  <span>+</span>
                </div>
                <Input
                  type="number"
                  value={additionalDetails.discount.value}
                  readOnly
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
                      disabled
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
                  readOnly
                  required="true"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center pb-5 px-5">
            <Link href={"/dashboard/sale-invoice"}>
              <Button>
                <ChevronLeft /> Back
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Enhanced InputField component with better date handling

export default ViewSaleInvoiceDetails;

const CustomerInformationCard = ({ customerInfo }) => (
  <Card className="w-full lg:w-2/5 mb-5">
    <CardContent className="p-3 space-y-5">
      <div className="flex justify-between items-end h-8">
        <span>Customer Information</span>
      </div>
      <Separator />

      {/* M/S Selection */}
      <InputField
        label="M/S"
        value={customerInfo.customerId.companyName}
        readOnly
      />

      {/* Address */}
      <InputField
        label="Address"
        type="textarea"
        value={(() => {
          const address = customerInfo.customerId.billingAddress;
          return (
            address.address1 +
            ", " +
            (address.address2 ? address.address2 + ", " : "") +
            address.city +
            ", " +
            address.state +
            " - " +
            address.pincode
          );
        })()}
        readOnly
      />

      {/* Contact Person */}
      <InputField
        label="Contact Person"
        required={true}
        value={customerInfo.contactPerson}
        readOnly
      />

      {/* Phone */}
      <InputField
        label="Phone No"
        required={true}
        type="tel"
        value={customerInfo.phone}
        readOnly
      />

      {/* GSTIN/PAN */}
      <InputField
        label="GSTIN/PAN"
        required={true}
        value={customerInfo.gstPan}
        readOnly
      />

      {/* Rev Charge */}
      <div className="grid grid-cols-3 gap-3">
        <Label className="col-span-1">
          Rev Charge
          <RedStar />
        </Label>
        <Select value={customerInfo.revCharge} readOnly>
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
        readOnly
      />
    </CardContent>
  </Card>
);

// Invoice Details Card
const InvoiceDetailsCard = ({ invoiceDetails }) => (
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
        <Select value={invoiceDetails.type} readOnly>
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
        readOnly
      />

      {/* Invoice Date */}
      <InputField
        label="Date"
        type="date"
        required={true}
        value={invoiceDetails.date}
        readOnly
      />

      {/* Challan Details */}
      <InputField
        label="Challan No"
        value={invoiceDetails.challanNo}
        readOnly
      />
      <InputField
        label="Challan Date"
        type="date"
        value={invoiceDetails.challanDate}
        readOnly
      />

      {/* PO Details */}
      <InputField label="P.O. No" value={invoiceDetails.poNo} readOnly />
      <InputField
        label="P.O. Date"
        type="date"
        value={invoiceDetails.poDate}
        readOnly
      />

      {/* LR and E-Way Details */}
      <InputField label="L.R. No" value={invoiceDetails.lrNo} readOnly />
      <InputField label="E-Way No" value={invoiceDetails.eWayNo} readOnly />

      {/* Delivery Mode */}
      <div className="grid grid-cols-3 gap-3">
        <Label className="col-span-1">
          Delivery
          <RedStar />
        </Label>
        <Select value={invoiceDetails.delivery} readOnly>
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
