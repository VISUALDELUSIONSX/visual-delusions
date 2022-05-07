import { Button, ButtonProps } from '@material-ui/core';
import React from 'react';

interface Props extends Omit<ButtonProps, 'color'> {
  color?: string;
}

const NeonButton: React.FC<Props> = (props) => {
  const { color, ...rest } = props;
  const shadowSize = '1rem';

  return (
    <Button
      style={{
        ...props.style,
        boxShadow: props.disabled ? undefined : `0px 0px 10px 5px ${color}`,
        backgroundColor:
          props.disabled || props.variant !== 'contained' ? undefined : color,
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

