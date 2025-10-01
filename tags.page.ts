export default function* ({ search }) {
    const allTags = search.values("tags");

    // Generate a page dynamically per tag
    for (const tag of allTags) {
        // Search all pages with this tag        
        const pages = search.pages(`'${tag}'`, "published=desc"); // Put quotes around tag to account for spaces.

        // Return the data of the new page.
        yield {
            title: `Posts tagged with \"${tag}\"`,
            url: `../tag/${tag}/`,
            pages: pages,
            tag: tag,
            type: "tag",
            layout: "/templates/tag.njk",
        };
    }
}
