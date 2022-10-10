import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";

export default function Header() {
  //   const [text, setText] = useState(true);
  //   //   function logClick() {
  //   //     setText(!text);
  //   //     console.log(text);
  //   //   }

  return (
    <div>
      <div className=" bg-gradient-to-r from-cyan-500 to-blue-500 p-3 flex justify-between">
        <h4 className="p-0.5 text-xl font-bold font-Josefin text-white">
          Quadratic Voting NFTS
        </h4>
        <div className="flex flex-row">
          <button className="mr-5 rounded-xl font-semibold font-Josefin text-white bg-black px-3 py-1  ">
            Create Proposal
          </button>

          <ConnectButton
            chainStatus="none"
            showBalance={false}
            accountStatus="address"
          />
        </div>
      </div>
    </div>
  );
}
