import { alpha, Card, CardProps } from '@material-ui/core';
import React from 'react';

const NeonCard: React.FC<CardProps & { shadowColor?: string }> =
  React.forwardRef((props, ref) => {
    const { shadowColor, ...rest } = props;
    return (
      <Card
        {...rest}
        ref={ref}
        style={{
          boxShadow: `2px 2px 20px ${alpha(shadowColor || '#fff', 0.4)}`,
          ...props.style,
        }}
      />
    );
  });

export default NeonCard;
