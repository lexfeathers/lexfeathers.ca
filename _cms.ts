import lumeCMS from "lume/cms/mod.ts";
import GitHub from "lume/cms/storage/github.ts";

// Get authentication environment variables from Deno
const username = Deno.env.get("USERNAME") || "admin";
const password = Deno.env.get("PASSWORD") || "default";

// Get current date in YYYY-MM-DD format
const humanDate = new Date();
humanDate.toLocaleString('en-US', { timeZone: 'America/New_York' })
const formattedDate = humanDate.toISOString().split('T')[0].replace(/-/g, '-');

// Create the cms instance
const cms = lumeCMS({
	site: {
		name: "Lex Feathers",
		url: "https://lexfeathers.ca",
	}, 
	auth: {
		method: "basic",
		users: {
			[username]: password,
		},
	},
});

// Create file system
// cms.storage("src", "/");
// deno-lint-ignore no-explicit-any
const token: any = Deno.env.get("GITHUB_TOKEN");
cms.storage(
  "src",
  GitHub.create("lexfeathers/lexfeathers.ca", token),
);

// Create "posts" collection
// using src storage
cms.collection({
  name: "posts",
  store: "src:posts/*.md",
  fields: [
    {
      name: "title",
      type: "text",
      description: "Leave blank to use published date",
      value: formattedDate,
    },
    {
      name: "author",
      type: "text",
      value: "Lex Feathers"
    },
    {
      name: "draft",
      type: "checkbox",
    },
    {
      name: "comments",
      type: "checkbox",
    },    
    {
      name: "published",
      type: "datetime",
      label: "Published date",
      value: new Date(),
      description: "Set a future date if you want to publish it later",
    },
    {
      name: "image",
      type: "file",
      upload: "uploads",
    },
    {
      name: "image_caption",
      type: "text",
      label: "Image caption",
    },
    {
      name: "image_alt",
      type: "text",
      label: "Image alt (leave blank to use Image caption)",
    },
    {
      name: "content_warnings",
      type: "list",
    },
    {
      name: "content",
      type: "markdown",
    },
    {
      name: "tags",
      type: "list",
      description: "Separate words with hyphens",
    },
    {
      name: "excerpt",
      type: "textarea",
      description: "Used on the front page",
      attributes: {
        maxlength: 800
      }
    },
  ],
  documentName: "{title}.md",
});
// Create "pages" collection
// using src storage
cms.collection({
  name: "pages", 
  store: "src:pages/*.md", 
  fields: [
    "title: text",
    {
      name: "draft",
      type: "checkbox",
    },
    "content: markdown",
  ],
  documentName: "title",
});
// Create "smosts" collection
// using src storage
cms.collection({
  name: "transients", 
  store: "src:smosts/*.md", 
  fields: [
    {
      name: "published",
      type: "datetime",
      label: "Published date",
      value: new Date(),
      description: "Set a future date if you want to publish it later"
    },
    {
      name: "draft",
      type: "checkbox"
    },
	{
		name: "smost_content",
		type: "text",
	}
  ],
  documentName: "{title}.md",
});


// Edit the index contents
cms.document({
	name: "index", 
	store: "src:index.vto", 
	fields: [
		"content: markdown",
		{
			name: "image",
			label: "Banner image",
			type: "file",
			uploads: "uploads",
		}
	]
}); 

// Edit the stylesheet
cms.document(
	"stylesheet: Edit the CSS for the site", 
	"src:assets/styles.css", 
	[
		"content: markdown",
	]
);

// Configure a folder to upload files
cms.upload(
	"uploads: upload to this for use in posts/pages", 
	"src:uploads",
);

// Site settings
cms.document({
	name: "settings: Global settings for the site",
	store: "src:_data.json",
});

// 6. Export the cms configuration
export default cms;
