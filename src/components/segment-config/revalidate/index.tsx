import { ISR_URL } from "@/lib/constant";

export async function Revalidate() {
  const { now } = await fetch(ISR_URL, {
    next: {
      revalidate: 10,
    },
  }).then((res) => res.json());

  return (
    <div>
      <h1>Revalidate</h1>

      <p>{now}</p>
    </div>
  );
}
