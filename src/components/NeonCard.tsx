import { alpha, Card, CardProps } from '@material-ui/core';
import useAnimation, { AnimationType } from '../hooks/useAnimation';
import React from 'react';
import { useInView } from 'react-intersection-observer';

const NeonCard: React.FC<
  CardProps & { shadowColor?: string; animation?: AnimationType }
> = React.forwardRef((props, forwardRef) => {
  const { animation, shadowColor, ...rest } = props;

  const [ref, , entry] = useInView();
  const isIntersecting = entry?.isIntersecting;
  const animationStyles = useAnimation(animation || 'fadeIn', isIntersecting, {
    transition: '300ms ease-in-out',
  });

  return (
    <div ref={ref}>
      <Card
        {...rest}
        ref={forwardRef}
        style={{
          boxShadow: `2px 2px 20px ${alpha(shadowColor || '#fff', 0.4)}`,
          ...animationStyles,
          ...props.style,
        }}
      />
    </div>
  );
});

export default NeonCard;
