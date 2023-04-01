import { useQuery } from "@tanstack/react-query";
import { useVaultAddress } from "./useVaultAddress";
import { apiCall } from "../lib/apiClient";
const fetchVaultAssets = async (
    address: `0x${string}`
): Promise<`0x${string}`[]> => apiCall(`vault/${address}/allowed-assets`);

export const useVaultAssets = () => {
    const vaultAddress = useVaultAddress();
    const queryResult = useQuery<`0x${string}`[], unknown>({
        queryKey: ["vaultAssets", { vaultAddress }],
        queryFn: async () => fetchVaultAssets(vaultAddress),
    });
    return queryResult;
};
