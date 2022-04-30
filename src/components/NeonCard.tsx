import { alpha, Card, CardProps } from '@material-ui/core';
import React from 'react';

const NeonCard: React.FC<CardProps & { shadowColor?: string }> =
  React.forwardRef((props, ref) => {
    return (
      <Card
        {...props}
        ref={ref}
        style={{
          boxShadow: `2px 2px 20px ${alpha(props.shadowColor || '#fff', 0.4)}`,
          ...props.style,
        }}
      />
    );
  });

export default NeonCard;
