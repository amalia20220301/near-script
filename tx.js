import 'dotenv/config'
import NearApi, {connect, keyStores, utils} from 'near-api-js';
import {
    actionCreators,
    createTransaction, DeleteKey,
    encodeTransaction,
    FunctionCall,
    SCHEMA,
    Transaction
} from '@near-js/transactions';

import { PublicKey } from '@near-js/crypto';
import bs58 from "bs58";
import {
    addKey,
    createAccount, deleteAccount, deleteKey,
    deployContract, fullAccessKey,
    functionCall,
    functionCallAccessKey, stake,
    transfer
} from "near-api-js/lib/transaction.js";
import {CryptoKeypath, NearSignRequest, PathComponent} from "@keystonehq/bc-ur-registry-near";
import * as uuid from "uuid";
import BN from 'bn.js';
import {serialize} from "borsh";
import { parseNearAmount } from '@near-js/utils';

let pk = PublicKey.fromString("ed25519:4LGE55cdv7DRfErMovJY3Hm6jQrzRFyGfGpAW9vnb8Sz");

const getFunctionCallAction = ()=> {
    const deposit = new BN(parseNearAmount('3.4'));
    console.log({deposit})
    return functionCall('qqq', new Uint8Array([
        123,
        34,
        97,
        109,
        111,
        117,
        110,
        116,
        34,
        58,
        34,
        52,
        55,
        48,
        48,
        48,
        48,
        48,
        48,
        48,
        48,
        48,
        48,
        48,
        48,
        48,
        48,
        48,
        48,
        48,
        48,
        48,
        48,
        48,
        48,
        48,
        34,
        125
    ]), 125000000000000, deposit)
};
const encodeKey = (key)=>{
    return `ed25519:${bs58.encode(key)}`
}
const getDeleteKeyAction=()=>{
    let publicKey = PublicKey.fromString(encodeKey(new Uint8Array([
        69,
        109,
        69,
        202,
        196,
        153,
        74,
        42,
        74,
        59,
        200,
        61,
        67,
        58,
        192,
        77,
        65,
        6,
        97,
        216,
        166,
        75,
        17,
        6,
        13,
        225,
        9,
        118,
        5,
        25,
        57,
        197
    ])));
    return deleteKey(PublicKey.from(publicKey))
}

const getAddKeyAction = ()=>{
    let pk = PublicKey.fromString(encodeKey(new Uint8Array([
        216,
        221,
        232,
        81,
        78,
        104,
        219,
        221,
        105,
        247,
        247,
        197,
        131,
        162,
        206,
        54,
        124,
        16,
        63,
        203,
        255,
        75,
        246,
        50,
        80,
        253,
        216,
        93,
        98,
        122,
        6,
        45
    ]));
    return addKey(pk, functionCallAccessKey(accountId, MULTISIG_CHANGE_METHODS, null)))
}
const actions = [
    // createAccount(),
    // deployContract(new Uint8Array([1, 2, 3])),
    // getFunctionCallAction(),
    // transfer(utils.format.parseNearAmount('0.00125') ),
    // stake(1000000, pk),
    // addKey(pk, fullAccessKey())
    getDeleteKeyAction(),
    // deleteAccount('123')
];

let blockHash = Buffer.from(bs58.decode('JACr3HfZpLKgoKhCis7FJZRT66Sx5sBYvjYiP7hR4rTg'));
const tx = createTransaction(
    'test.near',
    PublicKey.fromString('Anu7LYDfpLtkP7E16LT9imXF694BdQaa9ufVkQiwTQxC'),
    'whatever.near',
    1,
    actions,
    blockHash);
//UR
// const nearData = Buffer.from('40000000353862633234353938303464326564383736343166626465343062306439363334316362663033313362376466346263346636306661326634326336303263330058BC2459804D2ED87641FBDE40B0D96341CBF0313B7DF4BC4F60FA2F42C602C39A772D10BC5400001000000064656D6F303631372E746573746E6574E06289EA4112D89F6C56D010A491EE2BF5F12B418BB187A3F54D4C3EC33057070100000003000000A1EDCCCE1BC2D3000000000000','hex');
// console.log(nearData);
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
    signData: [serialize(SCHEMA,tx)],
    derivationPath: signKeyPath,
    requestId: Buffer.from(idBuffer),
    origin: "nearwallet",
});

const cborHex = nearSignRequest.toCBOR().toString("hex");
console.log('---------------');
console.log({cborHex});
console.log('---------------');