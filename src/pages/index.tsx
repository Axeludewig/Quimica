import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import PreviousMap from "postcss/lib/previous-map";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import { AppRouter } from "../server/trpc/router/_app";
import { inferProcedureInput } from '@trpc/server';
import { Fragment } from 'react';

const Home: NextPage = () => {
  // const [ items, setItems ] = useState<items[]>([])
  const mutation = trpc.item.addItem.useMutation();
  
  return (
    <>
    <Head>
      <title>eCommerce</title>
     
    </Head>

    <main className='mx-auto my-12 max-w-3xl'>
      <div className='flex justify-between'> 
        <h2 className='text-2xl font-semibold'>Mi lista de compras</h2>
        
      <div className='flex-row'>
      <h3>Agregar un item</h3>
      <form
        onSubmit={async (e) => {
          /**
           * In a real app you probably don't want to use this manually
           * Checkout React Hook Form - it works great with tRPC
           * @see https://react-hook-form.com/
           * @see https://kitchen-sink.trpc.io/react-hook-form
           */
          e.preventDefault();
          const $form = e.currentTarget;
          const values = Object.fromEntries(new FormData($form));
          type Input = inferProcedureInput<AppRouter['item']['addItem']>;
          //    ^?
          const input: Input = {
            name: values.name as string,
          };
          try {
            await mutation.mutateAsync(input);

            $form.reset();
          } catch (cause) {
            console.error({ cause }, 'Failed to add item');
          }
        }}
      >
        <label htmlFor="name">Item name:</label>
        <br />
        <input
          className="border-4 rounded-3xl"
          id="name"
          name="name"
          type="text"
          disabled={mutation.isLoading}
        />
    
        <input type="submit" disabled={mutation.isLoading} className='bg-purple-400 text-white text-sm p-2 rounded-3xl transition hover:bg-purple-800'/>
        {mutation.error && (
          <p style={{ color: 'red' }}>{mutation.error.message}</p>
        )}
      </form>
      </div>
      </div>

    </main>     
    </>
  );
};

export default Home;

