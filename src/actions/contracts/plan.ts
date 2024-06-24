"use server";

import type { Address, Hex } from "viem";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { PLAN_ABI } from "@/abis/plan";
import { config } from "./config";
import { sepolia } from "@wagmi/core/chains";

export const activePlan = async (hash: Hex, userId: string, planId: string) => {
  console.log("Waiting Tx... ");

  const receipt = await waitForTransactionReceipt(config, {
    chainId: sepolia.id,
    confirmations: 1,
    hash,
  });

  return receipt;
};

export const mintPlanNFT = async (hash: Hex) => {
  console.log("Waiting Tx... ");

  const receipt = await waitForTransactionReceipt(config, {
    chainId: sepolia.id,
    confirmations: 1,
    hash,
  });

  console.log(receipt);
  if (!receipt.to) throw new Error("No contract address found");
};

export const isStarted = async (wallet: Address, plan: Address) => {
  const startTime = await readContract(config, {
    chainId: sepolia.id,
    address: plan,
    abi: PLAN_ABI,
    functionName: "getPlan",
    args: [wallet],
  });

  return startTime > BigInt(0);
};

export const isMintable = async (wallet: Address, plan: Address) => {
  const startTime = await readContract(config, {
    chainId: sepolia.id,
    address: plan,
    abi: PLAN_ABI,
    functionName: "getPlan",
    args: [wallet],
  });

  const { period } = await getPlanData(plan);
  const expected = startTime + period;

  console.log("Expected: ", expected);
  return expected < BigInt(Math.floor(Date.now() / 1000));
};

export const getPlanData = async (plan: Address) => {
  const contractConfig = { chainId: sepolia.id, address: plan, abi: PLAN_ABI };

  const name = await readContract(config, {
    ...contractConfig,
    functionName: "name",
    args: [],
  });

  const symbol = await readContract(config, {
    ...contractConfig,
    functionName: "symbol",
    args: [],
  });

  const period = await readContract(config, {
    ...contractConfig,
    functionName: "period",
    args: [],
  });

  const totalSupply = await readContract(config, {
    ...contractConfig,
    functionName: "TOTAL_SUPPLY",
    args: [],
  });

  const price = await readContract(config, {
    ...contractConfig,
    functionName: "mintPrice",
    args: [],
  });

  return { totalSupply, name, symbol, period, price };
};
