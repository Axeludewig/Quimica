import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
    <Head>
      <title>eCommerce</title>
     
    </Head>

    <main className='mx-auto my-12 max-w-3xl'>
      <div className='flex justify-between'> 
        <h2 className='text-2xl font-semibold'>Mi lista de compras</h2>
        <button type='button' className='bg-purple-400 text-white text-sm p-2 rounded-xl transition hover:bg-purple-800'>Add shopping item</button>
      </div>
    </main>
      
    </>
  );
};

export default Home;

