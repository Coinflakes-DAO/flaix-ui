import { useQueries } from "@tanstack/react-query";
import { useVaultAddress } from "./useVaultAddress";
import { useVaultAssets } from "./useVaultAssets";
import { fetchVaultAssetPrice } from "./useVaultAssetPrice";
import { BN_10E, BN_ZERO, TIME_MINUTES } from "../lib/constants";

export const useVaultAssetsTotalWorth = () => {
    const vaultAddress = useVaultAddress();
    const { data: assets } = useVaultAssets();
    const result = useQueries({
        queries: (assets || [])?.map((assetAddress) => ({
            queryKey: ["vaultAssetPrice", { vaultAddress, assetAddress }],
            queryFn: async () =>
                fetchVaultAssetPrice(vaultAddress, assetAddress),
            staleTime: 5 * TIME_MINUTES,
            cacheTime: 5 * TIME_MINUTES,
        })),
    });
    const worthUsd = result.reduce((acc, { data }) => {
        if (!data) return acc;
        return acc.add(
            data.worthUsd.mul(BN_10E(18)).div(BN_10E(data.decimals))
        );
    }, BN_ZERO);
    return worthUsd;
};
