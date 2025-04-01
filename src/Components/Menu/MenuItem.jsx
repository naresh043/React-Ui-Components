// import React from 'react';
// import { twMerge } from 'tailwind-merge';
// import clsx from 'clsx';

// export const MenuItem = ({ children, onClick,className, ...props }) => {
//   const handleClick = (e) => {
//     if (onClick) onClick(e);
//   };

//   return (
//     <li
//       className={twMerge(clsx('menu-item',className))}
//       role="menuitem"
//       onClick={handleClick}
//       {...props}
//     >
//       {children}
//     </li>
//   );
// };

// MenuItem.jsx
import "./MenuItem.css"
import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export const MenuItem = ({ 
  children, 
  onClick, 
  className,
  disabled,
  selected,
  ...props 
}) => {
  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <li
      className={twMerge(
        clsx(
          'menu-item',
          disabled && 'opacity-50 cursor-not-allowed',
          selected && 'bg-gray-100',
          className
        )
      )}
      role="menuitem"
      aria-disabled={disabled}
      tabIndex={disabled ? undefined : -1}
      onClick={handleClick}
      {...props}
    >
      {children}
    </li>
  );
};