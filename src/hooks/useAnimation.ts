type AnimationType = 'slideRight' | 'slideLeft' | 'fadeIn' | 'grow';

const useAnimation = (
  type: AnimationType | AnimationType[],
  isIntersecting?: boolean,
  options: {
    transition?: string;
  } = { transition: '500ms ease-out' }
) => {
  const slideRight = {
    transition: options.transition,
    transform: isIntersecting ? 'translateX(0)' : 'translateX(-50vw)',
  };

  const slideLeft = {
    transition: options.transition,
    transform: isIntersecting ? 'translateX(0)' : 'translateX(50vw)',
  };

  const fadeIn = {
    transition: options.transition,
    opacity: isIntersecting ? 1 : 0,
  };

  const grow = {
    transition: options.transition,
    transform: isIntersecting ? 'scale(1)' : 'scale(0)',
  };

  const map = {
    slideRight,
    slideLeft,
    fadeIn,
    grow,
  };

  const combined =
    Array.isArray(type) &&
    type.reduce((acc, cur) => {
      return { ...acc, ...map[cur] };
    }, {});

  return type === 'slideRight'
    ? slideRight
    : type === 'slideLeft'
    ? slideLeft
    : type === 'fadeIn'
    ? fadeIn
    : type === 'grow'
    ? grow
    : combined
    ? combined
    : {};
};

export default useAnimation;
