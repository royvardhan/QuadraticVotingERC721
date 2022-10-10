import "../styles/globals.css";
import Header from "../components/Header";
import ProposalCards from "../components/ProposalCards";
import CreateProposal from "../components/CreateProposal";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  midnightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
const { chains, provider } = configureChains(
  [chain.mainnet, chain.goerli, chain.polygon, chain.optimism, chain.arbitrum],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);
import {
  Route,
  Routes as Switch,
  BrowserRouter as Router,
} from "react-router-dom";

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        initialChain={5}
        theme={midnightTheme()}
      >
        <Header />
        <CreateProposal />
        <ProposalCards />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
