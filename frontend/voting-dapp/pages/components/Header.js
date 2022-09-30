import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  //   const [text, setText] = useState(true);
  //   //   function logClick() {
  //   //     setText(!text);
  //   //     console.log(text);
  //   //   }

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 flex justify-end">
      <h4 className="">Quadratic Voting NFTS</h4>
      <ConnectButton
        accountStatus={{
          smallScreen: "avatar",
          largeScreen: "small",
        }}
      />
    </div>
  );
}
