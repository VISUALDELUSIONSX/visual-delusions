import React from 'react';
import NeonTypography, { NeonTypographyProps } from './NeonTypography';

function CartSubtitle<C extends React.ElementType>(
  props: NeonTypographyProps<C>
) {
  return (
    <NeonTypography
      component='h2'
      variant='h4'
      gutterBottom
      shadowQuotient={3}
      {...props}
      style={{ fontWeight: 'bold', ...props.style }}
    />
  );
}

export default CartSubtitle;
