<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import Button from "$lib/components/ui/button/button.svelte";
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import {
    Calendar,
    Clock,
    ArrowRight,
    Search,
    Tag,
    User,
  } from "@lucide/svelte";

  const posts = [
    {
      title: "Getting Started with Machine Learning Pipelines",
      excerpt:
        "Learn how to build production-ready ML pipelines using modern tools and best practices. We cover data preprocessing, model training, and deployment strategies.",
      author: "Sarah Bennani",
      date: "2026-01-20",
      readTime: "8 min read",
      category: "Machine Learning",
      tags: ["ML", "Python", "MLOps"],
      featured: true,
    },
    {
      title: "Natural Language Processing for Moroccan Darija",
      excerpt:
        "Exploring the challenges and opportunities in building NLP models for Moroccan Arabic dialect. A deep dive into our research project.",
      author: "Youssef Alami",
      date: "2026-01-15",
      readTime: "12 min read",
      category: "Research",
      tags: ["NLP", "Darija", "Research"],
      featured: true,
    },
    {
      title: "Data Visualization Best Practices",
      excerpt:
        "Create compelling and insightful data visualizations that tell a story. Tips and techniques from our data science team.",
      author: "Fatima Zahra",
      date: "2026-01-10",
      readTime: "6 min read",
      category: "Data Science",
      tags: ["Visualization", "Python", "D3.js"],
      featured: false,
    },
    {
      title: "Building Scalable AI Systems",
      excerpt:
        "Architecture patterns and infrastructure considerations for deploying AI systems at scale. Lessons learned from production deployments.",
      author: "Ahmed El Idrissi",
      date: "2026-01-05",
      readTime: "10 min read",
      category: "Engineering",
      tags: ["Architecture", "DevOps", "AI"],
      featured: false,
    },
    {
      title: "Computer Vision: From Theory to Practice",
      excerpt:
        "A practical guide to implementing computer vision solutions. We walk through real-world examples and code implementations.",
      author: "Imane Chakir",
      date: "2025-12-28",
      readTime: "15 min read",
      category: "Computer Vision",
      tags: ["CV", "PyTorch", "Deep Learning"],
      featured: false,
    },
    {
      title: "Contributing to Open Source AI Projects",
      excerpt:
        "How to get started with open source contributions in the AI space. A beginner's guide with practical tips and resources.",
      author: "Mehdi Tazi",
      date: "2025-12-20",
      readTime: "7 min read",
      category: "Community",
      tags: ["Open Source", "Git", "Collaboration"],
      featured: false,
    },
  ];

  const categories = [
    "All",
    "Machine Learning",
    "Research",
    "Data Science",
    "Engineering",
    "Computer Vision",
    "Community",
  ];

  let selectedCategory = $state("All");
  let searchQuery = $state("");

  const filteredPosts = $derived(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  });

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
</script>

