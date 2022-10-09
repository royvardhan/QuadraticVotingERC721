import React, { useState } from "react";
import abi from "../utils/abi.json";
import { ethers } from "ethers";
import {
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
