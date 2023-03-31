import { CssBaseline, Grid } from "@mui/material";

import { goerli, mainnet } from "wagmi/chains";

import { ConnectKitProvider, getDefaultClient } from "connectkit";

import { createClient, WagmiConfig } from "wagmi";
import MainAppBar from "./components/MainAppBar";
import AssetsUnderManagement from "./components/AssetsUnderManagement";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

    const wagmiClient = createClient(
        getDefaultClient({
            appName: "CoinflakesVaultManagement",
            chains:
                process.env.NODE_ENV === "development"
                    ? [anvil]
                    : [mainnet, goerli],
        })
    );

    const queryClient = new QueryClient();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <WagmiConfig client={wagmiClient}>
                    <ConnectKitProvider theme="auto" mode="light">
                        <CssBaseline />
                        <MainAppBar></MainAppBar>
                        <Grid container mt={"4em"} mb={"18em"}>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={8}>
                                <div>
                                    <h2>Vault Information</h2>
                                    <ul>
                                        <AssetsUnderManagement></AssetsUnderManagement>
                                        <li>Number of Shares</li>
                                        <li>
                                            Vault Share Price (balancer pool)
                                        </li>
                                        <li>Buy Sell (via balancer pool)</li>
                                    </ul>
                                    <h2>Call Options</h2>
                                    <ul>
                                        <li>Option name, symbol, maturity</li>
                                        <li>Option price (balancer pool)</li>
                                        <li>Total shares</li>
                                        <li>Underlying Asset + amount</li>
                                        <li>
                                            option value on revoke (asset amount
                                            per option)
                                        </li>
                                        <li>
                                            option value on exercise, (balancer
                                            pool)
                                        </li>
                                    </ul>
                                </div>
                            </Grid>
                        </Grid>
                    </ConnectKitProvider>
                </WagmiConfig>
            </QueryClientProvider>
        </>
    );
}
