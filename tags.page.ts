export default function *({ search }) {
    const allTags = search.values("tags");
  
    // Generate a page dynamically per tag
    for (const tag of allTags) {
        // Search all pages with this tag
        const pages = search.pages(tag);
        // Replace spaces in tags with hyphens
        let encodedTag = tag;
        encodedTag = encodedTag.trim().replace(/\s+/g, '-').toLowerCase();
            
        // Return the data of the new page.
        yield {
            title: `Posts tagged with \"${tag}\"`,
            url: `../tag/${encodedTag}/`,
            pages: pages,
            tag: `${tag}`,
            layout: "/templates/tag.njk",
        }
    }
}
