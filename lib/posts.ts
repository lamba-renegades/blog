import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import markdownToHtml from './markdown-to-html';

const POSTS_FOLDER = 'content';

const postsDirectory = path.join(process.cwd(), POSTS_FOLDER);

const sortDates = (stringDateA: string, stringDateB: string): number => {
  const dateA = new Date(stringDateA);
  const dateB = new Date(stringDateB);

  return dateA < dateB ? -1 : 1;
};

export const getPostSlugs = (): Array<string> => {
  const postFiles = fs.readdirSync(postsDirectory);

  return postFiles.map((file) => file.replace(/\.md$/, ''));
};

export const getPostBySlug = async (slug: string) => {
  const postPath = path.join(postsDirectory, `${slug}.md`);
  const fileContent = fs.readFileSync(postPath, 'utf-8');

  const result = matter(fileContent);
  const { data } = result;
  const content = await markdownToHtml(result.content);

  return { slug, content, data };
};

export const getAllPosts = async (options: { limit: number }) => {
  const { limit = 10 } = options;

  const slugs = getPostSlugs();

  const posts = await Promise.all(slugs.map(getPostBySlug));

  return posts
    .sort((post1, post2) => sortDates(post1.data.date, post2.data.date))
    .slice(0, limit);
};
