import Link from 'next/link';
import * as postsService from '../../lib/posts';
import PostType from '../../lib/types/post';

interface PropTypes {
  post: PostType;
}

const Post = ({ post }: PropTypes) => (
  <div className="container mx-auto">
    <div className=" text-center font-black text-3xl m-12">
      <h1>{post.data.title}</h1>
    </div>
    <span>slug: {post.slug}</span>
    <div dangerouslySetInnerHTML={{ __html: post.content }} />
    <div className="hover:underline my-4">
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </div>
  </div>
);

export default Post;

export async function getStaticProps({ params: { slug } }) {
  const post = await postsService.getPostBySlug(slug);

  return {
    props: {
      post,
    },
  };
}

export function getStaticPaths() {
  const slugs = postsService.getPostSlugs();

  return {
    paths: slugs.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}
