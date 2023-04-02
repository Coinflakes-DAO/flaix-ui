import { useVaultAssets } from "../hooks/useVaultAssets";
import { useVaultAssetMetadata } from "../hooks/useVaultAssetMetadata";
import { numberFormat } from "../lib/formats";
import { useVaultAssetPrice } from "../hooks/useVaultAssetPrice";
import { useVaultAssetsTotalWorth } from "../hooks/useVaultAssetsTotalWorth";

function VaultAsset(props: { assetAddress: `0x${string}` }) {
    const { assetAddress } = props;
    const { data: assetMetadata } = useVaultAssetMetadata({ assetAddress });
    const { data: assetTokenomics } = useVaultAssetPrice({ assetAddress });

    return (
        <li>
            {assetMetadata?.name}:{" "}
            {numberFormat(
                assetTokenomics?.balance,
                assetMetadata?.symbol,
                2,
                assetTokenomics?.decimals
            )}
            {" @ "}
            {numberFormat(
                assetTokenomics?.priceUsd,
                "USD",
                2,
                assetTokenomics?.decimals
            )}
            {" = "}
            {numberFormat(
                assetTokenomics?.worthUsd,
                "USD",
                2,
                assetTokenomics?.decimals
            )}
        </li>
    );
}

function AssetsUnderManagement() {
    const { data: vaultAssets } = useVaultAssets();
    const vaultAssetsWorth = useVaultAssetsTotalWorth();

    return (
        <li>
            Assets under Management (sum + details)
            <ul>
                {vaultAssets?.map((assetAddress) => (
                    <VaultAsset assetAddress={assetAddress} />
                ))}
                <li>Total: {numberFormat(vaultAssetsWorth, "USD", 2, 18)}</li>
            </ul>
        </li>
    );
}

export default AssetsUnderManagement;
