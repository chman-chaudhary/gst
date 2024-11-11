import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LableType } from "@/lib/LabelType";

export const InputField = ({ label, value }) => {
  return (
    <div className="space-y-2">
      <Label className="px-1 text-base">{LableType[label]}:</Label>
      <Input value={LableType[value] ? LableType[value] : value} readOnly />
    </div>
  );
};
