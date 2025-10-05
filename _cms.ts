import lumeCMS from "lume/cms/mod.ts";
import GitHub from "lume/cms/storage/github.ts";
import { title } from "node:process";
import { Octokit } from "npm:octokit";
// import _fields from "lume/cms/fields/core.ts";

// Create authentication environment variables
const username = Deno.env.get("USERNAME") || "admin";
const password = Deno.env.get("PASSWORD") || "default";

// Set site time zone
// Timezone codes can be found at https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
// Deno.env.set("TZ", "US/Eastern");

// Get current date in YYYY-MM-DD format
const humanDate = new Date();
humanDate.toLocaleString('en-US', { timeZone: 'America/New_York' })
const formattedDate = humanDate.toISOString().split('T')[0].replace(/-/g, '-');
const formattedDateTime = humanDate.toISOString().replace(/-/g, '-');

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
  // extraHead: `
  //   <style>
  //     [data-theme="dark"] {
  //       --color-black: hsl(220, 0%, 15%);
  //       --color-text: hsl(220, 0%, 90%);
  //       --color-dim: hsl(220, 0%, 60%);
  //       --color-line: hsl(220, 0%, 20%);
  //       --color-line-light: hsl(220, 0%, 15%);
  //       --color-highlight: hsl(220, 0%, 18%);
  //       --color-background: hsl(220, 0%, 10%);
  //       --color-input-text: var(--color-white);
  //       --color-input-bg: var(--color-black);

  //       /* Brand colors */
  //       --color-primary: hsl(0, 50%, 45%);
  //       --color-primary-highlight: hsl(0, 50%, 35%);

  //       /* Code colors */
  //       --color-code-4: hsl(220, 20%, 50%);
  //       --color-code-5: hsl(0, 88%, 65%);
  //       --color-code-a: hsl(290, 100%, 40%);
  //       --color-code-b: hsl(290, 90%, 70%);
  //       --color-code-c: #2913c0;
  //       --color-code-d: hsl(155, 75%, 50%);
  //       --color-code-e: #bf4040;
  //       --color-code-f: hsl(17, 100%, 63%);
  //       --color-code-g: #00f;
  //       --color-code-h: hsl(220, 100%, 65%);
  //       --color-code-i: #0e8759;
  //       --color-code-j: #167;
  //       --color-code-k: #256;
  //       --color-code-l: #00c;
  //       --color-code-m: #940;
  //       --color-code-n: hsl(220, 20%, 80%);
  //     }
  //     .header-description {
  //       margin: 1rem 0;
  //     }
  //     .header-description a {
  //       background-color: var(--color-highlight);
  //       padding: 8px;
  //       border-radius: 4px;
  //       font-weight: bold;
  //     }
  //     /* #logoutButton {
  //       background: var(--color-code-e);
  //       color: white;
  //     }*/
  //     .app-footer {
  //       justify-content: space-evenly;
  //     }
  //   </style>
  //   `,
});

// Create file system
// cms.storage("my_fs", "/");
cms.storage(
  "my_fs",
  new GitHub({
    client: new Octokit({ auth: Deno.env.get("GITHUB_TOKEN") }),
    owner: "lexfeathers",
    repo: "lexfeathers.ca",
  }),
);

// Create "posts" collection
// using my_fs storage
cms.collection({
  name: "posts",
  store: "my_fs:posts/*.md",
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
      // attributes: {
      //   placeholder: "For example: 2024-01-01 00:00:01",
      // },
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
// using my_fs storage
cms.collection({
  name: "pages", 
  store: "my_fs:pages/*.md", 
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
// using my_fs storage
cms.collection({
  name: "transients", 
  store: "my_fs:smosts/*.md", 
  fields: [
    {
      name: "title",
      type: "text",
      value: formattedDateTime,
      description: "Leave blank to use date"
    },
    {
      name: "published",
      type: "datetime",
      label: "Published date",
      value: humanDate,
      description: "Set a future date if you want to publish it later"
    },
    {
      name: "draft",
      type: "checkbox"
    },
    "content: markdown",
  ],
  documentName: "{title}.md",
});

// Site settings
cms.document(
  "settings: Global settings for the site",
  "my_fs:_data.yml",
  [
    {
      name: "website",
      type: "object",
      description: "Key details about this site",
      fields: [
        {
          name: "site_title",
          type: "text",
          label: "Site name",
          description: "Name of the website",
        },
        {
          name: "show_sidebar_transients",
          type: "checkbox",
          label: "Show latest transient on sidebar?",
        },
      ],
    },
    {
      name: "footer_links",
      type: "object-list",
      description: "Links that appear in the footer",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Title",
        },
        {
          name: "url",
          type: "text",
          label: "URL",
        },
      ],
    },
    {
      name: "extra_head",
      type: "code",
      description: "Extra content to include in the <head> tag",
    },
  ],
);

// Edit the index contents
cms.document(
  "Index: Edit the homepage", 
  "my_fs:index.njk", 
  [
    "type: code",
    "content: markdown",
  ],
  [
    "name: image",
    "type: file",
    "uploads: uploads",
  ]
);

// Edit the stylesheet
cms.document(
  "stylesheet: Edit the CSS for the site", 
  "my_fs:assets/styles.css", 
  [
    "content: markdown",
  ]
);

// Configure a folder to upload files
cms.upload(
  "uploads: upload to this for use in posts/pages", 
  "my_fs:uploads",
);

// 6. Export the cms configuration
export default cms;
