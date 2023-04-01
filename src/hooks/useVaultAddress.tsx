import { getAddress } from "ethers/lib/utils.js";

if (!process.env.REACT_APP_VAULT_ADDRESS)
    throw new Error("REACT_APP_VAULT_ADDRESS is not set");
const vaultAddress = getAddress(
    process.env.REACT_APP_VAULT_ADDRESS
) as `0x${string}`;

export const useVaultAddress = () => {
    return vaultAddress;
};
