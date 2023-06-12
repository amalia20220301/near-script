import 'dotenv/config'
import NearApi, {connect, keyStores} from 'near-api-js';
import { actionCreators, createTransaction, SCHEMA, Transaction } from '@near-js/transactions';

import { PublicKey } from '@near-js/crypto';
import bs58 from "bs58";
import {createAccount} from "near-api-js/lib/transaction.js";
import {CryptoKeypath, NearSignRequest, PathComponent} from "@keystonehq/bc-ur-registry-near";
import * as uuid from "uuid";

// const networkId = "mainnet";
// const keyStore = new keyStores.InMemoryKeyStore();
//
// const config = {
//     networkId,
//     keyStore,
//     nodeUrl: `https://rpc.${networkId}.near.org`,
//     walletUrl: `https://wallet.${networkId}.near.org`,
//     helperUrl: `https://helper.${networkId}.near.org`,
//     explorerUrl: `https://explorer.${networkId}.near.org`,
// };
//
// const near = await connect(config);



let pk = PublicKey.fromString("ed25519:4LGE55cdv7DRfErMovJY3Hm6jQrzRFyGfGpAW9vnb8Sz");
const actions = [createAccount()]

let blockHash = Buffer.from(bs58.decode('JACr3HfZpLKgoKhCis7FJZRT66Sx5sBYvjYiP7hR4rTg'));
console.log('blockhash', blockHash);
let tx = createTransaction("sweat_welcome.near",pk,'31824fbf2435fb1eca4dfc39774183cb25f13b10352d5d5327616b59c35eae9f','98604280000000',actions,blockHash);
console.log(Buffer.from(tx.encode()).toString('hex'))


//UR
const nearData = Buffer.from(
    "1200000073776561745f77656c636f6d652e6e6561720031824fbf2435fb1eca4dfc39774183cb25f13b10352d5d5327616b59c35eae9f002e1519ae5900004000000033313832346662663234333566623165636134646663333937373431383363623235663133623130333532643564353332373631366235396333356561653966fef24c7d5a41e0e6858d4e54439322d754f93e33c55281dddb5b75dc33f10e670100000000",
    "hex"
);

const signKeyPath = new CryptoKeypath(
    [
        new PathComponent({ index: 44, hardened: true }),
        new PathComponent({ index: 397, hardened: true }),
        new PathComponent({ index: 0, hardened: true }),
        new PathComponent({ index: 0, hardened: true }),
        new PathComponent({ index: 1, hardened: true }),
    ],
    Buffer.from("78230804", "hex")
);

const nearRequestId = "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d";
const idBuffer = uuid.parse(nearRequestId);

const nearSignRequest = new NearSignRequest({
    signData: [nearData, nearData],
    derivationPath: signKeyPath,
    requestId: Buffer.from(idBuffer),
    origin: "nearwallet",
});

const cborHex = nearSignRequest.toCBOR().toString("hex");
console.log('---------------');
console.log({cborHex});
console.log('---------------');