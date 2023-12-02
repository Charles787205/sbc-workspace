import * as Web3 from "@solana/web3.js";

async function main() {
  const publicKey = new Web3.PublicKey(
    "9fyYcwA7msMLZv8NLcm9Fex1jvGBnzkvTFUZfrmf3bzr"
  );

  const url = Web3.clusterApiUrl("devnet");
  const connection = new Web3.Connection(url);
  const balance = await connection.getBalance(publicKey);
  console.log("balance: ", balance);
}
main();
