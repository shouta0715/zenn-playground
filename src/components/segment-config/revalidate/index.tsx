import { BASE_URL } from "@/lib/constant";

export async function Revalidate() {
  const data = await fetch(BASE_URL, {
    next: {
      revalidate: 0,
    },
  }).then((res) => res.text());

  return (
    <div>
      <h1>Revalidate</h1>
      <p>Open the console to see the result</p>
      <p>{data}</p>
    </div>
  );
}
