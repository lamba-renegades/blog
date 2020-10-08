import Head from 'next/head';

import * as postsService from '../lib/posts';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Title</h1>

        <p>sample content...</p>
      </main>

      <footer>footer...</footer>
    </div>
  );
}

export function getStaticProps() {
  const posts = postsService.getAllPosts({ limit: 10 });

  return {
    props: { posts },
  };
}
