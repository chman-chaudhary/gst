"use client";

import { updateLeager } from "@/actions/Leagers";
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

const UpdateLeagerPage = ({ leagerInfo }) => {
  const router = useRouter();
  const { toast } = useToast();
  const session = useSession();

  const [leager, setLeager] = useState(leagerInfo);
  const [countryid, setCountryid] = useState(null);
  const [stateid, setStateid] = useState(null);

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const countryList = await GetCountries();
      const country = countryList.find((c) => c.name === leager.country);
      setCountryid(country.id);
      setCountriesList(countryList);
      const stateList = await GetState(country.id);
      const state = stateList.find((s) => s.name === leager.state);
      setStateid(state.id);
      setStateList(stateList);
      const city = await GetCity(country.id, state.id);
      setCityList(city);
    };
    fetch();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeager((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session.data) {
      return router.push("/login");
    }

    try {
      const data = await updateLeager(
        leagerInfo._id,
        leager,
        session.data.user.email
      );
      console.log(data);
      if (data.success) {
        toast({ title: "Leager updated successfully." });
        router.push("/dashboard/leagers");
      } else {
        toast({ variant: "destructive", title: data.message });
      }
    } catch (error) {
      console.error("Error updating Leager:", error);
      toast({ variant: "destructive", title: "Error updating Leager" });
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="px-10 pt-4 pb-10 space-y-10 max-w-[800px] w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Edit Leager</h1>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between">
            <Label htmlFor="businessType" className="w-1/4 text-base">
              Business Type
            </Label>
            <RadioGroup
              defaultValue="customer"
              className="flex justify-between items-center w-3/4 text-base"
              value={leager.businessType || "customer"}
              onValueChange={(value) =>
                setLeager({ ...leager, businessType: value })
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
            label="Business Name"
            name="businessName"
            value={leager.businessName || ""}
            onChange={handleChange}
            required={true}
            placeholder="Business Name"
          />
          <InputField
            label="Contact Person"
            name="contactPerson"
            value={leager.contactPerson || ""}
            onChange={handleChange}
            required={true}
            placeholder="Contact Person"
          />
          <InputField
            label="Contact Number"
            type="tel"
            name="contactNo"
            value={leager.contactNo || ""}
            onChange={handleChange}
            placeholder="98765XXXXX"
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            value={leager.email || ""}
            onChange={handleChange}
            required={true}
            placeholder="youremail@gmail.com"
          />

          <InputField
            label="GSTIN"
            name="gstin"
            value={leager.gstin || ""}
            onChange={handleChange}
            placeholder="GST Number"
            className="uppercase"
          />

          {leager.gstin && (
            <div className="flex items-center justify-between">
              <Label htmlFor="registrationType" className="w-1/4 text-base">
                Registration Type
              </Label>
              <RadioGroup
                defaultValue="regular"
                className="flex justify-around items-center w-3/4 text-base"
                value={leager.registrationType}
                onValueChange={(value) =>
                  setLeager({ ...leager, registrationType: value })
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
          )}

          <InputField
            label="AADHAR"
            name="aadhar"
            value={leager.aadhar || ""}
            onChange={handleChange}
            required={true}
            placeholder="AADHAR NUMBER"
            className="uppercase"
          />

          <InputField
            type="textarea"
            label="Address"
            name="address"
            value={leager.address || ""}
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
                  setLeager((prev) => ({ ...prev, country: country.name }));
                  GetState(country.id).then((result) => {
                    setStateList(result);
                  });
                }
              }}
              value={leager.country}
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
                  setLeager((prev) => ({ ...prev, state: state.name }));
                  setStateid(state.id);
                  GetCity(countryid, state.id).then((result) => {
                    setCityList(result);
                  });
                }
              }}
              value={leager.state}
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
                  setLeager((prev) => ({ ...prev, city: city.name }));
                }
              }}
              value={leager.city}
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
            value={leager.pincode || ""}
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

export default UpdateLeagerPage;

// Reuse InputField component from AddLeager
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
