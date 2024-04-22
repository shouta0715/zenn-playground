import React from "react";
import { Params } from "@/lib/types";

export const dynamic = "force-static";

// export const generateStaticParams = async () => {
//   const { params } = await fetch(PARAMS_URL).then((res) => res.json());

//   return params?.map((param: number) => ({
//     id: param.toString(),
//   }));
// };

export default async function page({ params }: Params<"id">) {
  // const { id } = await fetch(`${PARAMS_URL}/${params.id}`).then((res) =>
  //   res.json()
  // );

  return (
    <div>
      <p>This is a static page with params: {params.id}</p>
      {/* <p>Param: {id}</p> */}
    </div>
  );
}
