import React, { useState } from "react";
import abi from "../utils/abi.json";
import { ethers } from "ethers";
import {
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { useContractInfiniteReads, paginatedIndexesConfig } from "wagmi";

export default function ProposalCards() {
  const [proposalCount, setProposalCount] = useState(0);
  const [allProposals, addProposal] = useState([]);

  const { data: totalProposals } = useContractRead({
    addressOrName: "0xA72E82bc0D5E68ae218917F66f07D33fc47C198D",
    contractInterface: abi,
    functionName: "proposalCount",
    watch: true,
  });

  React.useEffect(() => {
    setProposalCount(parseInt(totalProposals));
  }, [totalProposals]);

  // const { data: Proposal } = useContractRead({
  //   addressOrName: "0xA72E82bc0D5E68ae218917F66f07D33fc47C198D",
  //   contractInterface: abi,
  //   functionName: "ProposalIdToProposal",
  //   args: [0],
  // });

  const { data: proposalsData, fetchNextPage } = useContractInfiniteReads({
    cacheKey: "proposals",
    ...paginatedIndexesConfig(
      (index) => ({
        addressOrName: "0xA72E82bc0D5E68ae218917F66f07D33fc47C198D",
        contractInterface: abi,
        functionName: "ProposalIdToProposal",
        args: [index],
      }),
      { start: 0, perPage: 10, direction: "increment" }
    ),
  });
  console.log(proposalsData);

  function ListProposals() {
    let count = -1;
    for (let i = 0; i < proposalCount; i++) {
      return proposalsData.pages[0].map((proposal) => {
        if (proposal[5] > 1633704331) {
          count++;
          return (
            <div className="flex justify-center ">
              <div className="mt-10 w-auto p-5 backdrop-opacity-20 backdrop-invert bg-white/50 max-w-xl rounded-3xl">
                <p className=" font-semibold">NFT Address: {proposal[0]}</p>
                <p>Creator: {proposal[1]}</p>
                <p>Proposal ID: {count}</p>
                <p className="">
                  Description:
                  {String.fromCharCode(...arrayify(proposal[2]))}
                </p>
                <p>Expiration Time: {dateify(proposal[5])}</p>
                <p>Yes Votes: {Number(proposal[3])}</p>
                <p>No Votes: {Number(proposal[4])}</p>
                <p>Status: {returnTrueFalse(proposal[5])}</p>
              </div>
            </div>
          );
        }
      });
    }
  }
  function returnTrueFalse(num) {
    const currentTimestamp = Math.round(new Date().getTime() / 1000);
    if (num < currentTimestamp) {
      return "Ended";
    } else return "In-Progress";
  }
  function arrayify(bytes) {
    const arrayifiedVal = ethers.utils.arrayify(bytes);
    return arrayifiedVal;
  }

  function dateify(unixTimestamp) {
    const milliseconds = unixTimestamp * 1000;

    const dateObject = new Date(milliseconds);

    const humanDateFormat = dateObject.toLocaleString();
    return humanDateFormat;
  }

  return <div>{proposalsData && <ListProposals />}</div>;
}

// for decoding bytes into strings  = ethers.utils.defaultAbiCoder.decode(["string"], cid)
