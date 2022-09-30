import React, { useState } from "react";

export default function ProposalCards() {
  return (
    <div className="flex justify-center">
      <div className="mt-10 p-5 backdrop-opacity-20 backdrop-invert bg-white/50 ">
        <p className="text-lg">
          NFT Address: 0xdEE878E02c069c4c5AD37299f51E9C3Cd6c8CD4b
        </p>
        <p>Proposal ID: 578</p>
        <p className="">
          Description: Use funds from Community Wallet to buy BAYC NFTs from
          Opensea and hold them till 2030
        </p>
      </div>
    </div>
  );
}
