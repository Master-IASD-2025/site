# Blog Content Structure

This directory contains all blog content that will be served dynamically.

## Structure

```
src/lib/blog/
├── BlogIndex.json          # Manifest of all posts
├── post-slug-1.md         # Post content
├── post-slug-2.md         # Post content
└── ...
```

## GitHub Integration

When you push this to GitHub, the blog system will automatically fetch content from:

```
https://raw.githubusercontent.com/Master-IASD-2025/site/master/src/lib/blog/
```

## Configuration

Update the GitHub configuration in `src/lib/services/blog.ts`:

```typescript
const GITHUB_OWNER = "Master-IASD-2025";
const GITHUB_REPO = "site";
const GITHUB_BRANCH = "master";
const BLOG_PATH = "src/lib/blog";
```

## Adding New Posts

1. Create a new Markdown file (e.g., `my-new-post.md`)
2. Add an entry to `BlogIndex.json`:

```json
{
  "slug": "my-new-post",
  "title": "My New Post",
  "excerpt": "Brief description...",
  "author": "Your Name",
  "date": "2026-01-26",
  "readTime": "5 min read",
  "category": "Category Name",
  "tags": ["tag1", "tag2"],
  "featured": false,
  "published": true
}
```

3. Commit and push to GitHub
4. Content will be live immediately (no rebuild needed!)

## Local Development

In development, files are served from the local filesystem at `/src/lib/blog/`.

## Production

In production, files are fetched from the GitHub raw content URL.

The system includes:
- Automatic caching (localStorage + memory)
- Error handling for missing content
- SEO-friendly metadata
- Loading states
