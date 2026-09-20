import { RichText } from '@payloadcms/richtext-lexical/react';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

/** Render a Payload Lexical rich-text field, or nothing when empty. */
export function RichTextBlock({ data, className }: { data: unknown; className?: string }) {
  if (!data) return null;
  return (
    <div className={`markdown-body ${className ?? ''}`}>
      <RichText data={data as SerializedEditorState} />
    </div>
  );
}
