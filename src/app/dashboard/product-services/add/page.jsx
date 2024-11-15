import AddForm from "@/components/custom/ProductServices/AddForm";

const Page = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="px-10 pt-4 pb-10 space-y-10 max-w-[800px] w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Add New Cutomer/Vendor</h1>
        </div>
        <AddForm />
      </div>
    </div>
  );
};

export default Page;
