// src/actions/plans.ts
"use server";

import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createPlan(input: Prisma.PlanCreateInput) {
  const plan = await prisma.plan.create({
    data: {
      ...input,
    },
  });

  return plan;
}

export async function getAllPlans() {
  return await prisma.plan.findMany();
}

// Read a plan by its ID
export async function getPlanById(planId: string) {
  const plan = await prisma.plan.findUnique({
    where: { id: planId },
  });

  if (!plan) {
    console.log("Plan not found");
    return null;
  }

  console.log("Plan fetched", plan);
  return plan;
}

export async function getPlanByContract(contract: `0x${string}`) {
  const plan = await prisma.plan.findFirst({
    where: { contract },
  });

  if (!plan) throw new Error("Plan not found");

  return plan;
}

// Read all plans for a specific user
export async function getPlansByUserId(userId: string) {
  const plans = await prisma.plan.findMany({
    where: { userId },
  });

  return plans;
}

// Update a plan by its ID
export async function updatePlan(
  planId: string,
  data: Partial<{
    period: string;
    contract: string;
    name: string;
    description: string;
  }>
) {
  const plan = await prisma.plan.update({
    where: { id: planId },
    data,
  });

  return plan;
}

// Delete a plan by its ID
export async function deletePlan(planId: string) {
  const plan = await prisma.plan.delete({
    where: { id: planId },
  });

  return plan;
}
