import { Navbar } from "@/components/custom/Navbar";

const layout = ({ children }) => {
  return (
    <div className="w-full">
      <Navbar className="fixed z-50" />
      <div className="pt-16 w-full">{children}</div>
    </div>
  );
};

export default layout;
