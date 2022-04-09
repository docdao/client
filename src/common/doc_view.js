import React from "react";
import * as contract from '../contract';
import * as store from '../store';

export class DocView extends React.Component {
  // component mount go get the doc based on the id
  constructor(props) {
    super(props);
    this.state = {id: this.props.id, content: null};
  }

  async componentDidMount() {
    let doc = await contract.getDocById(this.state.id);
    console.log(`doc '${doc}'`)
    // load doc
    let content = store.getDoc(doc);
    this.setState({
      content,
    })
  }

  render() {
    return <div>
      {(this.state.content === null) ?
          'loading' :
          this.state.content}
    </div>;
  }
}
