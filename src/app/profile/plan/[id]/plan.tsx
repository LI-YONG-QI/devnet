"use client";

import { ROUTER_ABI } from "@/abis/router";
import { activePlan, mintPlanNFT } from "@/actions/contracts/plan";
import { usePlanBtnStatus } from "@/hooks/contracts/usePlanBtnStatus";
import usePlanData from "@/hooks/contracts/usePlanData";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { usePlan } from "@/hooks/usePlan";
import { ROUTER_ADDR } from "@/utils/constants";
import assert from "assert";
import Link from "next/link";
import { Address, BaseError, ContractFunctionRevertedError } from "viem";
import { useAccount, useWriteContract } from "wagmi";

const Plan = ({ id }: { id: string }) => {
  const { user } = useCurrentUser();
  const account = useAccount();
  const { plan } = usePlan(id);
  const { planData } = usePlanData(plan?.contract as Address);
  const { writeContractAsync } = useWriteContract();

  const { buttonStatus } = usePlanBtnStatus(
    account.address!,
    plan?.contract as Address
  );

  const mockUser = "Fox"; // Replace with actual user data

  const finishPlan = async () => {
    try {
      assert(user?.id, "User is undefined");
      assert(plan?.id, "Plan is undefined");

      const hash = await writeContractAsync({
        address: ROUTER_ADDR as `0x${string}`,
        abi: ROUTER_ABI,
        functionName: "mint",
        value: planData?.price,
        args: [account.address!, plan?.contract as `0x${string}`],
      });

      await mintPlanNFT(hash);

      alert("Mint !!");
    } catch (e) {
      const error = e as BaseError;
      const cause = error.cause as ContractFunctionRevertedError;

      console.error("Error finish plan:", cause.reason);
      alert("Something error");
    }
  };

  const startPlan = async () => {
    try {
      assert(user?.id, "User is undefined");
      assert(plan?.id, "Plan is undefined");

      const hash = await writeContractAsync({
        address: ROUTER_ADDR as `0x${string}`,
        abi: ROUTER_ABI,
        functionName: "active",
        args: [account.address!, plan?.contract as `0x${string}`],
      });

      await activePlan(hash, user.id, plan.id);

      alert("Start plan !!");
    } catch (error) {
      console.error("Error starting plan:", error);
      alert("Something error");
    }
  };

  return (
    <div className="overflow-hidden flex flex-col gap-0 items-start flex-1 relative w-full bg-transparent">
      <div className="border-b-4 border-slate-600 p-4 flex justify-between items-end self-stretch flex-wrap relative w-full bg-transparent">
        <div className="flex flex-row gap-0 items-end relative w-72 h-10 bg-transparent">
          <h2 className="font-bold leading-10 text-[32px] text-[#0d141c]">
            {plan?.title}
          </h2>
          <div className="ml-10 text-slate-500">
            {`${planData?.period}`} days
          </div>
        </div>
        <div className="flex flex-col text-[13px]">
          <p>{`Creator: ${mockUser}`}</p>
          <Link
            href={`https://sepolia.explorer.zora.energy/address/${plan?.contract}`}
          >
            <p className="text-[#007aff] leading-6">{plan?.contract}</p>
          </Link>
        </div>
      </div>
      <div className="px-4 pt-4 pb-2 flex flex-col gap-0 items-start self-stretch relative w-full bg-transparent">
        <p className="font-bold leading-[23px] text-lg text-[#0d141c]">
          Introduction
        </p>
      </div>
      <div className="px-4 pt-1 pb-3 flex flex-col gap-0 items-start self-stretch relative w-full bg-transparent">
        <p className="leading-6 text-base text-[#0d141c]">
          {plan?.introduction}
        </p>
      </div>

      <div className="px-4 pt-4 pb-2 flex flex-col gap-0 items-start self-stretch relative w-full bg-transparent">
        <p className="font-bold leading-[23px] text-lg text-[#0d141c]">
          Description
        </p>
      </div>
      <div className="px-4 pt-1 pb-3 flex flex-col gap-0 items-start self-stretch relative w-full bg-transparent">
        <p className="leading-6 text-base text-[#0d141c]">
          {plan?.description}
        </p>
      </div>
      <div className="px-4 pt-4 pb-2 flex flex-col gap-0 items-start self-stretch relative w-full h-[47px] bg-transparent">
        <p className="font-bold leading-[23px] text-lg text-[#0d141c]">
          What you&apos;ll learn
        </p>
      </div>
      <div className="p-4 flex flex-col gap-3 items-start self-stretch relative w-full bg-transparent">
        <div className="flex gap-3 items-start flex-1 self-stretch relative w-full h-full bg-transparent">
          <div className="rounded-lg border border-[#cfdee8] p-4 flex gap-3 items-center flex-1 self-stretch relative w-full h-full bg-[#f7fafc]">
            <div className="flex flex-col gap-0 items-start relative bg-transparent">
              <div className="overflow-hidden relative w-6 h-full bg-transparent">
                <svg
                  width="19"
                  height="14"
                  viewBox="0 0 19 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.5306 1.28062L6.53063 13.2806C6.38995 13.4215 6.19906 13.5006 6 13.5006C5.80094 13.5006 5.61005 13.4215 5.46937 13.2806L0.219375 8.03063C-0.0736812 7.73757 -0.0736812 7.26243 0.219375 6.96937C0.512431 6.67632 0.987569 6.67632 1.28062 6.96937L6 11.6897L17.4694 0.219375C17.7624 -0.073681 18.2376 -0.073681 18.5306 0.219375C18.8237 0.512431 18.8237 0.987569 18.5306 1.28062V1.28062Z"
                    fill="#0D141C"
                  />
                </svg>
                <div className="flex flex-col gap-0 items-start relative w-[19px] h-[14px] bg-transparent"></div>
              </div>
            </div>
            <div className="flex flex-col gap-0 items-start relative w-[106px] h-15 bg-transparent">
              <p className="font-bold leading-5 text-base text-[#0d141c]">
                Learn the basics of React Native
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-[#cfdee8] p-4 flex gap-3 items-center flex-1 self-stretch relative w-full h-full bg-[#f7fafc]">
            <div className="flex flex-col gap-0 items-start relative bg-transparent">
              <div className="overflow-hidden relative w-6 h-full bg-transparent">
                <svg
                  width="19"
                  height="14"
                  viewBox="0 0 19 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.5306 1.28062L6.53063 13.2806C6.38995 13.4215 6.19906 13.5006 6 13.5006C5.80094 13.5006 5.61005 13.4215 5.46937 13.2806L0.219375 8.03063C-0.0736812 7.73757 -0.0736812 7.26243 0.219375 6.96937C0.512431 6.67632 0.987569 6.67632 1.28062 6.96937L6 11.6897L17.4694 0.219375C17.7624 -0.073681 18.2376 -0.073681 18.5306 0.219375C18.8237 0.512431 18.8237 0.987569 18.5306 1.28062V1.28062Z"
                    fill="#0D141C"
                  />
                </svg>
                <div className="flex flex-col gap-0 items-start relative w-[19px] h-[14px] bg-transparent"></div>
              </div>
            </div>
            <div className="flex flex-col gap-0 items-start relative w-[106px] h-20 bg-transparent">
              <p className="font-bold leading-5 text-base text-[#0d141c]">
                Understand how to use React Native components
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-[#cfdee8] p-4 flex gap-3 items-center flex-1 self-stretch relative w-full h-full bg-[#f7fafc]">
            <div className="flex flex-col gap-0 items-start relative bg-transparent">
              <div className="overflow-hidden relative w-6 h-full bg-transparent">
                <svg
                  width="19"
                  height="14"
                  viewBox="0 0 19 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.5306 1.28062L6.53063 13.2806C6.38995 13.4215 6.19906 13.5006 6 13.5006C5.80094 13.5006 5.61005 13.4215 5.46937 13.2806L0.219375 8.03063C-0.0736812 7.73757 -0.0736812 7.26243 0.219375 6.96937C0.512431 6.67632 0.987569 6.67632 1.28062 6.96937L6 11.6897L17.4694 0.219375C17.7624 -0.073681 18.2376 -0.073681 18.5306 0.219375C18.8237 0.512431 18.8237 0.987569 18.5306 1.28062V1.28062Z"
                    fill="#0D141C"
                  />
                </svg>
                <div className="flex flex-col gap-0 items-start relative w-[19px] h-[14px] bg-transparent"></div>
              </div>
            </div>
            <div className="flex flex-col gap-0 items-start relative w-[106px] h-15 bg-transparent">
              <p className="font-bold leading-5 text-base text-[#0d141c]">
                Style your app with React Native
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-[#cfdee8] p-4 flex gap-3 items-center flex-1 self-stretch relative w-full h-full bg-[#f7fafc]">
            <div className="flex flex-col gap-0 items-start relative bg-transparent">
              <div className="overflow-hidden relative w-6 h-full bg-transparent">
                <svg
                  width="19"
                  height="14"
                  viewBox="0 0 19 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.5306 1.28062L6.53063 13.2806C6.38995 13.4215 6.19906 13.5006 6 13.5006C5.80094 13.5006 5.61005 13.4215 5.46937 13.2806L0.219375 8.03063C-0.0736812 7.73757 -0.0736812 7.26243 0.219375 6.96937C0.512431 6.67632 0.987569 6.67632 1.28062 6.96937L6 11.6897L17.4694 0.219375C17.7624 -0.073681 18.2376 -0.073681 18.5306 0.219375C18.8237 0.512431 18.8237 0.987569 18.5306 1.28062V1.28062Z"
                    fill="#0D141C"
                  />
                </svg>
                <div className="flex flex-col gap-0 items-start relative w-[19px] h-[14px] bg-transparent"></div>
              </div>
            </div>
            <div className="flex flex-col gap-0 items-start relative w-[106px] h-20 bg-transparent">
              <p className="font-bold leading-5 text-base text-[#0d141c]">
                Navigate between screens in React Native
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-[#cfdee8] p-4 flex gap-3 items-center flex-1 self-stretch relative w-full h-full bg-[#f7fafc]">
            <div className="flex flex-col gap-0 items-start relative bg-transparent">
              <div className="overflow-hidden relative w-6 h-full bg-transparent">
                <svg
                  width="19"
                  height="14"
                  viewBox="0 0 19 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.5306 1.28062L6.53063 13.2806C6.38995 13.4215 6.19906 13.5006 6 13.5006C5.80094 13.5006 5.61005 13.4215 5.46937 13.2806L0.219375 8.03063C-0.0736812 7.73757 -0.0736812 7.26243 0.219375 6.96937C0.512431 6.67632 0.987569 6.67632 1.28062 6.96937L6 11.6897L17.4694 0.219375C17.7624 -0.073681 18.2376 -0.073681 18.5306 0.219375C18.8237 0.512431 18.8237 0.987569 18.5306 1.28062V1.28062Z"
                    fill="#0D141C"
                  />
                </svg>
                <div className="flex flex-col gap-0 items-start relative w-[19px] h-[14px] bg-transparent"></div>
              </div>
            </div>
            <div className="flex flex-col gap-0 items-start relative w-[106px] h-15 bg-transparent">
              <p className="font-bold leading-5 text-base text-[#0d141c]">
                Use built-in React Native APIs
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-start flex-1 self-stretch relative w-full h-full bg-transparent">
          <div className="rounded-lg border border-[#cfdee8] p-4 flex gap-3 items-center self-stretch relative w-44 h-full bg-[#f7fafc]">
            <div className="flex flex-col gap-0 items-start relative bg-transparent">
              <div className="overflow-hidden relative w-6 h-full bg-transparent">
                <svg
                  width="19"
                  height="14"
                  viewBox="0 0 19 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.5306 1.28062L6.53063 13.2806C6.38995 13.4215 6.19906 13.5006 6 13.5006C5.80094 13.5006 5.61005 13.4215 5.46937 13.2806L0.219375 8.03063C-0.0736812 7.73757 -0.0736812 7.26243 0.219375 6.96937C0.512431 6.67632 0.987569 6.67632 1.28062 6.96937L6 11.6897L17.4694 0.219375C17.7624 -0.073681 18.2376 -0.073681 18.5306 0.219375C18.8237 0.512431 18.8237 0.987569 18.5306 1.28062V1.28062Z"
                    fill="#0D141C"
                  />
                </svg>
                <div className="flex flex-col gap-0 items-start relative w-[19px] h-[14px] bg-transparent"></div>
              </div>
            </div>
            <div className="flex flex-col gap-0 items-start relative w-[106px] h-15 bg-transparent">
              <p className="font-bold leading-5 text-base text-[#0d141c]">
                Handle user input in React Native
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-[#cfdee8] p-4 flex gap-3 items-center self-stretch relative w-44 h-full bg-[#f7fafc]">
            <div className="flex flex-col gap-0 items-start relative bg-transparent">
              <div className="overflow-hidden relative w-6 h-full bg-transparent">
                <svg
                  width="19"
                  height="14"
                  viewBox="0 0 19 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.5306 1.28062L6.53063 13.2806C6.38995 13.4215 6.19906 13.5006 6 13.5006C5.80094 13.5006 5.61005 13.4215 5.46937 13.2806L0.219375 8.03063C-0.0736812 7.73757 -0.0736812 7.26243 0.219375 6.96937C0.512431 6.67632 0.987569 6.67632 1.28062 6.96937L6 11.6897L17.4694 0.219375C17.7624 -0.073681 18.2376 -0.073681 18.5306 0.219375C18.8237 0.512431 18.8237 0.987569 18.5306 1.28062V1.28062Z"
                    fill="#0D141C"
                  />
                </svg>
                <div className="flex flex-col gap-0 items-start relative w-[19px] h-[14px] bg-transparent"></div>
              </div>
            </div>
            <div className="flex flex-col gap-0 items-start relative w-[106px] h-20 bg-transparent">
              <p className="font-bold leading-5 text-base text-[#0d141c]">
                Learn about props and state in React Native
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-[#cfdee8] p-4 flex gap-3 items-center self-stretch relative w-44 h-full bg-[#f7fafc]">
            <div className="flex flex-col gap-0 items-start relative bg-transparent">
              <div className="overflow-hidden relative w-6 h-full bg-transparent">
                <svg
                  width="19"
                  height="14"
                  viewBox="0 0 19 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.5306 1.28062L6.53063 13.2806C6.38995 13.4215 6.19906 13.5006 6 13.5006C5.80094 13.5006 5.61005 13.4215 5.46937 13.2806L0.219375 8.03063C-0.0736812 7.73757 -0.0736812 7.26243 0.219375 6.96937C0.512431 6.67632 0.987569 6.67632 1.28062 6.96937L6 11.6897L17.4694 0.219375C17.7624 -0.073681 18.2376 -0.073681 18.5306 0.219375C18.8237 0.512431 18.8237 0.987569 18.5306 1.28062V1.28062Z"
                    fill="#0D141C"
                  />
                </svg>
                <div className="flex flex-col gap-0 items-start relative w-[19px] h-[14px] bg-transparent"></div>
              </div>
            </div>
            <div className="flex flex-col gap-0 items-start relative w-[106px] h-20 bg-transparent">
              <p className="font-bold leading-5 text-base text-[#0d141c]">
                Debug and test your React Native app
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 pt-4 pb-2 flex flex-col gap-0 items-start self-stretch relative w-full h-[47px] bg-transparent">
        <p className="font-bold leading-[23px] text-lg text-[#0d141c]">
          When you&apos;re finished
        </p>
      </div>
      <div className="px-4 pt-1 pb-3 flex flex-col gap-0 items-start self-stretch relative w-full bg-transparent">
        <p className="leading-6 text-base text-[#0d141c]">
          After completing this learning plan, you&apos;ll have a solid
          understanding of how to build mobile applications with React Native.
          You&apos;ll be familiar with the core concepts and APIs, and
          you&apos;ll have built a simple, functional React Native app from
          scratch. This foundation will serve as a stepping stone to more
          advanced topics and projects, such as navigation, data management, and
          integrating with native modules.
        </p>
      </div>
      <div className="flex justify-between items-start self-stretch relative w-full bg-transparent">
        <div className="px-4 py-3 flex gap-3 justify-end items-start flex-1 flex-wrap relative w-full bg-transparent">
          <button
            onClick={buttonStatus === "Inactive" ? startPlan : finishPlan}
            disabled={buttonStatus === "Active"}
            className={`overflow-hidden rounded-xl px-4 flex gap-0 justify-center items-center relative h-10  ${buttonStatus === "Active" ? "bg-[#e8edf5]" : "bg-[#2194f2]"}`}
          >
            <div className="overflow-hidden flex flex-col gap-0 items-center relative bg-transparent">
              <small className="text-center font-bold leading-[21px] text-sm text-[#f7fafc]">
                {buttonStatus}
              </small>
            </div>
          </button>
          <div className="overflow-hidden rounded-xl px-4 flex gap-0 justify-center items-center relative h-10 bg-[#e8edf5]">
            <div className="overflow-hidden flex flex-col gap-0 items-center relative bg-transparent">
              <small className="text-center font-bold leading-[21px] text-sm text-[#0d141c]">
                Share Plan
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
