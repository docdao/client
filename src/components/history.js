import React from "react";

let state = {
  current_doc: 'DOC XYZ',
}

export class View extends React.Component {
  render() {
    return <div>
      <h1>{state.current_doc}</h1>
      <textarea rows={10} cols={40} /><br/>
      <button>edit</button>
    </div>;
  }
}