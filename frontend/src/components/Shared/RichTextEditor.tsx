'use client';

import { useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

// Quill relies on the DOM, so it must be loaded client-side only.
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * Simple WYSIWYG rich text editor built on top of Quill.
 * Produces sanitized-ready HTML string via onChange.
 */
export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  // useRef so the config objects aren't re-created (and editor re-mounted) every render
  const modules = useRef({
    toolbar: [
      [{ header: [2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'link'],
      [{ align: [] }],
      ['clean'],
    ],
  }).current;

  const formats = useMemo(
    () => [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'list',
      'bullet',
      'blockquote',
      'link',
      'align',
    ],
    []
  );

  return (
    <div className="rich-text-editor bg-white rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-yellow-600 focus-within:border-transparent">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
}
