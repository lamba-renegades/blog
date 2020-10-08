import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import markdownToHtml from './markdown-to-html';

const POSTS_FOLDER = 'content';

const postsDirectory = path.join(process.cwd(), POSTS_FOLDER);

export const getPostSlugs = () => {
  const postFiles = fs.readdirSync(postsDirectory);

  return postFiles.map((file) => file.replace(/\.md$/, ''));
};

export const getPostBySlug = async (slug: string) => {
  const postPath = path.join(postsDirectory, `${slug}.md`);
  const fileContent = fs.readFileSync(postPath, 'utf-8');

  const result = matter(fileContent);
  const content = await markdownToHtml(result.content);
  return { ...result, content };
};

export const getAllPosts = async (options: { limit: number }) => {
  const { limit = 10 } = options;

  const slugs = getPostSlugs();

  const posts = await Promise.all(slugs.map(getPostBySlug));

  return posts
    .map((post) => ({
      ...post,
      data: { ...post.data, date: new Date(post.data.date) },
    }))
    .sort((post1, post2) => (post1.data.date < post2.data.date ? -1 : 1))
    .slice(0, limit);
};
