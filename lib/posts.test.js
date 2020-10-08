import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import * as posts from './posts';

jest.mock('gray-matter');

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

  test('getPostBySlug', () => {
    const title = 'title';
    const excerpt = 'excerpt';
    const slug = 'slug';
    const postPath = '/content/test.md';

    const joinFunction = jest.fn().mockReturnValue(postPath);
    const readFileSyncFunction = jest.fn().mockReturnValue(fileContent);
    const matterFunction = jest
      .fn()
      .mockReturnValue({ data: { title, excerpt } });

    jest.spyOn(path, 'join').mockImplementation(joinFunction);
    jest.spyOn(fs, 'readFileSync').mockImplementation(readFileSyncFunction);
    matter.mockImplementation(matterFunction);

    const post = posts.getPostBySlug(slug);
    expect(post.data).toEqual({ title, excerpt });
    expect(matterFunction).toHaveBeenCalledWith(fileContent);
  });

  test('getAllPosts', () => {
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

    matter.mockImplementation(matterFunction);

    const result = posts.getAllPosts({ limit: 2 });
    expect(result).toEqual([
      { data: { title: title2, date: date2 } },
      { data: { title: title1, date: date1 } },
    ]);
  });
});
