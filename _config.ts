import lume from "lume/mod.ts";
import nunjucks from "lume/plugins/nunjucks.ts";
import favicon from "lume/plugins/favicon.ts";
import sitemap from "lume/plugins/sitemap.ts";
import date from "lume/plugins/date.ts";
import metas from "lume/plugins/metas.ts";
import feed from "lume/plugins/feed.ts";
import pagefind from "lume/plugins/pagefind.ts";
import footnote from "npm:markdown-it-footnote";
import implicitFigures from "npm:markdown-it-image-figures";
import extractDate from "lume/plugins/extract_date.ts";
// import picture from "lume/plugins/picture.ts";
// import transformImages from "lume/plugins/transform_images.ts";
import googleFonts from "lume/plugins/google_fonts.ts";
 
// Pass options to markdown-it plugins
const markdown = {
  plugins: [
    footnote,
    [implicitFigures, {
      lazy: true,
      async: true,
      figcaption: "alt",
      link: true,
    }],
  ],
};

const site = lume({
  location: new URL("https://lexfeathers.ca"),
}, 
{ markdown }
);
site.use(nunjucks());

site.add([".css"]);
site.add("/assets/"); // Iclude assets in the build
site.add("/uploads/"); // Iclude assets in the build

// Create the lastmod variable with the mtime of the file
site.preprocess([".html"], (pages) => {
  for (const page of pages) {
    const info = page.src.entry?.getInfo();
    page.data.lastmod = info?.mtime;
  }
});

site.use(extractDate());
site.use(googleFonts({
  fonts:
    "https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap",
}));
site.use(favicon({
  input: "/assets/favicon.ico",
}));
site.use(sitemap({
  filename: "sitemap.xml", // to change the sitemap filename
  sort: "published=desc", // To sort by data in ascendent order
  lastmod: "=lastmod",
  stylesheet: "/assets/linked.xslt"
}));
site.use(date({
  formats: {
    "MDY": "M/d/yyyy",
  },
}));
site.use(metas());
site.use(feed({
  output: ["/feed.rss"],
  query: "type=posts",
  sort: "published=desc",
  info: {
    title: "Lex Feathers",
    description:
      "music and ideas",
    authorName: "=author",
    authorUrl: "https://lexfeathers.ca",
    lang: "en",
    generator: true,
    icon: "/assets/favicon.ico",
    color: "#ff993a",
  },
  items: {
    title: "=title",
    description: "=excerpt",
    published: "=published",
    updated: undefined,
    content: "$article.post || =children",
    lang: "en",
    image: "=image", // The image of the item
    authorName: "=author",
    authorUrl: site.location,
  },
}));
// site.use(picture());
// site.use(transformImages({
//   extensions: [".gif", ".jpg", ".jpeg", ".png", ".webp"]
// }));
site.use(pagefind({
  ui: {
    containerId: "search",
    showImages: true,
    showEmptyFilters: true,
    resetStyles: true,
  },
  indexing: {
    rootSelector: "#content",
    verbose: false,
  },
}));

export default site;
