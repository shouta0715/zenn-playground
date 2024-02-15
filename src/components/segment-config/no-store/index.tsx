import { SSR_URL } from "@/lib/constant";

export async function NoStore() {
  const { now } = await fetch(SSR_URL, {
    cache: "no-store",
  }).then((res) => res.json());

  return (
    <div>
      <h1>No Store</h1>
      <p>{now}</p>
    </div>
  );
}
