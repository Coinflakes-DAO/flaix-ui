import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchVault, fetchVaultAssets } from "../fetchers/fetchVault";
import { erc20ABI, useContractRead, useContractReads } from "wagmi";
import { BigNumber } from "ethers";

export type Vault = {
    address: string;
    admin: string;
    name: string;
    symbol: string;
    decimals: number;
};

export type VaultAsset = {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    priceUsd: number;
    balance: BigNumber;
};

export type UseVaultReturnType = {
    vault?: Vault;
    admin?: string;
    assets?: VaultAsset[];
};

export const useVault = (): UseVaultReturnType => {
    const [address] = useState<string>(
        process.env.REACT_APP_VAULT_ADDRESS || ""
    );

    const { data: fetchVaultResult } = useQuery({
        queryKey: ["vault", { address }],
        queryFn: async () => fetchVault(address),
    });

    const { data: fetchVaultAssetsResult } = useQuery({
        queryKey: ["vaultAssets", { address }],
        queryFn: async () => fetchVaultAssets(address),
    });

    let readContractConfigs = fetchVaultAssetsResult?.map((asset) => ({
        address: asset.address as `0x${string}`,
        functionName: "balanceOf",
        abi: erc20ABI,
        args: [address],
    }));

    const { data: vaultAssetsBalances } = useContractReads({
        contracts: readContractConfigs,
        allowFailure: false,
    }) as { data: BigNumber[]; error: any };

    const assets = fetchVaultAssetsResult?.map((asset, index) => ({
        ...asset,
        balance: vaultAssetsBalances?.[index],
    }));

    console.log(fetchVaultResult, assets);

    return { vault: fetchVaultResult, admin: fetchVaultResult?.admin, assets };
};
