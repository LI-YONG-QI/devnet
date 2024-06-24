import { useEffect } from "react";
import useSWR from "swr";

type Event = {
  eventName: string;
  args: any;
};

// Utility function to fetch data
const fetcher = async () => {
  const res = await fetch(
    "https://many-continent-harsh.functions.on-fleek.app",
    { method: "GET" }
  );

  const { body: events } = await res.json();
  return events as Event[];
};

const useEvents = () => {
  // SWR hook to fetch data based on the wallet address
  const { data, error, isLoading } = useSWR("events", () => fetcher());

  const mintEvents = data?.filter((event) => event.eventName === "Mint");
  const createEvents = data?.filter((event) => event.eventName === "Created");

  return {
    mintEvents,
    createEvents,
    isLoading,
    isError: error,
  };
};

export default useEvents;
