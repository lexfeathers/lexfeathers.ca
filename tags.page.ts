export default function *({ search }) {
    const allTags = search.values("tags");
  
    // Generate a page dynamically per tag
    for (const tag of allTags) {
        // Search all pages with this tag
        const pages = search.pages(tag);
            
        // Return the data of the new page.
        yield {
            title: `Posts tagged with \"${tag}\"`,
            url: `../tag/${encodeURI(tag)}/`,
            pages: pages,
            tag: `${tag}`,
            type: "tag",
            layout: "/templates/tag.njk",
        }
    }
}
