export function ContentBlockComponent({ heading, body }: { heading?: string; body?: string }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      {heading && <h2 className="mb-4 text-2xl font-bold">{heading}</h2>}
      {body && <p className="whitespace-pre-line leading-relaxed">{body}</p>}
    </section>
  )
}
