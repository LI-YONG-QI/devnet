import { Address } from "viem";
import useSWR from "swr";
import { isMintable, isStarted } from "@/actions/contracts/plan";

type BtnStatus = "Inactive" | "Active" | "Mintable";

const fetchMintableStatus = async ([wallet, plan]: [
  Address,
  Address,
]): Promise<BtnStatus> => {
  const _isStarted = await isStarted(wallet, plan);
  if (!_isStarted) return "Inactive";
  return (await isMintable(wallet, plan)) ? "Mintable" : "Active";
};

export const usePlanBtnStatus = (user: Address, plan: Address) => {
  const { data: buttonStatus, error } = useSWR(
    user && plan ? [user, plan] : null,
    fetchMintableStatus
  );

  return { buttonStatus, error };
};
