export const layout = "/templates/directory.vto";

export default function* ({ search, paginate }) {
  const posts = search.pages("type=post draft=false", "published=desc");
  const options = {
    url: (n: number) => n == 1 ? `/pages/directory/` : `/pages/directory/${n}/`, // Óscar's suggestion
    size: 8,
  };

  for (const page of paginate(posts, options)) {
    yield page;
  }
}
