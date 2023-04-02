import { useQuery } from "@tanstack/react-query";
import { useVaultAddress } from "./useVaultAddress";
import { TIME_12_HOURS } from "../lib/constants";
import { apiCall } from "../lib/apiClient";

export type VaultAssetMetadata = {
    address: `0x${string}`;
    name: string;
    symbol: string;
    decimals: number;
};

export const fetchVaultAssetMetadata = async (
    vaultAddress: string,
    assetAddress: string
) =>
    apiCall(
        `vault/${vaultAddress}/allowed-asset/${assetAddress}`
    ) as Promise<VaultAssetMetadata>;

export type UseVaultAssetMetadataProps = {
    assetAddress: `0x${string}`;
};

export const useVaultAssetMetadata = (props: UseVaultAssetMetadataProps) => {
    const { assetAddress } = props;
    const vaultAddress = useVaultAddress();
    const queryResult = useQuery<VaultAssetMetadata, unknown>({
        queryKey: ["vaultAssetMetadata", { vaultAddress, assetAddress }],
        queryFn: async () =>
            fetchVaultAssetMetadata(vaultAddress, assetAddress),
        staleTime: TIME_12_HOURS,
        cacheTime: TIME_12_HOURS,
    });
    return queryResult;
};
