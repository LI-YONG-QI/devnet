import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

const client = createPublicClient({
  chain: sepolia,
  transport: http(),
});

export const main = async (
  params: Fleek.HttpRequest
): Promise<Fleek.HttpResponse> => {
  const block = await client.getBlockNumber();

  return {
    code: 200,
    body: block,
    headers: {
      "Content-Type": "application/json",
    },
  };
};
