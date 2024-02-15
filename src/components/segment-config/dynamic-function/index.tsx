import { headers } from "next/headers";
import React from "react";
import { DYNAMIC_FUNCTION_URL } from "@/lib/constant";

export default async function DynamicFunction() {
  const header = headers();

  const { now } = await fetch(DYNAMIC_FUNCTION_URL).then((res) => res.json());

  return (
    <div>
      <h1>Dynamic Function</h1>
      <h2>Data: {now}</h2>
      <h2>Header: {JSON.stringify(header)}</h2>
    </div>
  );
}
