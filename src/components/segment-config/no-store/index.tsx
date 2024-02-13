import { BASE_URL } from "@/lib/constant";

export async function NoStore() {
  const data = await fetch(BASE_URL, {
    cache: "no-store",
  }).then((res) => res.text());

  return (
    <div>
      <h1>No Store</h1>
      <p>Open the console to see the result</p>
      <p>{data}</p>
    </div>
  );
}
