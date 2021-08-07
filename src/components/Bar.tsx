import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles<Theme, Props>((theme) => ({
  bar: {
    width: (props) => {
      if (!props.size || props.size === 'default') return '200px';
      if (props.size === 'large') return '300px';
      if (props.size === 'small') return '100px';
    },
    height: '5px',
    borderRadius: '5px',
    background: (props) =>
      props.color
        ? theme.palette[props.color].main
        : theme.palette.primary.main,
    margin: (props) => {
      if (!props.align || props.align === 'center') return '0 auto';
      if (props.align === 'left') return '0 auto 0 0';
      if (props.align === 'right') return '0 0 0 auto';
    },
  },
}));

interface Props {
  color?: 'error' | 'info' | 'primary' | 'secondary' | 'success' | 'warning';
  className?: string;
  size?: 'small' | 'default' | 'large';
  align?: 'left' | 'center' | 'right';
  style?: { [key: string]: string };
}

const Bar: React.FC<Props> = (props) => {
  const classes = useStyles(props);

  return (
    <div
      className={clsx(classes.bar, props.className)}
      style={props.style ? props.style : {}}
    />
  );
};

export default Bar;
