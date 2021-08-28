import { Button, ButtonProps } from '@material-ui/core';
import React from 'react';
import { theme } from '../theme';

interface Props extends ButtonProps {
  extraColor?: 'textSecondary';
}

const NeonButton: React.FC<Props> = (props) => {
  const color =
    props.extraColor === 'textSecondary'
      ? theme.palette.text.secondary
      : !props.color || props.color === 'inherit' || props.color === 'default'
      ? 'white'
      : theme.palette[props.color].main;

  const shadowSize = '1rem';

  return (
    <Button
      style={{
        ...props.style,
        boxShadow: `0px 0px 10px 5px ${color}`,
        color: 'white',
        fontWeight: theme.typography.fontWeightLight,
        textShadow: `0 0 calc(${shadowSize} / 4) #fff,  0 0 ${shadowSize} ${color}, 0 0 ${shadowSize} ${color}, 0 0 calc(${shadowSize} * 1.5) ${color}, 0 0 ${shadowSize} ${color}, 0 0 ${shadowSize} ${color}`,
      }}
      {...props}
    />
  );
};

export default NeonButton;
