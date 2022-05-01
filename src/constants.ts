import { theme } from './theme';

export const carouselResponsive = {
  desktop: {
    breakpoint: {
      max: theme.breakpoints.values.xl,
      min: theme.breakpoints.values.lg,
    },
    items: 4,
    slidesToSlide: 4,
  },
  desktopMedium: {
    breakpoint: {
      max: theme.breakpoints.values.lg,
      min: theme.breakpoints.values.md,
    },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: {
      max: theme.breakpoints.values.md,
      min: theme.breakpoints.values.sm,
    },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: {
      max: theme.breakpoints.values.sm,
      min: theme.breakpoints.values.xs,
    },
    items: 1,
    slidesToSlide: 1,
  },
};
