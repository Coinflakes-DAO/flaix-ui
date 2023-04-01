export {};
/*import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchVault, fetchVaultAssets } from "../fetchers/fetchVault";
import { erc20ABI, useContractReads } from "wagmi";
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
    worthUsd: number;
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

    const assetWorth;

    const assets = fetchVaultAssetsResult?.map((asset, index) => ({
        ...asset,
        balance: vaultAssetsBalances?.[index],
        worthUsd: assetWorthUsd({
            ...asset,
            balance: vaultAssetsBalances?.[index],
            worthUsd: 0,
        }),
    }));

    //console.log(fetchVaultResult, assets);
    console.log(assets);

    return { vault: fetchVaultResult, admin: fetchVaultResult?.admin, assets };
};

function assetWorthUsd(asset: VaultAsset): number {
    const assetDecimals = BigNumber.from(10).pow(asset.decimals);
    const assetPriceBN = BigNumber.from(Math.floor(asset.priceUsd * 10000))
        .mul(assetDecimals)
        .div(10000);
    const assetWorthBN = assetPriceBN
        .mul(asset.balance)
        .div(BigNumber.from(10).pow(asset.decimals));
    const leftStr = assetWorthBN.div(assetDecimals).toString();
    let rightStr = assetWorthBN.mod(assetDecimals).toString();
    if (rightStr.length < asset.decimals) {
        rightStr = rightStr.padStart(asset.decimals - rightStr.length, "0");
    }
    return Number.parseFloat(`${leftStr}.${rightStr}`);
}
*/
