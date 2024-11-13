"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UnitOfMeasurement } from "@/lib/LabelType";
import { useState, useEffect } from "react";
import { AlertAddBox } from "../AlertBox";
import { AddProductGroup, GetProductGroups } from "@/actions/ProductGroup";
import { useSession } from "next-auth/react";
import { PlusIcon } from "lucide-react";

const AddForm = () => {
  const session = useSession();
  const [openAlert, setOpenAlert] = useState(false);
  const [newProductGroup, setNewProductGroup] = useState("");
  const [isNewProductGroup, setIsNewProductGroup] = useState(false);
  const [productGroups, setProductGroups] = useState([]);

  useEffect(() => {
    const fetchProductGroups = async () => {
      const productGroups = await GetProductGroups(session.data.user.email);
      setProductGroups(productGroups);
    };
    fetchProductGroups();
  }, [newProductGroup]);

  // Initial form state
  const [formData, setFormData] = useState({
    itemType: "Product", // Default item type
    name: "",
    productDescription: "",
    barcodeOrSerialNo: "",
    hsnSacCode: "",
    unitOfMeasurement: "kg", // Default unit
    gstPercentage: "",
    cessPercentage: "",
    noItc: false,
    normalBatchSerialNo: "",
    availableQty: 0,
    sellPrice: "",
    sellPriceInclTax: "",
    purchasePrice: "",
    purchasePriceInclTax: "",
    productGroup: "",
    discount: "",
    nonSalableProduct: false,
    enable: true,
  });

  // Calculate price including tax
  const calculatePriceWithTax = (price, gst, cess) => {
    if (price && gst >= 0 && cess >= 0) {
      const gstAmount = price * (gst / 100);
      const cessAmount = price * (cess / 100);
      return price + gstAmount + cessAmount;
    }
    return price; // Return original price if no tax is provided
  };

  useEffect(() => {
    const { sellPrice, gstPercentage, cessPercentage, purchasePrice } =
      formData;

    // Calculate Sell Price (Incl. Tax) and Purchase Price (Incl. Tax) only when necessary fields are filled
    if (sellPrice && gstPercentage !== "" && cessPercentage !== "") {
      const sellPriceNum = parseFloat(sellPrice);
      const gstNum = parseFloat(gstPercentage);
      const cessNum = parseFloat(cessPercentage);

      setFormData((prevData) => ({
        ...prevData,
        sellPriceInclTax: calculatePriceWithTax(sellPriceNum, gstNum, cessNum),
      }));
    }

    if (purchasePrice && gstPercentage !== "" && cessPercentage !== "") {
      const purchasePriceNum = parseFloat(purchasePrice);
      const gstNum = parseFloat(gstPercentage);
      const cessNum = parseFloat(cessPercentage);

      setFormData((prevData) => ({
        ...prevData,
        purchasePriceInclTax: calculatePriceWithTax(
          purchasePriceNum,
          gstNum,
          cessNum
        ),
      }));
    }
  }, [
    formData.sellPrice,
    formData.purchasePrice,
    formData.gstPercentage,
    formData.cessPercentage,
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submit
  const handleSubmit = () => {
    console.log(formData);
  };

  const handleCreateNewProductGroup = async () => {
    if (!newProductGroup.trim()) {
      return; // Do not send empty names
    }

    try {
      const response = await AddProductGroup(
        newProductGroup,
        session.data.user.email
      );

      if (!response.ok) {
        throw new Error("Failed to create product group");
      }

      setProductGroups([...productGroups, response.name]);
    } catch (error) {
      alert("Error creating product group: " + error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOpenAlert(true);
        }}
        className="space-y-6"
      >
        {/* Item Type */}
        <div>
          <Label className="block mb-2">Item Type</Label>
          <Select
            name="itemType"
            value={formData.itemType}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, itemType: value }))
            }
            className="w-full"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Item Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Product">Product</SelectItem>
              <SelectItem value="Service">Service</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Name */}
        <div>
          <Label className="block mb-2">Name*</Label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        {/* Product Description */}
        <div>
          <Label className="block mb-2">Product Description</Label>
          <Textarea
            name="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Barcode or Serial No. */}
        <div>
          <Label className="block mb-2">Barcode/Serial No.</Label>
          <Input
            name="barcodeOrSerialNo"
            value={formData.barcodeOrSerialNo}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* HSN/SAC Code */}
        <div>
          <Label className="block mb-2">HSN/SAC Code</Label>
          <Input
            name="hsnSacCode"
            value={formData.hsnSacCode}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Unit of Measurement */}
        <div>
          <Label className="block mb-2">Unit of Measurement</Label>
          <Select
            name="unitOfMeasurement"
            value={formData.unitOfMeasurement}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, unitOfMeasurement: value }))
            }
            className="w-full"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Unit of Measurement" />
            </SelectTrigger>
            <SelectContent>
              {UnitOfMeasurement.map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* GST and CESS */}
        <div className="space-y-4">
          <div>
            <Label className="block mb-2">GST Percentage</Label>
            <Input
              name="gstPercentage"
              type="number"
              step="0.01"
              min={0}
              value={formData.gstPercentage}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <Label className="block mb-2">CESS Percentage</Label>
            <Input
              name="cessPercentage"
              type="number"
              step="0.01"
              min={0}
              value={formData.cessPercentage}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        </div>

        {/* Prices */}
        <div className="space-y-4">
          <div>
            <Label className="block mb-2">Sell Price*</Label>
            <Input
              name="sellPrice"
              type="number"
              min={0}
              value={formData.sellPrice}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div>
            <Label className="block mb-2">Sell Price (Incl. Tax)</Label>
            <Input
              name="sellPriceInclTax"
              type="number"
              min={0}
              value={formData.sellPriceInclTax}
              disabled
              className="w-full"
            />
          </div>

          <div>
            <Label className="block mb-2">Purchase Price*</Label>
            <Input
              name="purchasePrice"
              type="number"
              min={0}
              value={formData.purchasePrice}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div>
            <Label className="block mb-2">Purchase Price (Incl. Tax)</Label>
            <Input
              name="purchasePriceInclTax"
              type="number"
              min={0}
              value={formData.purchasePriceInclTax}
              disabled
              className="w-full"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            name="noItc"
            checked={formData.noItc}
            onCheckedChange={(value) =>
              setFormData((prev) => ({ ...prev, noItc: value }))
            }
          />
          <Label className="text-sm">
            No ITC (Ineligible for Input Tax Credit)
          </Label>
        </div>

        {/* Normal Batch/Serial No */}
        <div>
          <Label className="block mb-2">Normal Batch/Serial No.</Label>
          <Input
            name="normalBatchSerialNo"
            value={formData.normalBatchSerialNo}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Available Quantity */}
        <div>
          <Label className="block mb-2">Available Quantity</Label>
          <Input
            name="availableQty"
            type="number"
            min={0}
            value={formData.availableQty}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Product Group */}
        <div>
          <h3 className="flex justify-between items-baseline mb-2">
            <Label className="block mb-2">Product Group</Label>
            <Button onClick={() => setIsNewProductGroup(true)} className="ml-2">
              <PlusIcon /> Add New Group
            </Button>
          </h3>
          <Select
            name="productGroup"
            value={formData.productGroup}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, productGroup: value }))
            }
            className="w-full"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Product/Service group" />
            </SelectTrigger>
            <SelectContent>
              {productGroups?.map((group) => (
                <SelectItem key={group._id} value={group._id}>
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {isNewProductGroup && (
          <div className="mt-2">
            <Input
              type="text"
              value={newProductGroup}
              onChange={(e) => setNewProductGroup(e.target.value)}
              placeholder="Enter new product group name"
              className="w-full"
            />
            <Button
              type="button"
              onClick={handleCreateNewProductGroup}
              className="mt-2"
            >
              Create Product Group
            </Button>
          </div>
        )}

        {/* Discount */}
        <div>
          <Label className="block mb-2">Discount</Label>
          <Input
            name="discount"
            type="number"
            step="0.1"
            min={0}
            value={formData.discount}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Non-Salable Product */}
        <div className="flex items-center space-x-2">
          <Checkbox
            name="nonSalableProduct"
            checked={formData.nonSalableProduct}
            onCheckedChange={(value) =>
              setFormData((prev) => ({ ...prev, nonSalableProduct: value }))
            }
          />
          <Label className="text-sm">Non-Salable Product</Label>
        </div>

        {/* Enable Product */}
        <div className="flex items-center space-x-2">
          <Checkbox
            name="enable"
            checked={formData.enable}
            onCheckedChange={(value) =>
              setFormData((prev) => ({ ...prev, enable: value }))
            }
          />
          <Label className="text-sm">Enable Product</Label>
        </div>

        {/* Submit Button */}
        <div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </form>
      <AlertAddBox
        open={openAlert}
        setOpen={setOpenAlert}
        handleAccept={handleSubmit}
      />
    </>
  );
};

export default AddForm;
