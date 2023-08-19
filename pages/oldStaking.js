import React from "react";
// import {getSession} from 'next-auth/react'
import Head from "next/head";
import OldStaking from "../Component/OldStaking";

const ewallet = () => {
  return (
    <div>
      <Head>
        <title>Get Started</title>
      </Head>
<OldStaking/>

    </div>
  );
};
export default ewallet;

// export async function getServerSideProps(context) {
//   const session = await getSession(context)
//   if (session) {
//     return {
//       redirect: {
//         destination: "/dashboard",
//         permanent: false,
//       }
//     }
//   }
//   return {
//     props:{
//       session
//     }
//   }
// }
