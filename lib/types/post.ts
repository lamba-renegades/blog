interface PostType {
  slug: string;
  data: {
    title: string;
    date: string;
    excerpt: string;
    coverImage: string;
    author: {
      name: string;
      picture: string;
    };
  };
  content: string;
}

export default PostType;
