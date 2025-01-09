/* TYPESCRIPT */
type Post = {
  title: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
};

function getTop3Post(posts: Post[]): { title: string; score: number }[] {
  // Tính điểm cho mỗi bài viết dựa trên công thức
  const scoredPosts = posts.map((post) => ({
    title: post.title,
    score: post.likeCount + post.commentCount * 3 + post.shareCount * 10,
  }));

  // Sắp xếp các bài viết theo điểm từ cao đến thấp
  scoredPosts.sort((a, b) => b.score - a.score);

  // Trả về top 3 bài viết có điểm cao nhất
  return scoredPosts.slice(0, 3);
}

const posts1: Post[] = [
  { title: "Phụ nữ hiện đại", likeCount: 10, commentCount: 5, shareCount: 2 },
  {
    title: "Người mẹ Việt Nam",
    likeCount: 20,
    commentCount: 10,
    shareCount: 5,
  },
  {
    title: "Những người phụ nữ tiên phong",
    likeCount: 5,
    commentCount: 2,
    shareCount: 1,
  },
  {
    title: "Phụ nữ trong công nghệ",
    likeCount: 18,
    commentCount: 12,
    shareCount: 7,
  },
  {
    title: "Sức mạnh của phụ nữ",
    likeCount: 8,
    commentCount: 7,
    shareCount: 4,
  },
];

console.log(getTop3Post(posts1));

const posts2: Post[] = [
  {
    title: "Sự kiên cường của phụ nữ",
    likeCount: 15,
    commentCount: 8,
    shareCount: 3,
  },
  { title: "Chị tôi", likeCount: 25, commentCount: 15, shareCount: 6 },
  {
    title: "Người bà yêu thương",
    likeCount: 5,
    commentCount: 4,
    shareCount: 1,
  },
];

console.log(getTop3Post(posts2));

const posts3: Post[] = [
  {
    title: "Sự kiên cường của phụ nữ",
    likeCount: 15,
    commentCount: 8,
    shareCount: 3,
  },
  { title: "Chị tôi", likeCount: 25, commentCount: 15, shareCount: 6 },
  {
    title: "Người bà yêu thương",
    likeCount: 5,
    commentCount: 4,
    shareCount: 1,
  },
];

console.log(getTop3Post(posts3));
