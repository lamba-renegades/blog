import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import * as posts from './posts';
import markdownToHtml from './markdown-to-html';

jest.mock('gray-matter');
jest.mock('./markdown-to-html');

const fileContent = `
---
title: 'test title'
excerpt: 'test exerpt'
---
`;

describe('posts', () => {
  test('getPostSlugs', () => {
    const result = ['test.md', 'test2.md'];

    const readdirFunction = jest.fn().mockReturnValue(result);
    jest.spyOn(fs, 'readdirSync').mockImplementation(readdirFunction);

    expect(posts.getPostSlugs()).toEqual(['test', 'test2']);
    expect(readdirFunction).toHaveBeenCalledWith(
      path.join(process.cwd(), 'content'),
    );
  });

  test('getPostBySlug', async () => {
    const title = 'title';
    const excerpt = 'excerpt';
    const slug = 'slug';
    const postPath = '/content/test.md';
    const content = '# title';
    const html = '<h1>title</h1>';

    const joinFunction = jest.fn().mockReturnValue(postPath);
    const readFileSyncFunction = jest.fn().mockReturnValue(fileContent);
    const matterFunction = jest
      .fn()
      .mockReturnValue({ data: { title, excerpt }, content });
    const markdownToHtmlFunction = jest.fn().mockResolvedValue(html);

    jest.spyOn(path, 'join').mockImplementation(joinFunction);
    jest.spyOn(fs, 'readFileSync').mockImplementation(readFileSyncFunction);
    matter.mockImplementation(matterFunction);
    markdownToHtml.mockImplementation(markdownToHtmlFunction);

    const post = await posts.getPostBySlug(slug);
    expect(post.data).toEqual({ title, excerpt });
    expect(matterFunction).toHaveBeenCalledWith(fileContent);
    expect(markdownToHtmlFunction).toHaveBeenCalledWith(content);
  });

  test('getAllPosts', async () => {
    const html = '<h1>title</h1>';
    const title1 = 'title 1';
    const title2 = 'title 2';
    const title3 = 'title 3';

    const date1 = new Date('2020-03-18T05:35:07.322Z');
    const date2 = new Date('2020-01-16T05:35:07.322Z');
    const date3 = new Date('2020-03-19T05:35:07.322Z');

    const matterFunction = jest
      .fn()
      .mockReturnValueOnce({ data: { title: title1, date: date1 } })
      .mockReturnValueOnce({ data: { title: title2, date: date2 } })
      .mockReturnValue({ data: { title: title3, date: date3 } });
    const markdownToHtmlFunction = jest.fn().mockResolvedValue(html);

    matter.mockImplementation(matterFunction);
    markdownToHtml.mockImplementation(markdownToHtmlFunction);

    const result = await posts.getAllPosts({ limit: 2 });
    expect(result).toEqual([
      { data: { title: title2, date: date2 }, slug: 'test2', content: html },
      { data: { title: title1, date: date1 }, slug: 'test', content: html },
    ]);
  });
});
