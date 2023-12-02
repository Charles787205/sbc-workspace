import * as Web3 from "@solana/web3.js";
import Dotenv from "dotenv";
import base58 from "bs58";
const programId = "F93n56xAZK2mX8LEwJ7cHTz24QjbUXqgCJP5psH5ShjA";

Dotenv.config();
async function main() {
  const secretKey = process.env.PRIVATE_KEY;
  const decoded = base58.decode(secretKey as any);
  const userKeypair = Web3.Keypair.fromSecretKey(decoded);
  const publicKey = new Web3.PublicKey(programId);
  const url = Web3.clusterApiUrl("devnet");
  const connection = new Web3.Connection(url);
  const publicKeyTo = new Web3.PublicKey(
    "9fyYcwA7msMLZv8NLcm9Fex1jvGBnzkvTFUZfrmf3bzr"
  );
  const instruction = new Web3.TransactionInstruction({
    keys: [
      {
        pubkey: publicKeyTo,
        isSigner: true,
        isWritable: false,
      },
    ],
    data: Buffer.alloc(20),
    programId: publicKey,
  });

  const transaction = new Web3.Transaction();
  transaction.add(instruction);
  const signature = await Web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [userKeypair]
  );
  console.log("SIGNATURE", signature);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
  });
