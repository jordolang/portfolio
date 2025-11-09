"use client";

import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MDXComponents } from './MDXComponents';

interface MDXContentProps {
  content: string;
}

export default function MDXContent({ content }: MDXContentProps) {
  const renderedContent = useMemo(() => {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        components={MDXComponents as any}
      >
        {content}
      </ReactMarkdown>
    );
  }, [content]);

  return <>{renderedContent}</>;
}
