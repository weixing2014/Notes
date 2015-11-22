import React from 'react';
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button'

export default class NoteMenu extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <IconMenu style={{ float: "right" }} iconButtonElement={ <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
        />
      </IconButton> }>
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Send feedback" />
        <MenuItem primaryText="Settings" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    );
  }
}
