import React from "react";
import * as store from '../store';
import * as contract from '../contract';

export class Editor extends React.Component {
  // component mount go get the doc based on the id
  constructor(props) {
    super(props);
    this.state = {
      doc: '',
      content: '',
      value: '',
    };
    this.id = this.props.id;
  }

  handleChange(e) {
    console.log('handle change', e);
    this.setState({ value: e.target.value });
    this.props.docUpdate(e.target.value);
  };

  async componentDidMount() {
    if (this.id !== 0) {
      let doc = await contract.getDocById(this.id);
      console.log(`doc '${doc}'`)
      // load doc
      let content = store.getDoc(doc);
      this.setState({
        value: content,
      })
    }
  }

  render() {
    return <div>
      <textarea id="textarea" value={this.state.value} onChange={(ev) => this.handleChange(ev)} rows={10} cols={40} /><br/>
    </div>;
  }
}