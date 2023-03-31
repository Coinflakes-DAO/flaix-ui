import { apiCall } from "./apiClient";

export type FetchVaultReturnType = {
    address: string;
    admin: string;
    name: string;
    symbol: string;
    decimals: number;
    minimalOptionsMaturity: number;
};

export const fetchVault = async (
    address: string
): Promise<FetchVaultReturnType> => apiCall("/vault/" + address);

export type Erc20Token = {
    name: string;
    symbol: string;
    decimals: number;
    address: string;
};

export type FetchVaultsAssetsReturnType = Erc20Token & {
    coingeckoId: string;
    priceUsd: number;
};

export const fetchVaultAssets = async (
    vaultAddress: string
): Promise<FetchVaultsAssetsReturnType[]> => {
    const assetAddresses = (await apiCall(
        "/vault/" + vaultAddress + "/allowed-assets"
    )) as string[];
    const assets = await Promise.all(
        assetAddresses.map(async (assetAddress) => {
            const asset = (await apiCall(
                "/vault/" + vaultAddress + "/allowed-asset/" + assetAddress
            )) as Erc20Token & { coingeckoId: string };
            const priceUsd = (await apiCall(
                "/prices/vault/" +
                    vaultAddress +
                    "/allowed-asset/" +
                    assetAddress
            )) as { priceUsd: number };
            return {
                ...asset,
                ...priceUsd,
            };
        })
    );
    return assets;
};
