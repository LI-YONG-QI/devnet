import React from "react";
import Image from "next/image";
import useNFTs from "@/hooks/contracts/useNFTs";

const Nfts = () => {
  const { nfts } = useNFTs();

  return (
    <section>
      <div className="px-4 pt-5 pb-3 flex flex-col gap-0 items-start self-stretch relative w-full bg-transparent">
        <h4 className="font-bold leading-7 text-[22px] text-[#121417]">
          Owned DevNFTs
        </h4>
      </div>
      <div className="p-4 flex flex-col gap-3 items-start self-stretch relative w-full h-[200px] bg-transparent">
        <div className="flex gap-3 items-start flex-1 self-stretch relative w-full h-full bg-transparent">
          <div>
            {nfts &&
              nfts.map((nft, index) => (
                <Image
                  key={index}
                  src="/solidity_logo.svg"
                  width={100}
                  height={100}
                  alt="Picture of the author"
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nfts;
