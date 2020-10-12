import * as postsService from '../../lib/posts';
import PostType from '../../lib/types/post';

interface PropTypes {
  post: PostType;
}

const Post = ({ post }: PropTypes) => (
  <div>
    <h1>{post.data.title}</h1>
    <span>slug: {post.slug}</span>
    <div dangerouslySetInnerHTML={{ __html: post.content }} />
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
