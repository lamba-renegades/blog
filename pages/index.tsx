import Head from 'next/head';

import PostType from '../lib/types/post';
import * as postsService from '../lib/posts';

export default function Home({ posts }: { posts: Array<PostType> }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Title</h1>

        <h2>Content</h2>
        <hr />
        {posts.map((post) => (
          <div key={post.slug}>
            <h3>{post.data.title}</h3>
            <span>post.data.date</span>
            <span>post.data.author.name</span>
            <p>{post.data.excerpt}</p>
          </div>
        ))}
      </main>

      <footer>footer...</footer>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await postsService.getAllPosts({ limit: 10 });

  return {
    props: {
      posts,
    },
  };
}
