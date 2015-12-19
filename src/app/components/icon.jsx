import React from 'react';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';


const Icon = React.createClass({

  render() {
    const { iconName, className, style, onClick, tooltipContent, tooltipPlacement } = this.props;

    const tooltip = (
      <Tooltip>{tooltipContent}</Tooltip>
    );

    return (
      <OverlayTrigger placement={tooltipPlacement || "top"} overlay={tooltip}>
        <span
          style={style}
          onClick={onClick}
          className={`fa fa-${iconName} ${className}`}
          />
      </OverlayTrigger>
    );
  },
});

export default Icon;
