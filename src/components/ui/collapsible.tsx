'use client';

import React, { useState } from 'react';
import type { ReactNode } from 'react';

interface CollapsibleProps {
  children: ReactNode;
  className?: ((state: boolean) => string) | string;
  defaultOpen?: boolean;
}

interface CollapsibleTriggerProps {
  children: ReactNode;
  className?: string;
}

interface CollapsibleContentProps {
  children: ReactNode;
}

const CollapsibleContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

function useCollapsible() {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error('Collapsible components must be used within a Collapsible');
  }
  return context;
}

export function Collapsible({
  children,
  className,
  defaultOpen = false,
  ...props
}: CollapsibleProps & React.HTMLAttributes<HTMLDivElement>) {
  const [open, setOpen] = useState(defaultOpen);

  const classNameValue = typeof className === 'function' 
    ? (className as (state: boolean) => string)(open) 
    : className;

  return (
    <CollapsibleContext.Provider value={{ open, setOpen }}>
      <div className={classNameValue} {...props}>
        {children}
      </div>
    </CollapsibleContext.Provider>
  );
}

export function CollapsibleTrigger({
  children,
  className,
  ...props
}: CollapsibleTriggerProps & React.HTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useCollapsible();

  return (
    <button
      className={className}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
    </button>
  );
}

export function CollapsibleContent({
  children,
}: CollapsibleContentProps) {
  const { open } = useCollapsible();

  if (!open) return null;

  return <>{children}</>;
}
