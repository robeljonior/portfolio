/**
 * Splits text into letters that rise in one after another (the name in the hero).
 * Screen readers get the plain text; the letters are hidden from them.
 */
export default function SplitText({ text, step = 35, start = 0 }: { text: string; step?: number; start?: number }) {
  let i = 0;
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, w) => (
          <span key={w} className="inline-block whitespace-nowrap">
            {[...word].map((ch) => (
              <span key={i} className="split-char" style={{ animationDelay: `${start + i++ * step}ms` }}>
                {ch}
              </span>
            ))}
            {w < text.split(" ").length - 1 && " "}
          </span>
        ))}
      </span>
    </>
  );
}
