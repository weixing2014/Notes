import React from 'react';
import Radium, { Style } from 'radium'

const styles = {
  base: {
    padding: '0 .3em',
    opacity: 0.8,
    ':hover': {
      opacity: 1,
      cursor: 'pointer',
    },
  },
}

const Icon = React.createClass({

  render() {
    const { style, onClick, className } = this.props;

    return (
      <i className={"fa fa-" + className} style={[ styles.base, style ]} onClick={onClick} />
    );
  },
})

export default Radium(Icon);
