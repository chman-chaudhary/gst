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
  SheetOverlay,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import { PlusIcon } from "lucide-react";

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

export function AddForm({ open, setOpen, newClient, setNewClient }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-[50vw]">
        <SheetHeader>
          <SheetTitle>Add Form</SheetTitle>
          <SheetDescription>
            Add details to add new Customer/Vendor here. Click save when you're
            done.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="max-h-[calc(100vh-150px)] overflow-y-auto">
          <div className="grid gap-4 py-4">
            {/* Company Type */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="companyType" className="text-right">
                Company Type
              </Label>
              <Input
                id="companyType"
                name="companyType"
                value={newClient.companyType || ""}
                onChange={handleChange}
                placeholder="Customer / Vendor"
                className="col-span-3"
              />
            </div>

            {/* GSTIN */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gstin" className="text-right">
                GSTIN
              </Label>
              <Input
                id="gstin"
                name="gstin"
                value={newClient.gstin || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Company Name */}
            <div className="grid grid-cols-4 items-center gap-4">
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
            </div>

            {/* Contact Person */}
            <div className="grid grid-cols-4 items-center gap-4">
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
            </div>

            {/* Contact Number */}
            <div className="grid grid-cols-4 items-center gap-4">
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
            </div>

            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-4">
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
            </div>

            {/* Registration Type */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="registrationType" className="text-right">
                Registration Type
              </Label>
              <Input
                id="registrationType"
                name="registrationType"
                value={newClient.registrationType || ""}
                onChange={handleChange}
                placeholder="E.g., Unregistered"
                className="col-span-3"
              />
            </div>

            {/* PAN */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pan" className="text-right">
                PAN
              </Label>
              <Input
                id="pan"
                name="pan"
                value={newClient.pan || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Billing Address */}
            <hr />
            <h3>Billing Address</h3>
            <hr />
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address1" className="text-right">
                Address 1
              </Label>
              <Input
                id="address1"
                name="billingAddress.address1"
                value={newClient.billingAddress?.address1 || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address2" className="text-right">
                Address 2
              </Label>
              <Input
                id="address2"
                name="billingAddress.address2"
                value={newClient.billingAddress?.address2 || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* More Address Fields */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                City
              </Label>
              <Input
                id="city"
                name="billingAddress.city"
                value={newClient.billingAddress?.city || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pincode" className="text-right">
                Pin Code
              </Label>
              <Input
                id="city"
                name="billingAddress.pincode"
                value={newClient.billingAddress?.pincode || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="state" className="text-right">
                State
              </Label>
              <Input
                id="city"
                name="billingAddress.state"
                value={newClient.billingAddress?.state || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="country" className="text-right">
                Country
              </Label>
              <Input
                id="city"
                name="billingAddress.country"
                value={newClient.billingAddress?.country || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            {/* Distance for E-Way Bill */}
            <div className="grid grid-cols-4 items-center gap-4">
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
            </div>

            <hr />
            <h3>Opening Balance</h3>
            <hr />

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerBalance" className="text-right">
                Customer Balance
              </Label>
              <Input
                id="customerBalance"
                name="customerBalance"
                type="number"
                value={newClient.customerBalance || ""}
                onChange={handleChange}
                placeholder="Debit or Creadit (Change to radio)"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
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
            </div>

            <hr />
            <div className="flex justify-between items-center">
              <span>Shipping Address</span>
              <Button>
                <PlusIcon /> Add
              </Button>
            </div>
            <hr />

            {/* Enable Toggle */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="enable" className="text-right">
                Enable
              </Label>
              <Input
                id="enable"
                name="enable"
                type="checkbox"
                checked={newClient.enable || false}
                onChange={(e) =>
                  setNewClient((prev) => ({
                    ...prev,
                    enable: e.target.checked,
                  }))
                }
                className="col-span-3"
              />
            </div>
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
