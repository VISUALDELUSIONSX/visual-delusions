import {
  Box,
  ClickAwayListener,
  Fade,
  makeStyles,
  Paper,
  Popper,
  PopperPlacementType,
  PopperProps,
  Theme,
} from '@material-ui/core';
import React, { CSSProperties, ReactElement } from 'react';

interface Props {
  content: ReactElement;
  children: ReactElement;
  open: boolean;
  onClose?: () => void;
  arrow?: boolean;
  placement?: PopperPlacementType;
  style?: CSSProperties;
  PopperProps?: Partial<PopperProps>;
  backgroundColor?: string;
}

const useStyles = makeStyles<Theme, { color?: string }>((theme) => {
  const color = theme.palette.background.paper; // Feel free to customise this like they do in Tooltip
  return {
    popoverRoot: {
      backgroundColor: (props) => props.color || color,
      maxWidth: 1000,
    },
    content: {
      padding: theme.spacing(2),
    },
    // Stolen from https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Tooltip/Tooltip.js and https://github.com/mui-org/material-ui/blob/4f2a07e140c954b478a6670c009c23a59ec3e2d4/docs/src/pages/components/popper/ScrollPlayground.js
    popper: {
      zIndex: 2000,
      margin: '0 1rem',
      '&[x-placement*="bottom"] $arrow': {
        top: 0,
        left: 0,
        marginTop: '-0.71em',
        marginLeft: 4,
        marginRight: 4,
        '&::before': {
          transformOrigin: '0 100%',
        },
      },
      '&[x-placement*="top"] $arrow': {
        bottom: 0,
        left: 0,
        marginBottom: '-0.71em',
        marginLeft: 4,
        marginRight: 4,
        '&::before': {
          transformOrigin: '100% 0',
        },
      },
      '&[x-placement*="right"] $arrow': {
        left: 0,
        marginLeft: '-0.71em',
        height: '1em',
        width: '0.71em',
        marginTop: 4,
        marginBottom: 4,
        '&::before': {
          transformOrigin: '100% 100%',
        },
      },
      '&[x-placement*="left"] $arrow': {
        right: 0,
        marginRight: '-0.71em',
        height: '1em',
        width: '0.71em',
        marginTop: 4,
        marginBottom: 4,
        '&::before': {
          transformOrigin: '0 0',
        },
      },
    },
    // Stolen from https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Tooltip/Tooltip.js
    arrow: {
      overflow: 'hidden',
      position: 'absolute',
      width: '1em',
      height: '0.71em' /* = width / sqrt(2) = (length of the hypotenuse) */,
      boxSizing: 'border-box',
      color: (props) => props.color || color,
      '&::before': {
        content: '""',
        margin: 'auto',
        display: 'block',
        width: '100%',
        height: '100%',
        boxShadow: theme.shadows[1],
        backgroundColor: 'currentColor',
        transform: 'rotate(45deg)',
      },
    },
  };
});

const RichTooltip = ({
  placement = 'top',
  arrow = true,
  open,
  onClose = () => {},
  content,
  children,
  style,
  PopperProps,
  backgroundColor,
}: Props) => {
  const classes = useStyles({ color: backgroundColor });
  const [arrowRef, setArrowRef] = React.useState<HTMLElement | null>(null);
  const [childNode, setChildNode] = React.useState<HTMLElement | null>(null);

  return (
    <div style={{ display: 'inline-block', ...style }}>
      {React.cloneElement(children, { ...children.props, ref: setChildNode })}
      <Popper
        open={open}
        anchorEl={childNode}
        placement={placement}
        transition
        className={classes.popper}
        modifiers={{
          preventOverflow: {
            enabled: true,
            boundariesElement: 'window',
          },
          arrow: {
            enabled: arrow,
            element: arrowRef,
          },
        }}
        {...PopperProps}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <ClickAwayListener onClickAway={onClose}>
                <Paper className={classes.popoverRoot}>
                  {arrow ? (
                    <span className={classes.arrow} ref={setArrowRef} />
                  ) : null}
                  <Box className={classes.content}>{content}</Box>
                </Paper>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default RichTooltip;
