import useSWR from "swr";
import { Address } from "viem";
import { getPlanData } from "@/actions/contracts/plan";

// Define the function to fetch plan data
const fetchPlanData = async (address: Address) => {
  return await getPlanData(address);
};

interface PlanData {
  totalSupply: bigint;
  name: string;
  symbol: string;
  period: bigint;
  price: bigint;
}

// Custom hook to use Plan Data
const usePlanData = (planAddress: Address) => {
  const { data, error, isValidating } = useSWR<PlanData>(
    planAddress ? `planData-${planAddress}` : null,
    () => fetchPlanData(planAddress)
  );

  return {
    planData: data,
    isLoading: !data && !error,
    error,
    isValidating,
  };
};

export default usePlanData;
