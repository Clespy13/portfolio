import rss from '@astrojs/rss';

import { formatPosts } from "../js/utils"

const postImportResult = import.meta.glob('./blog/**/*.md', { eager: true });
const posts = formatPosts(Object.values(postImportResult));

export async function GET(context) {
  return rss({
  stylesheet: '/rss/styles.xsl',
  title: 'My Blog',
  description: 'Clement Fabien\'s personal blog',
  site: context.site,
  items: posts.map((post) => ({
    link: post.url,
    title: post.frontmatter.title,
    pubDate: post.frontmatter.date,
    description: post.frontmatter.description,
    customData: `
      <author>${post.frontmatter.author}</author>
    `
  }))
  });
}
