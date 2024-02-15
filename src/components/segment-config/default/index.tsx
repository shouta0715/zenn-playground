import React from "react";
import { DEFAULT_URL } from "@/lib/constant";

export default async function DefaultCache() {
  const { now } = await fetch(DEFAULT_URL).then((res) => res.json());

  return (
    <div>
      <h1>Default Cache</h1>
      <p>{now}</p>
    </div>
  );
}
