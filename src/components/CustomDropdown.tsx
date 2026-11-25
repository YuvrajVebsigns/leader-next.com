'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './CustomDropdown.module.css';

export type CustomDropdownOption = {
  value: string;
  label: string;
};

type CustomDropdownProps = {
  id: string;
  ariaLabel: string;
  value: string;
  options: CustomDropdownOption[];
  placeholder: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export default function CustomDropdown({
  id,
  ariaLabel,
  value,
  options,
  placeholder,
  disabled = false,
  onChange,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedOption = options.find((option) => option.value === value);
  const menuId = `${id}-options`;

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsidePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleOutsidePointerDown);
    return () => document.removeEventListener('pointerdown', handleOutsidePointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      optionRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex, isOpen]);

  const openMenu = () => {
    if (disabled || options.length === 0) return;
    const selectedIndex = options.findIndex((option) => option.value === value);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setIsOpen(true);
  };

  const moveActiveOption = (nextIndex: number) => {
    setActiveIndex((nextIndex + options.length) % options.length);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.open : ''}`}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={menuId}
        disabled={disabled || options.length === 0}
        onClick={() => (isOpen ? setIsOpen(false) : openMenu())}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            openMenu();
          }
        }}
      >
        <span className={!selectedOption ? styles.placeholder : undefined}>
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown className={styles.arrow} size={20} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          id={menuId}
          className={styles.menu}
          role="listbox"
          aria-label={ariaLabel}
          aria-activedescendant={`${menuId}-option-${activeIndex}`}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                id={`${menuId}-option-${index}`}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`${styles.option} ${isSelected ? styles.selected : ''}`}
                tabIndex={-1}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                  triggerRef.current?.focus();
                }}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    moveActiveOption(index + 1);
                  } else if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    moveActiveOption(index - 1);
                  } else if (event.key === 'Home') {
                    event.preventDefault();
                    setActiveIndex(0);
                  } else if (event.key === 'End') {
                    event.preventDefault();
                    setActiveIndex(options.length - 1);
                  } else if (event.key === 'Escape') {
                    event.preventDefault();
                    setIsOpen(false);
                    triggerRef.current?.focus();
                  }
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
