'use client';

import { ChevronDown } from 'lucide-react';
import type { TOCItemType } from 'fumadocs-core/toc';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export interface InlineTocWithTitleProps extends Omit<ComponentProps<typeof Collapsible>, 'children'> {
  items: TOCItemType[];
  title?: string;
}

export function InlineTOCWithTitle({ 
  items, 
  className, 
  title = 'Table of Contents', 
  ...props 
}: InlineTocWithTitleProps) {
  const classNameFn = (s: boolean): string => {
    const classNameStr = typeof className === 'function' 
      ? (className as (state: boolean) => string)(s) 
      : (className as string | undefined) || '';
    return cn(
      'not-prose rounded-lg border bg-fd-card text-fd-card-foreground',
      classNameStr,
    );
  };

  return (
    <Collapsible
      {...props}
      className={classNameFn as any}
    >
      <CollapsibleTrigger className="group inline-flex w-full items-center justify-between px-4 py-2.5 font-medium">
        {title}
        <ChevronDown className="size-4 transition-transform duration-200 group-data-[open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col p-4 pt-0 text-sm text-fd-muted-foreground">
          {items.map((item) => (
            <a
              key={item.url}
              href={item.url}
              className="border-s py-1.5 hover:text-fd-accent-foreground"
              style={{
                paddingInlineStart: 12 * Math.max(item.depth - 1, 0),
              }}
            >
              {item.title}
            </a>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
