/** In this file, we create a React component which incorporates components provided by material-ui */

import React from 'react';
import uuid from 'node-uuid';

const notes = [
  {
    id: uuid.v4(),
    task: 'Learn Webpack',
  },
  {
    id: uuid.v4(),
    task: 'Learn React',
  },
  {
    id: uuid.v4(),
    task: 'Do laundry',
  },
];

export default class Main extends React.Component {

  render() {

    let containerStyle = {
      textAlign: 'center',
      paddingTop: '200px',
    };

    let standardActions = [
      { text: 'Okay' },
    ];

    return (
      <div style={containerStyle}>
        <ul>
          {this.renderNotes()}
        </ul>
      </div>
    )
  }

  renderNotes() {
    return notes.map(
      function(note) {
        return (
          <li key={note.id}>
            {note.task}
          </li>
        )
      }
    );
  }

}
