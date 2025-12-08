export const layout = "/templates/portfolio.vto";

export default function* ({ search, paginate }) {
  const projects = search.pages("type=projects", "published=desc");
  const options = {
    url: (n) => n == 1 ? `/portfolio/` : `/portfolio/${n}/`, // Óscar's suggestion
    size: 6,
  };

  for (const page of paginate(projects, options)) {
    yield page;
  }
}
