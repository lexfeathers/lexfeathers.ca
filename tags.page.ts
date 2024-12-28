export default function *({ search }) {
    const allTags = search.values("tags");
  
    // Generate a page dynamically per tag
    for (const tag of allTags) {
      // Search all pages with this tag
      const pages = search.pages(tag);
      
      // Return the data of the new page.
      yield {
        title: `Pages tagged as ${tag}`,
        url: `../tag/${tag}/`,
        pages: pages,
        tag: `${tag}`,
        layout: "/templates/tag.njk"
      }
    }
  }
