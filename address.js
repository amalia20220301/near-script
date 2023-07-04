import 'dotenv/config'
import { derivePath, getMasterKeyFromSeed } from 'ed25519-hd-key'
import bs58 from 'bs58'
import bip39 from 'bip39'
import nacl from 'tweetnacl';

export const getAccessKey = (path) => {
    let publicKey = getPublicKey(path);
    return `ed25519:${bs58.encode(publicKey)}`
}

export const getPublicKey = (path) => {
    const seed = bip39.mnemonicToSeedSync(process.env.WORDS)
    const { key } = derivePath(path, seed.toString('hex'));
    return nacl.sign.keyPair.fromSeed(key).publicKey;
}

export const getPrivKey = (path) => {
    const seed = bip39.mnemonicToSeedSync(process.env.WORDS)
    const { key } = derivePath(path, seed.toString('hex'))
    return nacl.sign.keyPair.fromSeed(key).secretKey
}


//for(let i = 0; i <=10; i++) {
//    const path = `m/44'/397'/0'/0'/${i}'`
//    console.log(Buffer.from(getPublicKey(path)).toString('hex'));
//}

//console.log("------------------\n\n");
//console.log(Buffer.from(getPublicKey("m/44'/397'/0'")).toString('hex'));
//
//console.log(Buffer.from(bs58.decode('4LGE55cdv7DRfErMovJY3Hm6jQrzRFyGfGpAW9vnb8Sz')).toString('hex'))

console.log(bs58.encode(Buffer.from('18da0d513cf6b9aaed71080ac460bd75b66ccc157e1ebbb9eaabd6a4ba40c370','hex')))