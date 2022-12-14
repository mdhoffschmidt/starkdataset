import { starknet } from "hardhat";
import dotenv from "dotenv";
import { getAccount } from "./utils/getAccount";


dotenv.config();


async function main() {
  
    const myAccount = await starknet.getAccountFromAddress(
        process.env.STARKNET_ADDRESS,
        process.env.STARKNET_PKEY,
        process.env.STARKNET_ACCOUNT_TYPE
    );

    if (process.env.PROJECT_NAME == null) {
        console.log("PROJECT_NAME is not set");
        process.exit(1);
    }

    if (process.env.PROJECT_SYMBOL == null) {
        console.log("PROJECT_SYMBOL is not set");
        process.exit(1);
    }

    // The constructor for ERC721_Full takes a name, symbol, owner,
    // default_royalty_receiver and default_royalty_fee_basis points.
    // In this example, we set royalties to 5%.
    const name = starknet.shortStringToBigInt(process.env.PROJECT_NAME);
    const symbol = starknet.shortStringToBigInt(process.env.PROJECT_SYMBOL);
    const owner = myAccount.address;

    // The contract factory is the name of the cairo file your NFT without the .cairo
    const nftFactory = await starknet.getContractFactory("artifacts/TokenDataset");
    console.log("Deploying NFT...");
    const nftContract = await nftFactory.deploy({
        name,
        symbol,
        owner,
    });

    console.log(`Deployed NFT Contract to address ${nftContract.address}`);
    console.log(`Granting minting permissions to ${process.env.STARKNET_ADDRESS}...`);
    // Now that we have successfully deployed, let's give ourselves the minter role,
    // so that we can begin minting NFTs
    let fee = await myAccount.estimateFee(nftContract, "grantRole", {
        role: starknet.shortStringToBigInt("MINTER_ROLE"),
        account: BigInt(myAccount.starknetContract.address),
    });

    await myAccount.invoke(
        nftContract,
        "grantRole",
        {
            role: starknet.shortStringToBigInt("MINTER_ROLE"),
            account: BigInt(myAccount.starknetContract.address),
        },
        { maxFee: fee.amount * BigInt(2) }
    );

  console.log("Minter role granted");

  // See IMX Test cases for more examples
  // https://github.com/immutable/imx-starknet/blob/92141bdfb3e2631db945011495664fc4e35596da/tests/functional/starknet/erc721/ERC721.test.ts
  process.exit(0);
}

main()
  .then(() => console.log("finished successfully"))
  .catch((x) => {
    console.log(`Failed to run: ${x.toString()}`);
    process.exit(1);
});
