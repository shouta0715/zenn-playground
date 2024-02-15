import { SSG_URL } from "@/lib/constant";

export async function CacheFetch() {
  const { now } = await fetch(SSG_URL, {
    cache: "force-cache",
  }).then((res) => res.json());

  return (
    <div>
      <h1>Cache Fetch</h1>
      <p>{now}</p>
    </div>
  );
}
