import { Typography, TypographyProps } from '@material-ui/core';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import useAnimation, { AnimationType } from '../hooks/useAnimation';
import { theme } from '../theme';

export default function NeonTypography<C extends React.ElementType>(
  props: TypographyProps<C, { component?: C }> & {
    extraColor?: 'info';
    animation?: AnimationType;
  }
) {
  const { extraColor, animation, ...rest } = props;
  const color = extraColor
    ? theme.palette[extraColor].main
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

  const [ref, , entry] = useInView();
  const isIntersecting = entry?.isIntersecting;
  const animationStyles = useAnimation(animation || 'fadeIn', isIntersecting, {
    transition: '300ms ease-in-out',
  });
  return (
    <Typography
      {...rest}
      ref={ref}
      style={{
        ...(animation ? animationStyles : {}),
        ...props.style,
        textShadow: `0 0 calc(${shadowSize} / 4) #fff, 0 0 calc(${shadowSize} / 4) #fff, 0 0 ${shadowSize} ${color}, 0 0 ${shadowSize} ${color}, 0 0 calc(${shadowSize} * 1.5) ${color}, 0 0 ${shadowSize} ${color}, 0 0 ${shadowSize} ${color}`,
        letterSpacing: '1.5px',
        color,
        ...rest.style,
      }}
    />
  );
}

