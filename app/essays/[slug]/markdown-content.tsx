'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="essay-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-[1.75rem] font-bold text-[#0B1B2B] mt-12 mb-6 leading-tight md:text-[2rem]">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-[1.5rem] font-bold text-[#0B1B2B] mt-10 mb-5 leading-tight md:text-[1.75rem]">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-[1.25rem] font-bold text-[#0B1B2B] mt-8 mb-4 leading-tight">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-[16px] leading-[1.8] text-[#475569] mb-6 md:text-[17px]">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-[#0B1B2B]">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-[#64748B]">
              {children}
            </em>
          ),
          a: ({ href, children }) => (
            <a 
              href={href} 
              className="text-[#0284C7] font-medium hover:text-[#0369A1] underline underline-offset-2 transition-colors"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside ml-5 mb-6 space-y-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside ml-5 mb-6 space-y-2">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-[15px] leading-[1.7] text-[#475569] pl-1">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#0284C7] pl-5 py-2 my-8 bg-[#F0F9FF] rounded-r-lg">
              <div className="text-[15px] leading-[1.7] text-[#475569] italic">
                {children}
              </div>
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="bg-[#F1F5F9] text-[#0B1B2B] px-1.5 py-0.5 rounded text-[13px] font-mono">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-[#0B1B2B] text-[#E2E8F0] p-5 rounded-xl overflow-x-auto mb-6 text-[13px] leading-relaxed font-mono">
              {children}
            </pre>
          ),
          hr: () => (
            <hr className="my-10 border-[#E2E8F0]" />
          ),
          img: ({ src, alt }) => (
            <div className="my-8">
              <img 
                src={src} 
                alt={alt || ''} 
                className="w-full rounded-2xl"
              />
            </div>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#F8FAFC]">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="text-left px-4 py-3 text-[13px] font-semibold text-[#0B1B2B] uppercase tracking-wider border-b border-[#E2E8F0]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-[14px] text-[#475569] border-b border-[#F1F5F9]">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}