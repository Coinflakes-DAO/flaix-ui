import { useQuery } from "@tanstack/react-query";
import { apiCall } from "../lib/apiClient";
import { useVaultAddress } from "./useVaultAddress";

export const fetchVaultAssetPrice = async (
    vaultAddress: `0x${string}`,
    assetAddress: `0x${string}`
) =>
    apiCall(
        `/prices/vault/${vaultAddress}/allowed-asset/${assetAddress}`
    ) as Promise<{
        priceUsd: number;
    }>;

export type UseVaultAssetPriceProps = {
    assetAddress: `0x${string}`;
};

export const useVaultAssetPrice = (props: UseVaultAssetPriceProps) => {
    const { assetAddress } = props;
    const vaultAddress = useVaultAddress();
    const queryResult = useQuery<{ priceUsd: number }, unknown>({
        queryKey: ["vaultAssetPrice", { vaultAddress, assetAddress }],
        queryFn: async () => fetchVaultAssetPrice(vaultAddress, assetAddress),
    });
    return queryResult;
};
