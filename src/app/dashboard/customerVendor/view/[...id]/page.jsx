import { getCustomerVendorById } from "@/actions/CustomerVendor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Page = async ({ params }) => {
  const { id } = await params;
  const customerVendor = await getCustomerVendorById(id[0]);
  console.log(customerVendor);
  return (
    <div className="flex justify-center w-screen">
      <div className="px-10 py-2 space-y-10 max-w-[800px] w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">View Cutomer/Vendor Details</h1>
          <span>Actions</span>
        </div>
        {Object.entries(customerVendor).map(([key, value]) => {
          if (typeof value === "object" && value !== null) {
            return (
              <div key={key}>
                <h3>{key}</h3>
                {Object.entries(value).map(([subKey, subValue]) => (
                  <InputField key={subKey} label={subKey} value={subValue} />
                ))}
              </div>
            );
          }
          return <InputField key={key} label={key} value={value} />;
        })}
      </div>
    </div>
  );
};

export default Page;

const InputField = ({ label, value }) => {
  return (
    <div className="space-y-2">
      <Label className="px-1 text-base">{label}:</Label>
      <Input value={value} readOnly />
    </div>
  );
};
