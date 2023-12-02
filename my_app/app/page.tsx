"use client";
import { AnchorProvider, Program, web3 } from "@coral-xyz/anchor";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import Image from "next/image";
import { useState } from "react";
import idl from "./idl.json";

export default function Home() {
  const [walletKey, setwalletKey] = useState<any>(null);
  const [posts, setposts] = useState<any[]>([]);

  const connectWallet = async () => {
    const { solana } = window as any;
    setwalletKey((await solana.connect()).publicKey);
  };
  const initialize = async () => {
    const { solana } = window as any;
    const CONNECTIOn = new Connection(clusterApiUrl("devnet"));
    const ANCHOR_PROVIDER = new AnchorProvider(CONNECTIOn, solana, {
      commitment: "processed",
    });
    const PROGRAM = new Program(
      JSON.parse(JSON.stringify(idl)),
      new PublicKey("As1Qtyj6fMX3u5f9FAMXvkfYeGSiMHMQf4HsQXvjCVDT"),
      ANCHOR_PROVIDER
    );
    const keyPair = web3.Keypair.generate();
    const tx = await PROGRAM.methods
      .initialize("Hellor", " WOrrld")
      .accounts({
        post: keyPair.publicKey,
        user: ANCHOR_PROVIDER.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([keyPair])
      .rpc();
  };

  const refresh = async () => {
    const { solana } = window as any;
    const CONNECTIOn = new Connection(clusterApiUrl("devnet"));
    const ANCHOR_PROVIDER = new AnchorProvider(CONNECTIOn, solana, {
      commitment: "processed",
    });
    const PROGRAM = new Program(
      JSON.parse(JSON.stringify(idl)),
      new PublicKey("As1Qtyj6fMX3u5f9FAMXvkfYeGSiMHMQf4HsQXvjCVDT"),
      ANCHOR_PROVIDER
    );
    const data = await PROGRAM.account.post.all();
    setposts(data);
  };

  return (
    <main className="">
      <div className="w-full flex items-center gap-10">
        <button
          onClick={() => {
            connectWallet();
          }}
        >
          {walletKey ? walletKey.toString() : "Connect Wallet"}
        </button>

        <button
          onClick={() => {
            initialize();
          }}
        >
          Initialize
        </button>

        <button
          onClick={() => {
            refresh();
          }}
        >
          Refresh
        </button>
      </div>
      <div className="flex flex-col gap-4 p-10">
        {posts.map((e: any, count: any) => {
          return (
            <div
              key={count}
              className="p-4 shadow-sm cursor-pointer hover:bg-slate-950 shadow-orange-400 bg-slate-900 rounded"
            >
              <p>Title: {e.account.title}</p>
              <p>Content: {e.account.content}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
