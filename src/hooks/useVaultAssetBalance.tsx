import { erc20ABI, useContractRead } from "wagmi";
import { useVaultAddress } from "./useVaultAddress";

export type UseVaultAssetBalanceProps = {
    assetAddress: `0x${string}`;
    watch?: boolean;
};

export function useVaultAssetBalance(props: UseVaultAssetBalanceProps) {
    const vaultAddress = useVaultAddress();
    const result = useContractRead({
        address: props.assetAddress,
        abi: erc20ABI,
        functionName: "balanceOf",
        args: [vaultAddress],
        watch: !!!props.watch,
    });
    return result;
}
