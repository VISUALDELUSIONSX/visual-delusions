import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  alpha,
} from '@material-ui/core';
import useAnimation, { AnimationType } from '../hooks/useAnimation';
import React, { CSSProperties, ReactElement } from 'react';
import { useInView } from 'react-intersection-observer';
import { ExpandMore } from '@material-ui/icons';

interface Props {
  color?: string;
  animation?: AnimationType;
  summary: string | ReactElement;
  children: string | ReactElement;
  style?: CSSProperties;
}

const NeonAccordion: React.FC<Props> = React.forwardRef((props, forwardRef) => {
  const { animation, color, summary, children, style } = props;

  const [ref, , entry] = useInView();
  const isIntersecting = entry?.isIntersecting;
  const animationStyles = useAnimation(animation || 'fadeIn', isIntersecting, {
    transition: '300ms ease-in-out',
  });

  return (
    <div ref={ref}>
      <Accordion
        ref={forwardRef}
        style={{
          boxShadow: `2px 2px 20px ${alpha(color || '#fff', 0.4)}`,
          ...animationStyles,
          ...style,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore color='action' />}>
          {summary}
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
});

export default NeonAccordion;
