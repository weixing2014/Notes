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
        <Button style={style} bsSize="xsmall" onClick={onClick}>
          <i className={`fa fa-${iconName}`} />
        </Button>
      </OverlayTrigger>

      // <span
      //   className={`fa fa-${iconName} ${className}`}
      //   style={style}
      //   onClick={onClick}
      // />
    );
  },
});

export default Icon;
