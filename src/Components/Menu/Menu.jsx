import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import "./Menu.css";
import { useEffect } from "react";

export const Menu = ({
  id,
  anchorEl,
  open,
  onClose,
  children,
  MenuListProps = {},
}) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (anchorEl && !anchorEl.contains(e.target)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, anchorEl, onClose]);

  if (!open) return null;

  const anchorRect = anchorEl?.getBoundingClientRect();

  const style = {
    position: "absolute",
    top: anchorRect ? anchorRect.bottom : 0,
    left: anchorRect ? anchorRect.left : 0,
  };

  return (
    <div
      id={id}
      className={twMerge(
        clsx("menu-container", open && "block", "custom-tailwind-class")
      )}
      style={style}
      role="presentation"
      onClick={onClose}
    >
      <ul
        className={twMerge("menu-list", "another-custom-class")}
        role="menu"
        {...MenuListProps}
      >
        {children}
      </ul>
    </div>
  );
};
