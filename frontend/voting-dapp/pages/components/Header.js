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
      <ConnectButton
        accountStatus={{
          smallScreen: "avatar",
          largeScreen: "full",
        }}
      />
    </div>
  );
}
