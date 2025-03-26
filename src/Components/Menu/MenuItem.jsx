import React from 'react';

export const MenuItem = ({ children, onClick, ...props }) => {
  const handleClick = (e) => {
    if (onClick) onClick(e);
  };

  return (
    <li
      className="menu-item"
      role="menuitem"
      onClick={handleClick}
      {...props}
    >
      {children}
    </li>
  );
};