import NeonTypography, { NeonTypographyProps } from './NeonTypography';

const CartSubtitle: React.FC<NeonTypographyProps> = (props) => (
  <NeonTypography
    component='h2'
    variant='h4'
    gutterBottom
    shadowQuotient={3}
    {...props}
    style={{ fontWeight: 'bold', ...props.style }}
  />
);

export default CartSubtitle;
