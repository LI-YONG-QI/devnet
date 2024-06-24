import useSWR from "swr";
import { getAllUserPlanStatus } from "@/actions/contracts/router";
import { Address } from "viem"; // Ensure the Address type is imported
import { useAccount } from "wagmi";

// Utility function to fetch data
const fetcher = async (wallet: Address | undefined) => {
  if (wallet) {
    const plans = await getAllUserPlanStatus(wallet);
    console.log("Fetched plans:", plans); // Log the fetched plans
    return plans.filter((plan) => plan.status === true);
  }
};

const useNFTs = () => {
  // SWR hook to fetch data based on the wallet address
  const { address: wallet } = useAccount();
  const { data, error, isLoading } = useSWR(
    wallet ? `/api/plans/status/${wallet}` : null,
    () => fetcher(wallet)
  );

  return {
    nfts: data,
    isLoading,
    isError: error,
  };
};

export default useNFTs;