<div class="flex min-h-screen flex-col">
  <!-- Hero Section -->
  <section
    class="relative overflow-hidden border-b border-border/40 py-20 md:py-28"
  >
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div
        class="absolute left-1/3 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"
      ></div>
    </div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <h1
          class="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          Community <span class="text-primary">Blog</span>
        </h1>
        <p class="mb-10 text-lg text-muted-foreground md:text-xl">
          Insights, tutorials, and research from our AI & Data Science
          community. Learn, share, and grow together.
        </p>

        <!-- Search Bar -->
        <div class="relative mx-auto max-w-2xl">
          <Search
            class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search articles..."
            bind:value={searchQuery}
            class="w-full rounded-xl border border-border/60 bg-background/50 py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- Categories -->
  <section class="border-b border-border/40 bg-card/20 py-8">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap items-center gap-3">
        <span class="text-sm font-medium text-muted-foreground">Filter by:</span
        >
        {#each categories as category}
          <button
            onclick={() => (selectedCategory = category)}
            class={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
              selectedCategory === category
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/60 bg-background/50 text-muted-foreground hover:border-primary/40 hover:bg-card/50"
            }`}
          >
            {category}
          </button>
        {/each}
      </div>
    </div>
  </section>

  <!-- Blog Posts -->
  <section class="py-20 md:py-28">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {#if filteredPosts().length === 0}
        <div class="py-20 text-center">
          <p class="text-lg text-muted-foreground">
            No articles found. Try adjusting your search or filter.
          </p>
        </div>
      {:else}
        <!-- Featured Posts -->
        {#if selectedCategory === "All" && searchQuery === ""}
          <div class="mb-16">
            <h2 class="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
              Featured Articles
            </h2>
            <div class="grid gap-8 md:grid-cols-2">
              {#each posts.filter((p) => p.featured) as post}
                <Card.Root
                  class="group flex flex-col overflow-hidden border-border/60 bg-card/50 transition-all hover:border-primary/40 hover:bg-card hover:shadow-lg hover:shadow-primary/5"
                >
                  <Card.Header class="pb-4">
                    <div class="mb-4 flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        class="border-primary/20 bg-primary/10 text-primary"
                      >
                        {post.category}
                      </Badge>
                      <span class="text-xs text-muted-foreground">Featured</span
                      >
                    </div>
                    <Card.Title class="mb-3 text-xl leading-tight">
                      {post.title}
                    </Card.Title>
                    <Card.Description class="text-sm leading-relaxed">
                      {post.excerpt}
                    </Card.Description>
                  </Card.Header>
                  <Card.Footer class="mt-auto border-t border-border/40 pt-4">
                    <div
                      class="flex w-full flex-wrap items-center justify-between gap-4"
                    >
                      <div
                        class="flex items-center gap-4 text-sm text-muted-foreground"
                      >
                        <div class="flex items-center gap-1.5">
                          <User class="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div class="flex items-center gap-1.5">
                          <Calendar class="h-4 w-4" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" class="gap-1.5">
                        Read More
                        <ArrowRight class="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </Card.Footer>
                </Card.Root>
              {/each}
            </div>
          </div>
        {/if}

        <!-- All Posts -->
        <div>
          <h2 class="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
            {selectedCategory === "All" ? "All Articles" : selectedCategory}
          </h2>
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {#each filteredPosts() as post}
              <Card.Root
                class="group flex flex-col border-border/60 bg-card/50 transition-all hover:border-border hover:bg-card hover:shadow-md"
              >
                <Card.Header class="pb-4">
                  <Badge
                    variant="secondary"
                    class="mb-4 w-fit border-primary/20 bg-primary/10 text-primary"
                  >
                    {post.category}
                  </Badge>
                  <Card.Title class="mb-2 text-lg leading-tight">
                    {post.title}
                  </Card.Title>
                  <Card.Description
                    class="line-clamp-3 text-sm leading-relaxed"
                  >
                    {post.excerpt}
                  </Card.Description>
                </Card.Header>
                <Card.Content class="pb-0">
                  <div class="mb-4 flex flex-wrap gap-2">
                    {#each post.tags as tag}
                      <span
                        class="flex items-center gap-1 rounded-md bg-muted/50 px-2 py-1 text-xs text-muted-foreground"
                      >
                        <Tag class="h-3 w-3" />
                        {tag}
                      </span>
                    {/each}
                  </div>
                </Card.Content>
                <Card.Footer class="mt-auto border-t border-border/40 pt-4">
                  <div class="flex w-full items-center justify-between text-sm">
                    <div
                      class="flex items-center gap-1.5 text-muted-foreground"
                    >
                      <Clock class="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                    <Button variant="ghost" size="sm" class="gap-1.5">
                      Read
                      <ArrowRight class="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </Card.Footer>
              </Card.Root>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </section>

  <!-- CTA Section -->
  <section class="border-t border-border/40 bg-card/20 py-20 md:py-28">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
          Want to Contribute?
        </h2>
        <p class="mb-8 text-lg text-muted-foreground">
          Share your knowledge and experiences with the community. Write about
          your projects, research, or learning journey.
        </p>
        <Button size="lg" class="gap-2">
          Submit Your Article
          <ArrowRight class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </section>
</div>
