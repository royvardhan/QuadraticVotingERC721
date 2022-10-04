import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

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
        <ConnectButton
          chainStatus="none"
          showBalance={false}
          accountStatus="address"
        />
      </div>
    </div>
  );
}
