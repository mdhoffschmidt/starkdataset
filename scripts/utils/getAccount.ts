import { starknet } from "hardhat";
import dotenv from "dotenv";

dotenv.config();

export async function getAccount() {
  if (!process.env.STARKNET_PKEY || !process.env.STARKNET_ADDRESS) {
    throw "STARKNET_PKEY and/or STARKNET_ADDRESS are not set";
  }

  if (!process.env.STARKNET_ACCOUNT_TYPE) {
    throw "STARKNET_ACCOUNT_TYPE not set";
  }

  const myAccount = await starknet.getAccountFromAddress(
    process.env.STARKNET_ADDRESS,
    process.env.STARKNET_PKEY,
    process.env.STARKNET_ACCOUNT_TYPE
  );

  switch (process.env.STARKNET_ACCOUNT_TYPE) {
    case "OpenZeppelin": {
      break;
    }
    case "Argent": {
      break;
    }
    default: {
      throw "STARKNET_ACCOUNT_TYPE not supported";
    }
  }

  return myAccount;
}
