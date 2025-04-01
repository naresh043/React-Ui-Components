import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import './Button.css';

export const Button = React.forwardRef(({
  children,
  id,
  className,
  onClick,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      id={id}
      onClick={onClick}
      className={twMerge(clsx('button', className))}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';