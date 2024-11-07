export const Navbar = ({ className }) => {
  return (
    <div
      className={`${className} w-full py-2 px-4 flex justify-between items-center border-b-[0.5px] border-gray-400/70 backdrop-blur-md`}
    >
      <span className="text-3xl font-semibold">Go GST</span>
      <span className="text-sm">Nav Options</span>
    </div>
  );
};
