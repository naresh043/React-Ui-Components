import React from 'react';
import './Menu.css';
import { MenuItem } from './MenuItem';

export const Menu = ({
  id,
  anchorEl,
  open,
  onClose,
  children,
  MenuListProps = {},
}) => {
  if (!open) return null;

  const anchorRect = anchorEl?.getBoundingClientRect();

  const style = {
    position: 'absolute',
    top: anchorRect ? anchorRect.bottom : 0,
    left: anchorRect ? anchorRect.left : 0,
  };

  return (
    <div
      id={id}
      className="menu-container"
      style={style}
      role="presentation"
      onClick={onClose}
    >
      <ul
        className="menu-list"
        role="menu"
        {...MenuListProps}
      >
        {children}
      </ul>
    </div>
  );
};