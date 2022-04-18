import { Typography, TypographyProps } from '@material-ui/core';
import React from 'react';

const FormError: React.FC<TypographyProps> = (props) => (
  <Typography
    role='alert'
    variant='subtitle2'
    color='error'
    {...props}
    style={{
      marginTop: '0.5rem',
      ...props.style,
    }}
  />
);

export default FormError;
