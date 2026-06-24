interface SectionHeadingProps {
  title: string;
  centered?: boolean;
}

export default function SectionHeading({ title, centered = false }: SectionHeadingProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <div className={`mt-2 h-1 w-12 bg-indigo-600 rounded-full ${centered ? "mx-auto" : ""}`} />
    </div>
  );
}
