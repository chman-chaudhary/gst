"use client";

import { AddCustomerVendor, AddLeager } from "@/actions/Leagers";
import RedStar from "@/components/custom/RedStart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckIcon, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GetCountries, GetState, GetCity } from "react-country-state-city";

const Page = () => {
  const router = useRouter();
  const { toast } = useToast();
  const session = useSession();

  if (!session) {
    router.push("/login");
  }

  const [newLeager, setNewLeager] = useState({
    businessType: "customer",
    gstin: "",
    businessName: "",
    contactPerson: "",
    contactNo: "",
    email: "",
    registrationType: "regular",
    aadhar: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
  });

  const [countryid, setCountryid] = useState(null);
  const [stateid, setStateid] = useState(null);

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLeager((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await AddLeager(newLeager, session.data?.user.email);
      if (data.success) {
        toast({ title: "Leager added successfully." });
      } else {
        toast({ variant: "destructive", title: "Error! while adding leager." });
      }
      router.push("/dashboard/leagers");
    } catch (error) {
      console.error("Error adding Leager:", error);
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="px-10 pt-4 pb-10 space-y-10 max-w-[800px] w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Add New Leager</h1>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between">
            <Label htmlFor="businessType" className="w-1/4 text-base">
              Business Type
            </Label>
            <RadioGroup
              defaultValue="customer"
              className="flex justify-between items-center w-3/4 text-base"
              value={newLeager.businessType || "customer"}
              onValueChange={(value) =>
                setNewLeager({ ...newLeager, businessType: value })
              }
            >
              <span className="flex items-center space-x-2">
                <RadioGroupItem value="customer" id="customer" />
                <Label htmlFor="customer" className="text-base">
                  Customer
                </Label>
              </span>
              <span className="flex items-center space-x-2">
                <RadioGroupItem value="vendor" id="vendor" />
                <Label htmlFor="vendor" className="text-base">
                  Vendor
                </Label>
              </span>
              <span className="flex items-center space-x-2">
                <RadioGroupItem value="customer/vendor" id="customer/vendor" />
                <Label htmlFor="customer/vendor" className="text-base">
                  Customer/Vendor
                </Label>
              </span>
            </RadioGroup>
          </div>

          <InputField
            label="GSTIN"
            name="gstin"
            value={newLeager.gstin || ""}
            onChange={handleChange}
            placeholder="GST Number"
            className="uppercase"
          />
          <InputField
            label="Business Name"
            name="businessName"
            value={newLeager.businessName || ""}
            onChange={handleChange}
            required={true}
            placeholder="Business Name"
          />
          <InputField
            label="Contact Person"
            name="contactPerson"
            value={newLeager.contactPerson || ""}
            onChange={handleChange}
            required={true}
            placeholder="Contact Person"
          />
          <InputField
            label="Contact Number"
            type="tel"
            name="contactNo"
            value={newLeager.contactNo || ""}
            onChange={handleChange}
            placeholder="98765XXXXX"
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            value={newLeager.email || ""}
            onChange={handleChange}
            required={true}
            placeholder="youremail@gmail.com"
          />

          <div className="flex items-center justify-between">
            <Label htmlFor="registrationType" className="w-1/4 text-base">
              Registration Type
            </Label>
            <RadioGroup
              defaultValue="regular"
              className="flex justify-around items-center w-3/4 text-base"
              value={newLeager.registrationType || "regular"}
              onValueChange={(value) =>
                setNewLeager({ ...newLeager, registrationType: value })
              }
            >
              <span className="flex items-center space-x-2">
                <RadioGroupItem value="regular" id="regular" />
                <Label htmlFor="regular" className="text-base">
                  Regular
                </Label>
              </span>
              <span className="flex items-center space-x-2">
                <RadioGroupItem value="composite" id="composite" />
                <Label htmlFor="composite" className="text-base">
                  Composite
                </Label>
              </span>
            </RadioGroup>
          </div>

          <InputField
            label="AADHAR"
            name="aadhar"
            value={newLeager.aadhar || ""}
            onChange={handleChange}
            required={true}
            placeholder="AADHAR NUMBER"
            className="uppercase"
          />

          <InputField
            type="textarea"
            label="Address"
            name="address"
            value={newLeager.address || ""}
            onChange={handleChange}
            required={true}
          />

          <div>
            <Label className="text-base">
              Country
              <RedStar />
            </Label>
            <Select
              onValueChange={(value) => {
                const country = countriesList.find((c) => c.name === value);
                if (country) {
                  setCountryid(country.id);
                  setNewLeager((prev) => ({ ...prev, country: country.name }));
                  GetState(country.id).then((result) => {
                    setStateList(result);
                  });
                }
              }}
              value={newLeager.country}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                {countriesList.map((country) => (
                  <SelectItem key={country.id} value={country.name}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-base">
              State
              <RedStar />
            </Label>
            <Select
              onValueChange={(value) => {
                const state = stateList.find((c) => c.name === value);
                if (state) {
                  setNewLeager((prev) => ({ ...prev, state: state.name }));
                  setStateid(state.id);
                  GetCity(countryid, state.id).then((result) => {
                    setCityList(result);
                  });
                }
              }}
              value={newLeager.state}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {stateList.map((state) => (
                  <SelectItem key={state.id} value={state.name}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-base">
              City
              <RedStar />
            </Label>
            <Select
              onValueChange={(value) => {
                const city = cityList.find((c) => c.name === value);
                if (city) {
                  setNewLeager((prev) => ({ ...prev, city: city.name }));
                }
              }}
              value={newLeager.city}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {cityList.map((city) => (
                  <SelectItem key={city.id} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <InputField
            label="PIN Code"
            name="pincode"
            type="number"
            value={newLeager.pincode || ""}
            onChange={handleChange}
            required={true}
          />

          <div className="flex justify-between items-center">
            <Link href={"/dashboard/leagers"}>
              <Button variant="destructive">
                <Trash2 /> Discard
              </Button>
            </Link>
            <Button type="submit">
              <CheckIcon /> Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;

const InputField = ({
  value = "",
  name = "",
  type = "text",
  label = "",
  className = "",
  onChange = () => {},
  placeholder = "",
  required = false,
}) => {
  return (
    <div className={`${className}`}>
      <Label htmlFor={name} className="text-base">
        {label}
        {required && <RedStar />}
      </Label>
      {type === "textarea" ? (
        <Textarea
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`text-base ${className}`}
        />
      ) : (
        <Input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`text-base ${className}`}
        />
      )}
    </div>
  );
};
