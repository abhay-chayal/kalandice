// Structured data for search engines. The payload is built by us from CMS
// content, never from visitor input, so stringifying it here is safe — the
// escape guards against a "</script>" sequence inside any text field.
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
