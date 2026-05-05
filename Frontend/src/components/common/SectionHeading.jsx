function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const alignment = align === "center" ? "text-center mx-auto" : "";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow ? <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-600">{eyebrow}</p> : null}
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base text-slate-600 md:text-lg">{description}</p> : null}
    </div>
  );
}

export default SectionHeading;
