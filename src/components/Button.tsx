export default function Button({children}: {children: React.ReactNode}) {
  return (
    <div className="px-8 py-4">
      <div className="grid gap-8 items-start justify-center">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <button className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center ">
              <span className=" text-gray-100">{children}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
