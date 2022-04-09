import React from "react";
import {DocView} from "../common/doc_view";
import * as contract from '../contract';
import {Editor} from "../common/editor";
import * as store from "../store";

export class Doc extends React.Component {
  constructor() {
    super();
    // eslint-disable-next-line no-restricted-globals
    self = this;
    this.state = {
      content: '',
      editing: false,
    }

    let path = window.location.pathname
    let id = path.split('/')[2];
    this.id = id;
  }

  // change state to be proposing
  async edit() {
    let hash = store.storeDoc(this.state.content);
    await contract.mintEdit({ hash, parent: this.id })


    window.location.href = `/vote/${this.id}`
  }

  docUpdate(content) {
    // eslint-disable-next-line no-restricted-globals
    self.setState({
      content
    })
  }

  enterEditor() {
    this.setState({
      editing: true
    });
  }

  render() {
    if (this.state.editing) {
      return <div>
        <h1>Editing Doc #{this.id}</h1>
        <Editor id={this.id} docUpdate={this.docUpdate}/>
        <button onClick={() => this.edit()}>Propose</button>
      </div>;
    } else {
      return <div>
        <h1>View Doc #{this.id}</h1>
        <DocView id={this.id} />
        <button onClick={() => this.enterEditor()}>Edit</button>
      </div>;
    }
  }
}