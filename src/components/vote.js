import React from "react";
import { DocView } from "../common/doc_view";
import * as contract from "../contract";

export class Vote extends React.Component {
  constructor() {
    super();
    this.state = {
      edit_ids: [],
      votes: [],
      threshold: 0,
    };

    let path = window.location.pathname;
    let id = path.split('/')[2];
    this.id = id;
    this.winner = 0;
  }

  async componentDidMount() {
    let edits = await contract.getDocEdits(this.id);
    let votes = [];
    let maxVote = 0;
    for (var i = 0; i < edits.length; i++) {
      let v = await contract.votes(edits[i]);
      votes.push(v);
      if (maxVote < parseInt(v)) {
        maxVote = parseInt(v);
        this.winner = edits[i];
      }
    }

    console.log('winner', this.winner);
    let threshold = await contract.threshold(this.id);
    this.setState({
      edit_ids: edits,
      votes,
      threshold,
      maxVote,
    })
  }

  async vote(id) {
    await contract.vote(id);
  }

  async finalize() {
    await contract.finalizeVoting(this.id);
    window.location.href = `/doc/${this.winner}`
  }

  render() {
    return <div>
      edits
      {this.state.edit_ids.map((id, i) => {
        return <div key={i}>
          <p>Edit Id: #{id}</p>
          <DocView id={id} />
          <div>votes: {this.state.votes[i]}</div>
          <button onClick={() => this.vote(id)}>vote</button><br />
          {(i !== this.state.edit_ids.length-1) ? <hr style={{ borderTop: '3px dashed #bbb' }} /> : null }
        </div>
      })}<br />
      <hr />
      <div>threshold: {this.state.threshold}</div>
      {(this.state.maxVote >= this.state.threshold) ? <button onClick={() => this.finalize()}>finalize</button> : undefined}
    </div>;
  }
}
