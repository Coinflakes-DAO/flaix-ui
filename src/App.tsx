import { CssBaseline } from "@mui/material";

import { goerli, mainnet } from "wagmi/chains";

import { ConnectKitProvider, getDefaultClient } from "connectkit";

import { createClient, WagmiConfig } from "wagmi";
import MainAppBar from "./components/MainAppBar";

export default function Home() {
    const anvil = Object.assign(
        {},
        { ...mainnet },
        {
            id: 1337,
            name: "Localhost",
            network: "anvil",
            rpcUrls: {
                default: { http: ["http://localhost:8545"] },
            },
        }
    );

    const client = createClient(
        getDefaultClient({
            appName: "CoinflakesVaultManagement",
            chains:
                process.env.NODE_ENV === "development"
                    ? [anvil]
                    : [mainnet, goerli],
        })
    );

    return (
        <>
            <WagmiConfig client={client}>
                <ConnectKitProvider theme="auto" mode="light">
                    <CssBaseline />
                    <MainAppBar></MainAppBar>
                </ConnectKitProvider>
            </WagmiConfig>
        </>
    );
}
