import { getLeagerById } from "@/actions/Leagers";
import DeleteButton from "@/components/custom/CustomerVendor/DeleteButton";
import { InputField } from "@/components/custom/InputFeild";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LeagerLabel } from "@/lib/LabelType";
import { ArrowLeftIcon, EditIcon, Settings, Settings2Icon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async ({ params }) => {
  const { id } = await params;
  const leager = await getLeagerById(id[0]);

  if (!leager) {
    redirect("/dashboard/leagers");
    return <></>;
  }

  return (
    <div className="flex justify-center w-full">
      <div className="px-10 pt-4 pb-10 space-y-10 max-w-[800px] w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">View Leager Details</h1>
          <span className="flex items-center gap-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Settings />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    href={`/dashboard/leagers/edit/${id[0]}`}
                    className="flex justify-center items-center"
                  >
                    <EditIcon className="size-4 mr-2" /> Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DeleteButton id={id[0]} /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
        </div>
        {Object.entries(leager).map(([key, value]) => {
          if (
            key !== "_id" &&
            key !== "__v" &&
            value &&
            key !== "enable" &&
            key !== "user"
          ) {
            return (
              <InputField
                key={key}
                label={key}
                value={value}
                LabelType={LeagerLabel}
              />
            );
          }
        })}
        <Link
          href="/dashboard/leagers"
          className="flex justify-end items-center"
        >
          <Button>
            <ArrowLeftIcon /> Go Back
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
