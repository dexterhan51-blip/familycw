const WP_API =
  "https://wordpress-1568541-6194044.cloudwaysapps.com/wp-json/wp/v2";

const SITE_URL = "https://family.kimnpartners-law.com";

export default async function sitemap() {
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  let posts = [];
  try {
    const res = await fetch(`${WP_API}/posts?per_page=100&_embed`, {
      next: { revalidate: 300 },
    });
    if (res.ok) {
      posts = await res.json();
    }
  } catch {
    // WordPress API 실패 시 정적 페이지만 반환
  }

  const blogPosts = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...blogPosts];
}
