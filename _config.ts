import lume from "@lumeland/lume";
import esbuild from "@lumeland/plugin-esbuild";
import postcss from "@lumeland/plugin-postcss";
import favicon from "@lumeland/plugin-favicon";
import sitemap from "@lumeland/plugin-sitemap";
import date from "@lumeland/plugin-date";
import metas from "@lumeland/plugin-metas";
import feed from "@lumeland/plugin-feed";
import pagefind from "@lumeland/plugin-pagefind";
import footnote from "markdown-it-footnote";
import implicitFigures from "markdown-it-implicit-figures";
import extractDate from "@lumeland/plugin-extract-date";
import codeHighlight from "@lumeland/plugin-code-highlight";
import inline from "@lumeland/plugin-inline";
import icons from "@lumeland/plugin-icons";
import googleFonts from "@lumeland/plugin-google-fonts";
import { alert } from "@mdit/plugin-alert";
import { v4 as uuidv4 } from "uuid";

// Pass options to markdown-it plugins

const site = lume(
	{
		location: new URL("https://lexfeathers.ca"),
		cssFile: "/style.css",
		jsFile: "/script.js",
	},
	{
		markdown: {
			plugins: [
				footnote,
				[
					alert,
					{
						deep: true,
					},
				],
				[
					implicitFigures,
					{
						dataType: true,
						lazy: true,
						async: true,
						figcaption: "alt",
						link: false,
					},
				],
			],
		},
	},
);

site.data("uuidv4", function () {
	return uuidv4();
});

site.add([".css"]);
site.add("/assets/"); // Include assets in the build
site.add("/uploads/"); // Include uploads in the build

site.use(esbuild());
site.use(
	googleFonts({
		fonts: "https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap",
	}),
);
site.use(postcss());

// Create the lastmod variable with the mtime of the file
site.preprocess([".html"], (pages) => {
	for (const page of pages) {
		const info = page.src.entry?.getInfo();
		page.data.lastmod = info?.mtime;
	}
});

site.use(
	icons({
		folder: "/assets/images/icons",
	}),
);
site.use(extractDate());
site.use(
	codeHighlight({
		theme: {
			name: "base16/seti-ui", // The theme name to download
			cssFile: "/code-styles.css", // The destination filename
			placeholder: "/* insert-theme-here */", // Optional placeholder to replace with the final code
		},
	}),
);
site.use(
	favicon({
		input: "/assets/favicon.ico",
	}),
);
site.use(
	sitemap({
		filename: "sitemap.xml", // to change the sitemap filename
		sort: "published=desc", // To sort by data in ascendent order
		// lastmod: "=lastmod",
		stylesheet: "/assets/linked.xslt",
	}),
);
site.use(
	date({
		formats: {
			MDY: "M/d/yyyy",
		},
	}),
);
site.use(metas());
site.use(inline());
site.use(
	feed({
		output: ["/feed.rss"],
		query: "type=post",
		sort: "published=desc",
		info: {
			title: "Lex Feathers",
			description: "music and ideas",
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
			content: "$article.post",
			lang: "en",
			image: "=image", // The image of the item
			authorName: "=author",
			authorUrl: "https://lexfeathers.ca",
		},
	}),
);
site.use(
	feed({
		output: ["/portfolio.rss"],
		query: "type=project",
		sort: "published=desc",
		info: {
			title: "Lex Feathers - Portfolio",
			description: "My work in music, web and gamedev",
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
			content: "$article.post",
			lang: "en",
			image: "=thumbnail", // The image of the item
			authorName: "Lex Feathers",
			authorUrl: "https://lexfeathers.ca/portfolio",
		},
	}),
);
site.use(
	pagefind({
		componentUI: {
			cssFile: "/assets/search-styles.css",
			jsFile: "/assets/search-scripts.js",
		},
		indexing: {
			rootSelector: "#content",
			verbose: false,
		},
	}),
);

export default site;
