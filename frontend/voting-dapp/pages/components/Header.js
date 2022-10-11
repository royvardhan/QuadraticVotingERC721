import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { use } from "chai";
import CreateProposal from "./CreateProposal";
import Vote from "./Vote";

export default function Header() {
  //   const [text, setText] = useState(true);
  //   //   function logClick() {
  //   //     setText(!text);
  //   //     console.log(text);
  //   //   }

  const [voteComp, setVoteComp] = useState(false);
  function toggleVoteComp() {
    setVoteComp(!voteComp);
  }

  return (
    <div>
      <div className=" bg-gradient-to-r from-cyan-500 to-blue-500 p-3 flex justify-between">
        <h4 className="p-0.5 text-xl font-bold font-Josefin text-white">
          Quadratic Voting NFTS
        </h4>
        <div className="flex flex-row">
          <button
            onClick={toggleVoteComp}
            className="mr-5 rounded-xl font-semibold font-Josefin text-white bg-black px-3 py-1  "
          >
            {voteComp ? "Create Proposal" : "Vote"}
          </button>

          <ConnectButton
            chainStatus="none"
            showBalance={false}
            accountStatus="address"
          />
        </div>
      </div>
      {/* {!voteComp && <CreateProposal />} */}
      <Vote />
    </div>
  );
}
