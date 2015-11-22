import React from 'react';
import IconButton from 'material-ui/lib/icon-button';


export default class IconDelete extends React.Component {
  render() {
    return (
      <IconButton iconClassName="fa fa-minus-circle" tooltip="Remove"/>
    );
  }
}
