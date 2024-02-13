import { BASE_URL } from "@/lib/constant";

export async function CacheFetch() {
  const data = await fetch(BASE_URL, {
    cache: "force-cache",
  }).then((res) => res.text());

  return (
    <div>
      <h1>Cache Fetch</h1>
      <p>Open the console to see the result</p>
      <p>{data}</p>
    </div>
  );
}
