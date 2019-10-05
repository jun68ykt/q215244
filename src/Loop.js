import React from 'react';

class Loop extends React.Component {
  render () {
    return (
      <div>
        {this.props.lists.map((l) =>(
          <div key={l.days}>
            <div onClick={this.props.onClick}>{l.value}{l.input}</div>
          </div>
        ))}
      </div>
    );
  }

}

export default Loop;
