import { Button, ButtonProps } from '@material-ui/core';
import React from 'react';
import { theme } from '../theme';

interface Props extends ButtonProps {
  extraColor?: 'textSecondary' | 'error' | 'info';
}

const NeonButton: React.FC<Props> = (props) => {
  const { extraColor, ...rest } = props;
  const color =
    extraColor === 'textSecondary'
      ? theme.palette.text.secondary
      : extraColor === 'error'
      ? theme.palette.error.main
      : extraColor === 'info'
      ? theme.palette.info.main
      : !props.color || props.color === 'inherit' || props.color === 'default'
      ? 'white'
      : theme.palette[props.color].main;

  const shadowSize = '1rem';

  return (
    <Button
      style={{
        ...props.style,
        boxShadow: props.disabled ? undefined : `0px 0px 10px 5px ${color}`,
        color: 'white',
        textShadow: props.disabled
          ? undefined
          : `0 0 calc(${shadowSize} / 4) #fff,  0 0 ${shadowSize} ${color}, 0 0 ${shadowSize} ${color}, 0 0 calc(${shadowSize} * 1.5) ${color}, 0 0 ${shadowSize} ${color}, 0 0 ${shadowSize} ${color}`,
      }}
      {...rest}
    />
  );
};

export default NeonButton;

