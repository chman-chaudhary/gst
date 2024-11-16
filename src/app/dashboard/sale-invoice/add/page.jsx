import RedStar from "@/components/custom/RedStart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";

const Page = () => {
  return (
    <div className="px-10 py-5 space-y-5 w-full">
      <div className="flex justify-center items-center">
        <span className="text-2xl font-semibold">Create Sale Invoice</span>
      </div>
      <hr />
      <div>
        <div className="block lg:flex gap-4">
          <Card className="w-full lg:w-2/5 mb-5">
            <CardContent className="p-3 space-y-5">
              <div className="flex justify-between items-end h-8">
                <span>Customer Information</span>
                <Button>
                  <PlusIcon /> Add Customer
                </Button>
              </div>
              <Separator />
              <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                <Label className="col-span-1">
                  M/S.
                  <RedStar />
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3 md:col-span-5">
                    <SelectValue placeholder="Select Customer" />
                  </SelectTrigger>
                  <SelectContent></SelectContent>
                </Select>
              </div>
              <InputFeild label={"Address"} required={true} />
              <InputFeild label={"Contact Person"} required={true} />
              <InputFeild label={"Phone"} required={true} />
              <InputFeild label={"GST/PAN"} required={true} />
              <InputFeild label={"Rev. Charge"} required={true} />
              <InputFeild label={"Place of Supply"} required={true} />
            </CardContent>
          </Card>
          <Card className="w-full lg:w-3/5 mb-5">
            <CardContent className="p-3 space-y-5">
              <div className="flex justify-between items-end h-8">
                <span>Invoice Details</span>
              </div>
              <Separator />
              <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                <Label>
                  Invoice Type
                  <RedStar />
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3 md:col-span-5">
                    <SelectValue placeholder="Select Invoice Type" />
                  </SelectTrigger>
                  <SelectContent></SelectContent>
                </Select>
              </div>
              <InputFeild label={"Invoice No."} required={true} />
              <Separator className="my-2" />
              <InputFeild label={"Challan No."} />
              <InputFeild label={"Challan Date"} type="date" />
              <InputFeild label={"P.O. No."} />
              <InputFeild label={"P.O. Data"} type="date" />
              <InputFeild label={"L.R. No."} />
              <InputFeild label={"L.R. Date"} type="date" />
              <Separator className="my-2" />
              <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                <Label className="col-span-1">
                  Delivery
                  <RedStar />
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3 md:col-span-5">
                    <SelectValue placeholder="Select Delivery Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hand">Hand Delivery</SelectItem>
                    <SelectItem value="road-regular">
                      Transport/Road - Regular
                    </SelectItem>
                    <SelectItem value="road-cargo">
                      Road - Over Dimensional Cargo
                    </SelectItem>
                    <SelectItem value="rail">Rail</SelectItem>
                    <SelectItem value="air">Air</SelectItem>
                    <SelectItem value="ship">Ship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;

const InputFeild = ({ label, required = false, type = "text" }) => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
      <Label className="col-span-1">
        {label}
        {required && <RedStar />}
      </Label>
      <Input type={type} className="col-span-3 md:col-span-5" />
    </div>
  );
};
