"use server";

import { Address, decodeEventLog, type Hex, type Log } from "viem";
import { waitForTransactionReceipt, readContract } from "@wagmi/core";
import { sepolia } from "@wagmi/core/chains";
import { createPlan } from "../db/plans";
import { ROUTER_ABI } from "@/abis/router";
import { ROUTER_ADDR } from "@/utils/constants";
import { Prisma } from "@prisma/client";
import { config } from "./config";

const parseCreatePlansLogs = (log: Log) => {
  const event = decodeEventLog({
    abi: ROUTER_ABI,
    ...log,
  });

  if (event.eventName === "Created") return event.args.plan;
  throw new Error("No PlanCreated event found");
};

export const getUsePlans = async (user: Address) => {
  const plans = await readContract(config, {
    chainId: sepolia.id,
    address: ROUTER_ADDR,
    abi: ROUTER_ABI,
    functionName: "getUserPlans",
    args: [user],
  });

  return plans;
};

export const getCreatorPlans = async (creator: Address) => {
  const plans = await readContract(config, {
    chainId: sepolia.id,
    address: ROUTER_ADDR,
    abi: ROUTER_ABI,
    functionName: "getCreatorPlans",
    args: [creator],
  });

  return plans;
};

export const routerCreatePlan = async (
  hash: Hex,
  input: Omit<Prisma.PlanCreateInput, "contract">
) => {
  console.log("Waiting Tx... ");

  const receipt = await waitForTransactionReceipt(config, {
    chainId: sepolia.id,
    confirmations: 1,
    hash,
  });

  const createdPlan = parseCreatePlansLogs(receipt.logs[1]);
  if (!receipt.to) throw new Error("No contract address found");

  await createPlan({ ...input, contract: createdPlan });
};

export const getAllUserPlanStatus = async (user: Address) => {
  const plans = await getUsePlans(user);

  const result: { plan: Address; status: boolean }[] = [];

  await Promise.all(
    plans.map(async (plan) => {
      const status = await readContract(config, {
        chainId: sepolia.id,
        address: ROUTER_ADDR,
        abi: ROUTER_ABI,
        functionName: "getUserPlanStatus",
        args: [user, plan],
      });
      result.push({ plan, status });
    })
  );

  return result;
};
