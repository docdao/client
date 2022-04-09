import { Contract, providers, utils } from 'ethers';
const provider = new providers.Web3Provider(window.ethereum)
let contract;
let abi = [
  'function createRootDocument(bytes32 docHash, address[] memory votingAddresses, uint256 threshold, uint256 voteEndLength) returns (uint256 createdDoc)',
  'function thresholds(uint256 idx) public view returns (uint256)',
  'function createDocumentEdit(bytes32 docHash, uint256 parent)',
  'function castVote(uint256 docId)',
  'function finalizeVoting(uint256 docId) public returns (uint256)',
  'function maxSupply() public view returns (uint256)',
  'function docHash(uint256) public view returns (bytes32)',
  'function docChildrenLen(uint256 parent) public view returns(uint256)',
  'function docChildrenAt(uint256 parent, uint256 child) public view returns(uint256)',
  'function votes(uint256 parent) public view returns(uint256)',
];

let done = false;
async function init() {
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner()
  contract = new Contract('0xCD685D211a4882DFB277EAa4Bb52299043Fb9c46', abi, signer);
  done = true;
}

init();
export async function maxSupply() {
  await checkReady();
  return parseInt((await contract.maxSupply()).toString());
}

export async function getDocById(id) {
  await checkReady();
  console.log('id', id);
  let docHash = await contract.docHash(id.toString());
  console.log('doc hash', docHash)
  return utils.parseBytes32String(docHash);
}

export async function getDocEdits(id) {
  await checkReady();
  let l = await contract.docChildrenLen(id.toString());
  let arr = [];
  for(let i = 0; i < parseInt(l.toString()); i++) {
    let k = await contract.docChildrenAt(id.toString(), i);
    arr.push(k.toString());
  }
  return arr;
}

export async function mintDoc({ hash, addresses, voteLen } = {}) {
  await checkReady();
  let threshold = 2;
  hash = utils.formatBytes32String(hash)
  let id = await contract.createRootDocument(hash, addresses, threshold.toString(), voteLen.toString());
  return id;
}

export async function mintEdit({ hash, parent } = {}) {
  await checkReady();
  // upload the doc get hash ...
  hash = utils.formatBytes32String(hash)
  let edit = await contract.createDocumentEdit(hash, parent);
}

export async function vote(id) {
  let voteResult = contract.castVote(id);
  return true;
}

export async function voters(id) {
  // let voteResult = contract.castVote(id);
  return ['0x0', '0x1', '0x2'];
}

export async function threshold(id) {
  await checkReady();
  return (await contract.thresholds(id)).toString();
}

export async function votes(id) {
  return (await contract.votes(id)).toString();
}

export async function finalizeVote({ doc_id } = {}) {
  // let voteResult = contract.finalizeVote(doc_id);
  // in theory the new doc
  return 10;
}

async function checkReady() {
  let i = 0;
  while (!done) {
    await new Promise((r) => setTimeout(r,100));
    if (i === 10) {
      break;
    }
    i++;
  }
}
