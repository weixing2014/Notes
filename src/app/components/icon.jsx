import React from 'react';

const Icon = React.createClass({

  render() {

    const { iconName, className, style, onClick } = this.props;

    return (
      <span
        className={`fa fa-${iconName} ${className}`}
        style={style}
        onClick={onClick}
      />
    );
  },
});

export default Icon;
