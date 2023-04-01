import { BigNumber } from "ethers";

export const TIME_12_HOURS = 12 * 60 * 60 * 1000;

export const BN_ZERO = BigNumber.from(0);
export const BN_ONE = BigNumber.from(1);

export const BN_10E = (exp: number): BigNumber => BigNumber.from(10).pow(exp);
