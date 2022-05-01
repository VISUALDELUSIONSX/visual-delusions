import { Typography, TypographyProps } from '@material-ui/core';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import useAnimation, { AnimationType } from '../hooks/useAnimation';
import { theme } from '../theme';

export type NeonTypographyProps<C extends React.ElementType> = Omit<
  TypographyProps<C>,
  'color'
> & {
  color?: string;
  animation?: AnimationType;
  shadowQuotient?: number;
};

function NeonTypography<C extends React.ElementType>(
  props: NeonTypographyProps<C>
) {
  const { color = '#fff', animation, shadowQuotient = 5, ...rest } = props;

  const size =
    !props.variant || props.variant === 'inherit' || props.variant === 'srOnly'
      ? '1rem'
      : theme.typography[props.variant].fontSize;

  const shadowSize = parseInt(size + 'rem' || '1rem') / shadowQuotient + 'rem';

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

export default NeonTypography;

