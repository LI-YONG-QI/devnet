"use client";
import React from "react";
import useEvents from "@/hooks/contracts/useEvents";

const Page = () => {
  const { mintEvents, createEvents, isLoading } = useEvents();

  return (
    <div>
      <section className="mb-20">
        <p className="capitalize text-2xl font-bold mb-4">mint recently</p>
        {!isLoading &&
          mintEvents?.map((event, index) => {
            return (
              <div key={index}>
                <p>{event.args.plan}</p>
              </div>
            );
          })}
      </section>

      <section>
        <p className="capitalize text-2xl font-bold mb-4">create recently</p>
        {!isLoading &&
          createEvents?.map((event, index) => {
            return (
              <div key={index}>
                <p>{event.args.plan}</p>
              </div>
            );
          })}
      </section>
    </div>
  );
};

export default Page;
