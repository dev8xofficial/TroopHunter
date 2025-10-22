// src/.../OffersCategories/OffersCategories.tsx
import React from 'react';
import WorkCategoriesStyles from '../WorkCategories/index.module.css';

type OffersCategoriesProps = {
  active?: string;
  onSelect?: (category: string) => void;
  openScheduleCallModal?: React.MouseEventHandler<HTMLButtonElement>;
};

export const OffersCategories: React.FC<OffersCategoriesProps> = ({ active, onSelect, openScheduleCallModal }) => {
  const items = [
    { label: 'All', href: '#', onClick: () => { } },
    { label: 'Developers', href: '#', onClick: () => { } },
    { label: 'Mini-Squads', href: '#', onClick: () => { } },
    { label: 'How to Hire', href: '#', onClick: () => { } },
    { label: 'Schedule Call', href: '#', onClick: openScheduleCallModal },
  ];

  const handleClick = (e: React.MouseEvent, label: string, onClick: any) => {
    e.preventDefault();
    if (label === "Schedule Call")
      onClick?.();
    else
      onSelect?.(label);
  };

  return (
    <div className={WorkCategoriesStyles['categories-wrap']} style={{ opacity: 1, transform: 'translateY(0px)' }}>
      {items.map((it) => (
        <div key={it.label} style={{ transform: 'translateX(0%) translateY(0%) rotate(0deg) translateZ(0px)' }}>
          <a
            className={`${WorkCategoriesStyles['category']} ${active === it.label ? WorkCategoriesStyles['is-active'] : ''}`}
            href={it.href}
            onClick={(e) => handleClick(e, it.label, it.onClick)}
          >
            {it.label}
          </a>
        </div>
      ))}
    </div>
  );
};
