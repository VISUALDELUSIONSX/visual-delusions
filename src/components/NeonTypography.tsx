import { Typography, TypographyProps } from '@material-ui/core';
import React from 'react';
import { theme } from '../theme';

export default function NeonTypography<C extends React.ElementType>(
  props: TypographyProps<C, { component?: C }> & {
    extraColor?: 'info';
  }
) {
  const color = props.extraColor
    ? theme.palette[props.extraColor].main
    : !props.color || props.color === 'inherit' || props.color === 'initial'
    ? 'white'
    : props.color === 'textPrimary'
    ? theme.palette.text.primary
    : props.color === 'textSecondary'
    ? theme.palette.text.secondary
    : theme.palette[props.color].main;

  const size =
    !props.variant || props.variant === 'inherit' || props.variant === 'srOnly'
      ? '1rem'
      : theme.typography[props.variant].fontSize;

  const shadowSize = parseInt(size + 'rem' || '1rem') / 5 + 'rem';
  return (
    <Typography
      style={{
        ...props.style,
        textShadow: `0 0 calc(${shadowSize} / 4) #fff, 0 0 calc(${shadowSize} / 4) #fff, 0 0 ${shadowSize} ${color}, 0 0 ${shadowSize} ${color}, 0 0 calc(${shadowSize} * 1.5) ${color}, 0 0 ${shadowSize} ${color}, 0 0 ${shadowSize} ${color}`,
        letterSpacing: '1.5px',
        color,
      }}
      {...props}
    />
  );
}
