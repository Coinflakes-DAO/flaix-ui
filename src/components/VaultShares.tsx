import { useVaultAddress } from "../hooks/useVaultAddress";
import { erc20ABI, useAccount, useContractRead } from "wagmi";
import { useVaultMetadata } from "../hooks/useVaultMetadata";
import { numberFormat } from "../lib/formats";
import { useVaultAssetsTotalWorth } from "../hooks/useVaultAssetsTotalWorth";
import { ADDR_DEADBEEF, BN_10E, BN_ZERO } from "../lib/constants";

function VaultShares() {
    const vaultAddress = useVaultAddress();
    const { address: userAddress } = useAccount();
    const { data: userShares } = useContractRead({
        address: userAddress ? vaultAddress : undefined,
        abi: erc20ABI,
        functionName: "balanceOf",
        args: [userAddress || ADDR_DEADBEEF],
    });
    const { data: metadata } = useVaultMetadata();
    const { symbol, decimals } = metadata || {};
    const { data: totalShares } = useContractRead({
        address: vaultAddress,
        abi: erc20ABI,
        functionName: "totalSupply",
    });
    const totalWorth = useVaultAssetsTotalWorth();
    if (!metadata || !totalShares || !userShares) return <></>;
    if (!decimals || !symbol) return <></>;
    const userPercent = userShares.mul(BN_10E(decimals + 2)).div(totalShares);
    const sharePrice = totalWorth.mul(BN_10E(decimals)).div(totalShares);

    return (
        <li>
            Vault Shares
            <ul>
                <li>
                    Total Shares:{" "}
                    {numberFormat(totalShares, symbol, 2, decimals)}
                </li>
                <li>Share FMV: {numberFormat(sharePrice, "USD", 2, 18)}</li>
                {userShares.gt(BN_ZERO) && (
                    <li>
                        Your Shares:{" "}
                        {numberFormat(userShares, symbol, 2, decimals)}
                        {" / "}
                        {numberFormat(userPercent, "%", 2, 2)}
                    </li>
                )}
            </ul>
        </li>
    );
}

export default VaultShares;
