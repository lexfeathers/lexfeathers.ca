export const layout = "/templates/directory.njk";

export default function* ({ search, paginate }) {
  const posts = search.pages("posts");
  const options = {
    url: (n) => `/page/${n}/`,
    size: 10,
  };

  for (const page of paginate(posts, options)) {
    yield page;
  }
}