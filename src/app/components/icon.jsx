import React from 'react';
import { Button, Tooltip } from 'react-bootstrap';
import Radium from 'radium'


const styles = {
  base: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: '0',
    ':hover': {
      cursor: 'pointer',
    },
  },
}

const Icon = React.createClass({

  render() {
    const { iconName, className, style, onClick } = this.props;

    return (
      <i
        style={[
          styles.base,
          style,
        ]}
        onClick={onClick}
        className={`fa fa-${iconName} ${className}`}
        />
    );
  },
});

export default Radium(Icon);
