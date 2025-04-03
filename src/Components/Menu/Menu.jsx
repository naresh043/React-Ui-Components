// menu.jsx
// import { twMerge } from "tailwind-merge";
// import clsx from "clsx";
// import "./Menu.css";
// import { useEffect } from "react";

// export const Menu = ({
//   id,
//   anchorEl,
//   open,
//   onClose,
//   children,
//   MenuListProps = {},
// }) => {
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (anchorEl && !anchorEl.contains(e.target)) {
//         onClose();
//       }
//     };

//     if (open) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [open, anchorEl, onClose]);

//   if (!open) return null;

//   const anchorRect = anchorEl?.getBoundingClientRect();
//   const viewportHeight = window.innerHeight;
//   const spaceBelow = viewportHeight - (anchorRect?.bottom || 0);
//   const maxHeight = spaceBelow - 16; // 16px buffer from bottom

//   const style = {
//     position: "absolute",
//     top: anchorRect ? anchorRect.bottom : 0,
//     left: anchorRect ? anchorRect.left : 0,
//     maxHeight: `${maxHeight}px`,
//   };

//   return (
//     <div
//       id={id}
//       className={twMerge(
//         clsx("menu-container", open && "block", "custom-tailwind-class")
//       )}
//       style={style}
//       role="presentation"
//       onClick={onClose}
//     >
//       <ul
//         className={twMerge("menu-list", "another-custom-class")}
//         role="menu"
//         {...MenuListProps}
//       >
//         {children}
//       </ul>
//     </div>
//   );
// };

// menu.jsx
// import { twMerge } from "tailwind-merge";
// import clsx from "clsx";
// import "./Menu.css";
// import { useEffect, useRef } from "react";

// export const Menu = ({
//   id,
//   anchorEl,
//   open,
//   onClose,
//   children,
//   MenuListProps = {},
// }) => {
//   const menuRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (anchorEl && !anchorEl.contains(e.target) && menuRef.current && !menuRef.current.contains(e.target)) {
//         onClose();
//       }
//     };

//     const handleKeyDown = (e) => {
//       if (e.key === 'Escape') {
//         onClose();
//       }
//     };

//     if (open) {
//       document.addEventListener("mousedown", handleClickOutside);
//       document.addEventListener("keydown", handleKeyDown);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [open, anchorEl, onClose]);

//   if (!open) return null;

//   const anchorRect = anchorEl?.getBoundingClientRect();
//   const viewportHeight = window.innerHeight;
//   const spaceBelow = viewportHeight - (anchorRect?.bottom || 0);
//   const spaceAbove = anchorRect?.top || 0;
  
//   // MUI-like positioning logic
//   const positionVertical = spaceBelow >= spaceAbove ? 'bottom' : 'top';
//   const maxHeight = positionVertical === 'bottom' 
//     ? Math.min(spaceBelow - 16, 8 * 48) // Max 8 items (MUI default)
//     : Math.min(spaceAbove - 16, 8 * 48);

//   const style = {
//     position: 'absolute',
//     top: positionVertical === 'bottom' ? anchorRect.bottom : 'auto',
//     bottom: positionVertical === 'top' ? viewportHeight - anchorRect.top : 'auto',
//     left: anchorRect?.left || 0,
//     maxHeight: `${maxHeight}px`,
//   };

//   return (
//     <div
//       ref={menuRef}
//       id={id}
//       className={twMerge(clsx("menu-container", open && "block"))}
//       style={style}
//       role="presentation"
//     >
//       <ul
//         className={twMerge("menu-list")}
//         role="menu"
//         tabIndex={-1}
//         {...MenuListProps}
//       >
//         {children}
//       </ul>
//     </div>
//   );
// };

import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import "./Menu.css";
import { useEffect, useRef, useState } from "react";

export const Menu = ({
  id,
  className,
  anchorEl,
  open,
  onClose,
  children,
  MenuListProps = {},
}) => {
  const menuRef = useRef(null);
  const [menuHeight, setMenuHeight] = useState(0);

  useEffect(() => {
    if (menuRef.current && open) {
      // Measure the actual height of the menu content
      setMenuHeight(menuRef.current.scrollHeight);
    }
  }, [open, children]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (anchorEl && 
          !anchorEl.contains(e.target) && 
          menuRef.current && 
          !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      // Prevent background scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, anchorEl, onClose]);

  if (!open) return null;

  const anchorRect = anchorEl?.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  
  // Calculate available space
  const spaceBelow = viewportHeight - (anchorRect?.bottom || 0);
  const spaceAbove = anchorRect?.top || 0;
  const spaceRight = viewportWidth - (anchorRect?.right || 0);
  
  // Determine optimal position
  const positionVertical = (spaceBelow >= menuHeight || spaceBelow >= spaceAbove) ? 'bottom' : 'top';
  const positionHorizontal = spaceRight >= 280 ? 'left' : 'right';
  
  // Calculate max height and position
  const maxAvailableHeight = positionVertical === 'bottom' 
    ? spaceBelow - 16 // 16px margin from bottom
    : spaceAbove - 16; // 16px margin from top

  const style = {
    position: 'fixed',
    top: positionVertical === 'bottom' ? `${anchorRect.bottom}px` : 'auto',
    bottom: positionVertical === 'top' ? `${viewportHeight - anchorRect.top}px` : 'auto',
    left: positionHorizontal === 'left' ? `${anchorRect.left}px` : 'auto',
    right: positionHorizontal === 'right' ? `${viewportWidth - anchorRect.right}px` : 'auto',
    maxHeight: `${Math.min(maxAvailableHeight, menuHeight)}px`,
    minWidth: `${anchorRect.width}px`, // Match anchor width
  };

  return (
    <div
      ref={menuRef}
      id={id}
      // className={twMerge(clsx("menu-container", open && "block"))}
      className={twMerge(clsx("menu-container", className, open && "block"))} 
      style={style}
      // style={{border:'2px solid red'}}
      role="presentation"
    >
      <ul
        className={twMerge("menu-list")}
        role="menu"
        tabIndex={-1}
        {...MenuListProps}
      >
        {children}
      </ul>
    </div>
  );
};

// // menu.jsx
// import { twMerge } from "tailwind-merge";
// import clsx from "clsx";
// import "./Menu.css";
// import { useEffect, useRef, useState } from "react";

// export const Menu = ({
//   id,
//   anchorEl,
//   open,
//   onClose,
//   children,
//   MenuListProps = {},
// }) => {
//   const menuRef = useRef(null);
//   const listRef = useRef(null);
//   const [maxHeight, setMaxHeight] = useState(null);

//   useEffect(() => {
//     if (!open) {
//       setMaxHeight(null); // Reset maxHeight when menu closes
//       return;
//     }

//     const calculatePosition = () => {
//       if (!anchorEl || !menuRef.current) return;

//       const anchorRect = anchorEl.getBoundingClientRect();
//       const viewportHeight = window.innerHeight;
//       const spaceBelow = viewportHeight - anchorRect.bottom;
//       const spaceAbove = anchorRect.top;
      
//       // Calculate available height with 16px margin
//       const availableHeight = Math.max(spaceBelow, spaceAbove) - 16;
      
//       // Set initial maxHeight to content height, then adjust if needed
//       const contentHeight = menuRef.current.scrollHeight;
//       const calculatedMaxHeight = Math.min(contentHeight, availableHeight);
      
//       setMaxHeight(calculatedMaxHeight);
//     };

//     calculatePosition();

//     // Recalculate on window resize
//     const handleResize = () => {
//       if (open) calculatePosition();
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [open, anchorEl, children]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (anchorEl && 
//           !anchorEl.contains(e.target) && 
//           menuRef.current && 
//           !menuRef.current.contains(e.target)) {
//         onClose();
//       }
//     };

//     const handleKeyDown = (e) => {
//       if (e.key === 'Escape') {
//         onClose();
//       }
//     };

//     if (open) {
//       document.addEventListener("mousedown", handleClickOutside);
//       document.addEventListener("keydown", handleKeyDown);
//       document.body.style.overflow = 'hidden';
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleKeyDown);
//       document.body.style.overflow = '';
//     };
//   }, [open, anchorEl, onClose]);

//   if (!open) return null;

//   const anchorRect = anchorEl?.getBoundingClientRect();
//   const viewportHeight = window.innerHeight;
//   const viewportWidth = window.innerWidth;
  
//   // Calculate available space
//   const spaceBelow = viewportHeight - (anchorRect?.bottom || 0);
//   const spaceAbove = anchorRect?.top || 0;
//   const spaceRight = viewportWidth - (anchorRect?.right || 0);
  
//   // Determine optimal position
//   const positionVertical = spaceBelow >= spaceAbove ? 'bottom' : 'top';
//   const positionHorizontal = spaceRight >= 280 ? 'left' : 'right';

//   const style = {
//     position: 'fixed',
//     top: positionVertical === 'bottom' ? `${anchorRect.bottom}px` : 'auto',
//     bottom: positionVertical === 'top' ? `${viewportHeight - anchorRect.top}px` : 'auto',
//     left: positionHorizontal === 'left' ? `${anchorRect.left}px` : 'auto',
//     right: positionHorizontal === 'right' ? `${viewportWidth - anchorRect.right}px` : 'auto',
//     minWidth: `${anchorRect.width}px`,
//   };

//   return (
//     <div
//       ref={menuRef}
//       id={id}
//       className={twMerge(clsx("menu-container", open && "block"))}
//       style={style}
//       role="presentation"
//     >
//       <ul
//         ref={listRef}
//         className={twMerge("menu-list")}
//         role="menu"
//         tabIndex={-1}
//         style={{ maxHeight: maxHeight !== null ? `${maxHeight}px` : undefined }}
//         {...MenuListProps}
//       >
//         {children}
//       </ul>
//     </div>
//   );
// };