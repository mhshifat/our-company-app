import { Fragment } from "react";

const EMAIL_RE = /([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;

/**
 * Renders plain text while turning bare email addresses into mailto: links.
 * Used for CMS-driven legal copy where we can't ship inline HTML.
 */
export function LinkifiedText({ text }: { text: string }) {
  const parts = text.split(EMAIL_RE);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 1) {
          return (
            <a
              key={i}
              href={`mailto:${part}`}
              className="font-medium text-cyan-300 hover:text-cyan-200"
            >
              {part}
            </a>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
