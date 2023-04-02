import { useQuery } from "@tanstack/react-query";
import { apiCall } from "../lib/apiClient";
import { useVaultAddress } from "./useVaultAddress";
import { TIME_MINUTES } from "../lib/constants";
import { BigNumber } from "ethers";

export const fetchVaultAssetPrice = async (
    vaultAddress: `0x${string}`,
    assetAddress: `0x${string}`
) => {
    const result = (await apiCall(
        `/prices/vault/${vaultAddress}/allowed-asset/${assetAddress}`
    )) as {
        balance: string;
        priceUsd: string;
        worthUsd: string;
        decimals: number;
    };
    return {
        balance: BigNumber.from(result.balance),
        priceUsd: BigNumber.from(result.priceUsd),
        worthUsd: BigNumber.from(result.worthUsd),
        decimals: result.decimals,
    };
};
export type UseVaultAssetPriceProps = {
    assetAddress: `0x${string}`;
};

export type UseVaultAssetPriceResult = {
    balance: BigNumber;
    priceUsd: BigNumber;
    worthUsd: BigNumber;
    decimals: number;
};

export const useVaultAssetPrice = (props: UseVaultAssetPriceProps) => {
    const { assetAddress } = props;
    const vaultAddress = useVaultAddress();
    const queryResult = useQuery<UseVaultAssetPriceResult, unknown>({
        queryKey: ["vaultAssetPrice", { vaultAddress, assetAddress }],
        queryFn: async () => fetchVaultAssetPrice(vaultAddress, assetAddress),
        staleTime: 5 * TIME_MINUTES,
        cacheTime: 5 * TIME_MINUTES,
    });
    return queryResult;
};
