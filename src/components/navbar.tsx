import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="flex gap-4 items-center relative bg-transparent">
        <div className="flex flex-col gap-0 items-start relative bg-transparent">
          <div className="overflow-hidden relative w-4 h-full bg-transparent">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.02663 7L0.333333 5.41597L2.31846 1.91739L5.01333 3.4987L5.01487 0.333333H8.98513L8.98667 3.4987L11.6815 1.91739L13.6667 5.41597L10.9733 7L13.6667 8.58403L11.6815 12.0826L8.98667 10.5013L8.98513 13.6667H5.01487L5.01333 10.5013L2.31846 12.0826L0.333333 8.58403L3.02663 7Z"
                fill="#121417"
              />
            </svg>
            <div className="flex flex-col gap-0 items-start relative w-[13px] h-[13px] bg-transparent"></div>
          </div>
        </div>
        <div className="flex flex-col gap-0 items-start relative bg-transparent">
          <p className="font-bold leading-[23px] text-lg text-[#121417]">
            DevNet
          </p>
        </div>
      </div>
    </Link>
  );
};

const Navbar = () => {
  return (
    <div className="relative">
      <div className="fixed z-[10] border-x-0 border-t-0 border-b border-[#e5e8eb] px-10 py-3 flex justify-between items-center self-stretch w-full bg-white">
        <Logo />
        <div className="flex gap-8 justify-end items-start flex-1 relative w-full bg-transparent">
          <div className="flex gap-9 items-center relative h-10 bg-transparent">
            <Link
              href={"/"}
              className="flex flex-col gap-0 items-start relative bg-transparent"
            >
              <p className="font-medium leading-[21px] text-sm text-[#121417]">
                Home
              </p>
            </Link>
            <Link
              href={"/explore"}
              className="flex flex-col gap-0 items-start relative bg-transparent"
            >
              <p className="font-medium leading-[21px] text-sm text-[#121417]">
                Explore
              </p>
            </Link>
            <Link
              href={"/profile"}
              className="flex flex-col gap-0 items-start relative bg-transparent"
            >
              <p className="font-medium leading-[21px] text-sm text-[#121417]">
                Profile
              </p>
            </Link>
            <DynamicWidget variant="dropdown" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
