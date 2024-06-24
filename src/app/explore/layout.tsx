import React from "react";

const Page = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-1/2 min-h-screen flex pt-[65px] overflow-hidden">
      <div className="flex-1 p-16 pt-10 pl-20">{children}</div>
    </div>
  );
};

export default Page;
