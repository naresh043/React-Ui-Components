import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export const MenuItem = ({ children, onClick,className, ...props }) => {
  const handleClick = (e) => {
    if (onClick) onClick(e);
  };

  return (
    <li
      className={twMerge(clsx('menu-item',className))}
      role="menuitem"
      onClick={handleClick}
      {...props}
    >
      {children}
    </li>
  );
};