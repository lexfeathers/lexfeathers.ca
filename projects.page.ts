export const layout = "/templates/portfolio.njk";

export default function* ({ search, paginate }) {
  const projects = search.pages("type=projects", "published=desc");
  const options = {
    url: (n) => `/projects/${n}/`,
    size: 12,
  };

  for (const page of paginate(projects, options)) {
    yield page;
  }
}