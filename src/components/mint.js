import React from "react";
import * as contract from '../contract';
import * as store from '../store';
import { Editor } from "../common/editor";
export class Mint extends React.Component {
  constructor() {
    super();
    this.addresses = [null, null, null];
    this.state = { content: '', maxSupply: 0 };

    // eslint-disable-next-line no-restricted-globals
    self = this;
  }

  async componentDidMount() {
    this.setState({
      maxSupply: await contract.maxSupply(),
    })
  }

  async mint() {
    let hash = store.storeDoc(this.state.content);
    console.log(hash, this.addresses);
    let id = await contract.mintDoc({
      hash,
      addresses: this.addresses,
      // TODO
      voteLen: 200,
    })
    console.log(id);

    this.setState({
      maxSupply: await contract.maxSupply(),
    })
    window.location.href = `/doc/${this.state.maxSupply}`
  }

  docUpdate(content) {
    console.log('content', content);
    // eslint-disable-next-line no-restricted-globals
    self.setState({
      content
    })
  }

  addressUpdate(i, a) {
    this.addresses[i] = a;
  }

  render() {
    return <div>
      <h1>Mint</h1>
      <Editor id={0} docUpdate={this.docUpdate}/>
      <p>addresses</p>
      <input type="text" onChange={(ev) => this.addressUpdate(0, ev.target.value)} /><br />
      <input type="text" onChange={(ev) => this.addressUpdate(1, ev.target.value)} /><br />
      <input type="text" onChange={(ev) => this.addressUpdate(2, ev.target.value)} /><br />
      <button onClick={() => this.mint()}>Mint</button>
      <div>current total docs: {this.state.maxSupply - 1}</div>
    </div>;
  }
}