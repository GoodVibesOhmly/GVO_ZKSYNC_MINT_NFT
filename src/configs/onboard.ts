import { CURRENT_APP_NAME } from "@/plugins/build";

import {
  AllWalletInitOptions,
  CommonWalletOptions,
  Initialization,
  WalletCheckInit,
  WalletCheckModule,
  WalletInitOptions,
  WalletSelectModuleOptions,
} from "bnc-onboard/dist/src/interfaces";

import { getCurrentNetworkConfig } from "@/plugins/config";

const networkConfig = getCurrentNetworkConfig();

export const ONBOARD_FORCED_EXIT_LINK = `https://withdraw${networkConfig.name === "mainnet" ? ".zksync.io" : "-" + networkConfig.ethNetworkName + ".zksync.dev"}`;
export const ONBOARD_FORTMATIC_KEY = process.env.APP_FORTMATIC;
export const ONBOARD_PORTIS_KEY = process.env.APP_PORTIS;
export const ONBOARD_INFURA_KEY = process.env.APP_WALLET_CONNECT;
export const ONBOARD_RPC_URL = `https://${networkConfig.ethNetworkName}.infura.io/v3/${process.env.APP_WS_API_ETHERSCAN_TOKEN}`;

const ETHER_NETWORK_ID = networkConfig.ethNetworkId;

const wallets: WalletInitOptions[] | CommonWalletOptions[] | AllWalletInitOptions[] = [
  { walletName: "detectedwallet", preferred: true },
  { walletName: "metamask", preferred: true, networkId: ETHER_NETWORK_ID },
  { walletName: "imToken", rpcUrl: ONBOARD_RPC_URL, preferred: true },
  { walletName: "coinbase" },
  {
    walletName: "ledger",
    rpcUrl: ONBOARD_RPC_URL,
    preferred: true,
  },
  {
    walletName: "lattice",
    rpcUrl: ONBOARD_RPC_URL,
    appName: CURRENT_APP_NAME,
  },
  {
    walletName: "fortmatic",
    apiKey: ONBOARD_FORTMATIC_KEY,
    preferred: true,
  },
  {
    walletName: "portis",
    apiKey: ONBOARD_PORTIS_KEY,
    display: { desktop: true, mobile: false },
    label: "Portis",
  },
  { walletName: "authereum" },
  { walletName: "atoken" },
  { walletName: "opera", display: { desktop: true, mobile: false } },
  { walletName: "operaTouch", display: { desktop: false, mobile: true } },
  { walletName: "torus", display: { desktop: true, mobile: false } },
  { walletName: "status" },
  { walletName: "meetone" },
  { walletName: "mykey", rpcUrl: ONBOARD_RPC_URL },
  { walletName: "huobiwallet", rpcUrl: ONBOARD_RPC_URL },
  { walletName: "hyperpay" },
  { walletName: "wallet.io", rpcUrl: ONBOARD_RPC_URL },
  { walletName: "tokenpocket", rpcUrl: ONBOARD_RPC_URL },
  { walletName: "gnosis" },
  { walletName: "xdefi" },
  {
    walletName: "binance",
    preferred: true,
  },
];

const colorTheme: string | null = localStorage.getItem("colorTheme");

const walletChecks = [
  {
    checkName: "accounts",
  },
  {
    checkName: "derivationPath",
  },
  {
    checkName: "connect",
  },
  {
    checkName: "network",
  },
];

const onboardConfig: Initialization = {
  dappId: process.env.APP_ONBOARDING_APP_ID, // [String] The API key created by step one above
  networkId: ETHER_NETWORK_ID, // [Integer] The Ethereum network ID your Dapp uses.
  hideBranding: true,
  blockPollingInterval: 7500,
  darkMode: colorTheme !== null && colorTheme === "dark",
  walletCheck: walletChecks as (WalletCheckModule | WalletCheckInit)[],
  walletSelect: <WalletSelectModuleOptions>{
    wallets,
    description: "",
    explanation: `If you have funds on zkSync on an account that you can't control (a smart contract or an exchange deposit account) it is possible to use the <a href="${ONBOARD_FORCED_EXIT_LINK}" target="_blank">Alternative Withdrawal</a> to move the funds to Layer 1 without interacting with Layer 2.`,
  },
};

export default onboardConfig;
