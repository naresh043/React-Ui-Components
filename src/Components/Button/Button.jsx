import React from 'react';
import './Button.css';

export const Button = React.forwardRef(({
  children,
  id,
  'aria-controls': ariaControls,
  'aria-haspopup': ariaHasPopup,
  'aria-expanded': ariaExpanded,
  onClick,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      id={id}
      aria-controls={ariaControls}
      aria-haspopup={ariaHasPopup}
      aria-expanded={ariaExpanded}
      onClick={onClick}
      className="button"
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';