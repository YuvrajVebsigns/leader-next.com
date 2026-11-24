type PageHeroCardProps = {
  kicker: string;
  title: string;
  description: string;
};

export default function PageHeroCard({ kicker, title, description }: PageHeroCardProps) {
  return (
    <section className="winners-detail-card">
      <p className="winners-kicker">{kicker}</p>
      <h1>{title}</h1>
      <p className="winners-detail-summary">{description}</p>
    </section>
  );
}
