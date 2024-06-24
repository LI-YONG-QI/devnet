import { getAllPlans } from "@/actions/db/plans";
import React from "react";
import Plan from "./plan";

export const generateStaticParams = async () => {
  const plans = await getAllPlans();
  const ids = plans.map((plan: { id: string }) => ({
    id: plan.id,
  }));
  console.log(ids);
  return ids;
};

const Page = async ({ params }: { params: { id: string } }) => {
  return <Plan id={params.id} />;
};

export default Page;
