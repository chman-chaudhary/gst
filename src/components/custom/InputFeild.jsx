import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const InputField = ({ label, value, LabelType }) => {
  return (
    <div className="space-y-2">
      <Label className="px-1 text-base">{LabelType[label]}:</Label>
      <Input value={LabelType[value] ? LabelType[value] : value} readOnly />
    </div>
  );
};
