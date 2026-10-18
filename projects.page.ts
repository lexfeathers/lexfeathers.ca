export const layout = "/templates/portfolio.vto";

export default function* ({ search, paginate }) {
  const projects = search.pages("type=project draft=false", "published=desc");
  const options = {
    url: (n: number) => n == 1 ? `/portfolio/` : `/portfolio/${n}/`, // Óscar's suggestion
    size: 6,
  };

  for (const page of paginate(projects, options)) {
    yield page;
  }
}
