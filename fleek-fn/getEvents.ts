import { createPublicClient, getContract, http, decodeEventLog } from "viem";
import { ROUTER_ABI } from "../src/abis/router";
import { ROUTER_ADDR } from "../src/utils/constants";
import { sepolia } from "viem/chains";

const client = createPublicClient({
  chain: sepolia,
  transport: http(),
});

const router = getContract({
  address: ROUTER_ADDR,
  abi: ROUTER_ABI,
  client: client,
});

export const main = async (
  params: Fleek.HttpRequest
): Promise<Fleek.HttpResponse> => {
  const deployContractBlock = BigInt(6155307);

  const createLogs = await router.getEvents.Created(
    {},
    { fromBlock: deployContractBlock, toBlock: "latest" }
  );

  const mintLogs = await router.getEvents.Mint(
    {},
    { fromBlock: deployContractBlock, toBlock: "latest" }
  );

  const createEvents = createLogs.map((log) => {
    const event = decodeEventLog({
      abi: ROUTER_ABI,
      ...log,
    });

    return {
      ...event,
      args: { ...event.args, createAt: event.args.createAt.toString() },
    };
  });

  const mintEvents = mintLogs.map((log) => {
    let event = decodeEventLog({
      abi: ROUTER_ABI,
      ...log,
    });

    return {
      ...event,
      args: { ...event.args, time: event.args.time.toString() },
    };
  });

  const events = [...createEvents, ...mintEvents];

  return {
    code: 200,
    body: events,
    headers: {
      "Content-Type": "application/json",
    },
  };
};
