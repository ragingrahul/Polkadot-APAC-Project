import { u8aToHex, hexToU8a, bnToU8a } from "@polkadot/util";
import { decodeAddress, blake2AsU8a } from "@polkadot/util-crypto";
import "@moonbeam-network/api-augment";
import { TypeRegistry } from "@polkadot/types";

export async function calculateMultilocation(address) {
    // Check Ethereum Address and/or Decode
    let decodedAddress;
    //let address = address;
    const ethAddress = address.length === 42;
    const accType = ethAddress ? "AccountKey20" : "AccountId32";
  
    // Decode Address if Needed
    if (!ethAddress) {
      decodedAddress = decodeAddress(address);
    } else {
      decodedAddress = hexToU8a(address);
    }
  
    let family = "ParentChain";
    // if (parents == 0 && paraId) family = "ChildChain";
    // else if (parents == 1 && !paraId) family = "ParentChain";
  
    // Calculate Hash Component
    const registry = new TypeRegistry();
    let toHash = new Uint8Array([
      ...new TextEncoder().encode(family),
      ...registry.createType("Compact<u32>", accType.length + (ethAddress ? 20 : 32)).toU8a(),
      ...new TextEncoder().encode(accType),
      ...decodedAddress,
    ]);
  
    console.log(`Remote Origin calculated as ${family}`);
    console.log(`${accType}: ${address}`);
  
    const DescendOriginAddress32 = u8aToHex(blake2AsU8a(toHash).slice(0, 32));
    const DescendOriginAddress20 = u8aToHex(blake2AsU8a(toHash).slice(0, 20));
  
    console.log(`32 byte address is ${DescendOriginAddress32}`);
    console.log(`20 byte address is ${DescendOriginAddress20}`);

    return DescendOriginAddress20;
  }