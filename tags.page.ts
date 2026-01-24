export default function* ({ search }: any) {
    const allTags = search.values("tags");

    // Generate a page of posts dynamically per tag
    for (const tag of allTags) {
        // Get all pages with this tag        
        const pages = search.pages(`'${tag}'`, "published=desc"); // Put quotes around tag to account for spaces.

        // Return the data of the new page.
        yield {
            title: `Posts tagged with \"${tag}\"`,
            url: `../tag/${tag}/`,
            pages: pages,
            tag: tag,
            type: "tag",
            layout: "partials/tag.vto",
        };
    }
}
