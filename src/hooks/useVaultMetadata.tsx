import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useVaultAddress } from "./useVaultAddress";
import { apiCall } from "../lib/apiClient";

type FetchVaultReturnType = {
    address: `0x${string}`;
    admin: `0x${string}`;
    name: string;
    symbol: string;
    decimals: number;
    minimalOptionsMaturity: number;
};
const fetchVault = async (address: string): Promise<FetchVaultReturnType> =>
    apiCall("/vault/" + address);

export type VaultMetadata = {
    address: `0x${string}`;
    admin: `0x${string}`;
    name: string;
    symbol: string;
    decimals: number;
    minimalOptionsMaturity: number;
};

export const useVaultMetadata = () => {
    const address = useVaultAddress();

    const result = useQuery({
        queryKey: ["vaultMetadata", { address }],
        queryFn: async () => fetchVault(address),
        staleTime: 12 * 60 * 60 * 1000,
        cacheTime: 12 * 60 * 60 * 1000,
    });

    return result as UseQueryResult<VaultMetadata, unknown>;
};
