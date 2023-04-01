import { useVaultAssets } from "../hooks/useVaultAssets";
import { useVaultAssetMetadata } from "../hooks/useVaultAssetMetadata";
import { useVaultAssetBalance } from "../hooks/useVaultAssetBalance";
import { numberFormat } from "../lib/formats";
import { useVaultAssetPrice } from "../hooks/useVaultAssetPrice";
import { BigNumber } from "ethers";
import { BN_10E, BN_ZERO } from "../lib/constants";

function VaultAsset(props: { assetAddress: `0x${string}` }) {
    const { assetAddress } = props;
    const { data: assetMetadata } = useVaultAssetMetadata({ assetAddress });
    const { data: assetBalance } = useVaultAssetBalance({ assetAddress });
    const { data: assetPrice } = useVaultAssetPrice({ assetAddress });
    const bnAssetPrice =
        assetPrice && assetMetadata
            ? BigNumber.from(Math.floor(assetPrice.priceUsd * 10000))
                  .mul(BN_10E(assetMetadata.decimals))
                  .div(10000)
            : BN_ZERO;
    const bnAssetWorth =
        assetMetadata && assetBalance
            ? bnAssetPrice.mul(assetBalance).div(BN_10E(assetMetadata.decimals))
            : BN_ZERO;
    return (
        <li>
            {assetMetadata?.name}:{" "}
            {numberFormat(
                assetBalance,
                assetMetadata?.symbol,
                2,
                assetMetadata?.decimals
            )}
            {" @ "}
            {numberFormat(bnAssetPrice, "USD", 2, assetMetadata?.decimals)}
            {" = "}
            {numberFormat(bnAssetWorth, "USD", 2, assetMetadata?.decimals)}
        </li>
    );
}

function AssetsUnderManagement() {
    const { data: vaultAssets } = useVaultAssets();
    return (
        <li>
            Assets under Management (sum + details)
            <ul>
                {vaultAssets?.map((assetAddress) => (
                    <VaultAsset assetAddress={assetAddress} />
                ))}
            </ul>
        </li>
    );
}

export default AssetsUnderManagement;
