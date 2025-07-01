export const layout = "/templates/portfolio.njk";

export default function* ({ search, paginate }) {
  const posts = search.pages("type=projects", "published=desc");
  const options = {
    url: (n) => `/portfolio/page-${n}/`,
    size: 12,
  };

  for (const page of paginate(posts, options)) {
    yield page;
  }
}