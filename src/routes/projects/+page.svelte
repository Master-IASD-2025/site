<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import Button from "$lib/components/ui/button/button.svelte";
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import type { Component } from "svelte";
  import {
    Brain,
    BarChart,
    ArrowRight,
    Github,
    Users,
    MessageSquare,
    Eye,
    Rocket,
    Globe,
    Star,
    Search,
    AlertCircle,
    Loader2,
    FolderGit2,
    CheckCircle2,
    Circle,
    Clock3,
  } from "@lucide/svelte";
  import { onMount } from "svelte";
  import {
    getPublishedProjects,
    getStatusMeta,
    type Project,
  } from "$lib/services/projects";

  const metadata = {
    title: "Projects - Master IASD FSTT",
    description:
      "Explore open-source AI and Data Science projects built by the Master IASD community at FSTT. From ML pipelines to NLP research tools.",
    keywords:
      "AI projects, data science, machine learning, open source, IASD, FSTT, Morocco",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const iconMap: Record<string, Component<any, any, any>> = {
    Brain,
    BarChart,
    MessageSquare,
    Eye,
    Rocket,
    Globe,
  };

  let projects = $state<Project[]>([]);
  let isLoading = $state(true);
  let error = $state<string | null>(null);

  const categories = $derived([
    "All",
    ...new Set(projects.map((p) => p.category)),
  ]);

  let selectedCategory = $state("All");
  let searchQuery = $state("");

  const filteredProjects = $derived(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  });

  onMount(async () => {
    try {
      projects = await getPublishedProjects();
      isLoading = false;
    } catch (err) {
      error = err instanceof Error ? err.message : "Failed to load projects";
      isLoading = false;
    }
  });

  function getStatusIcon(status: Project["status"]) {
    switch (status) {
      case "active":
        return Circle;
      case "completed":
        return CheckCircle2;
      case "in-progress":
        return Clock3;
      default:
        return Circle;
    }
  }
</script>

<svelte:head>
  <title>{metadata.title}</title>
  <meta name="description" content={metadata.description} />
  <meta name="keywords" content={metadata.keywords} />
  <meta property="og:title" content={metadata.title} />
  <meta property="og:description" content={metadata.description} />
  <meta property="og:type" content="website" />
</svelte:head>

<div class="flex min-h-screen flex-col">
  <!-- Hero Section -->
  <section
    class="relative overflow-hidden border-b border-border/40 py-20 md:py-28"
  >
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div
        class="absolute left-1/3 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"
      ></div>
      <div
        class="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-primary/5 blur-[80px]"
      ></div>
    </div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <div
          class="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-4 py-1.5 text-sm backdrop-blur-sm"
        >
          <FolderGit2 class="h-3.5 w-3.5 text-primary" />
          <span class="text-muted-foreground">Open Source Projects</span>
        </div>
        <h1
          class="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          Community <span class="text-primary">Projects</span>
        </h1>
        <p class="mb-10 text-lg text-muted-foreground md:text-xl">
          Real-world AI and Data Science projects built by the IASD community.
          Explore, contribute, and build together.
        </p>

        <!-- Search Bar -->
        <div class="relative mx-auto max-w-2xl">
          <Search
            class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search projects, tags, technologies..."
            bind:value={searchQuery}
            class="w-full rounded-xl border border-border/60 bg-background/50 py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- Categories Filter -->
  <section class="border-b border-border/40 bg-card/20 py-6">
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

  <!-- Projects Grid -->
  <section class="py-20 md:py-28">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {#if isLoading}
        <div class="flex flex-col items-center justify-center py-20">
          <Loader2 class="h-12 w-12 animate-spin text-primary" />
          <p class="mt-4 text-lg text-muted-foreground">Loading projects...</p>
        </div>
      {:else if error}
        <div class="flex flex-col items-center justify-center py-20">
          <AlertCircle class="h-12 w-12 text-destructive" />
          <p class="mt-4 text-lg text-muted-foreground">{error}</p>
          <Button
            onclick={() => window.location.reload()}
            variant="outline"
            class="mt-6"
          >
            Try Again
          </Button>
        </div>
      {:else if filteredProjects().length === 0}
        <div class="py-20 text-center">
          <p class="text-lg text-muted-foreground">
            No projects found. Try adjusting your search or filter.
          </p>
        </div>
      {:else}
        <!-- Featured -->
        {#if selectedCategory === "All" && searchQuery === ""}
          <div class="mb-16">
            <h2 class="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
              Featured Projects
            </h2>
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {#each projects.filter((p) => p.featured) as project}
                {@const Icon = iconMap[project.icon] ?? Brain}
                {@const statusMeta = getStatusMeta(project.status)}
                {@const StatusIcon = getStatusIcon(project.status)}
                <a href="/projects/{project.slug}" class="group block">
                  <Card.Root
                    class="flex h-full flex-col border-border/60 bg-card/50 transition-all hover:border-primary/40 hover:bg-card hover:shadow-lg hover:shadow-primary/5"
                  >
                    <Card.Header class="pb-4">
                      <div class="mb-4 flex items-start justify-between">
                        <div
                          class="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20"
                        >
                          <Icon class="h-5 w-5 text-primary" />
                        </div>
                        <div
                          class="flex items-center gap-1.5 text-xs text-muted-foreground"
                        >
                          <StatusIcon
                            class={`h-3.5 w-3.5 ${project.status === "active" ? "text-chart-2" : project.status === "completed" ? "text-primary" : "text-chart-3"}`}
                          />
                          <span>{statusMeta.label}</span>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        class="mb-3 w-fit border-primary/20 bg-primary/10 text-primary"
                      >
                        {project.category}
                      </Badge>
                      <Card.Title
                        class="mb-2 text-lg leading-tight transition-colors group-hover:text-primary"
                      >
                        {project.title}
                      </Card.Title>
                      <Card.Description
                        class="line-clamp-2 text-sm leading-relaxed"
                      >
                        {project.description}
                      </Card.Description>
                    </Card.Header>
                    <Card.Content class="pb-0">
                      <div class="mb-4 flex flex-wrap gap-1.5">
                        {#each project.tags.slice(0, 3) as tag}
                          <span
                            class="rounded-md border border-border/40 bg-muted/30 px-2 py-0.5 text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        {/each}
                        {#if project.tags.length > 3}
                          <span class="px-1 text-xs text-muted-foreground/60"
                            >+{project.tags.length - 3}</span
                          >
                        {/if}
                      </div>
                    </Card.Content>
                    <Card.Footer
                      class="mt-auto border-t border-border/40 pt-4"
                    >
                      <div class="flex w-full items-center justify-between">
                        <div
                          class="flex items-center gap-3 text-sm text-muted-foreground"
                        >
                          <div class="flex items-center gap-1.5">
                            <Users class="h-3.5 w-3.5" />
                            <span>{project.contributors}</span>
                          </div>
                          <div class="flex items-center gap-1.5">
                            <Star class="h-3.5 w-3.5" />
                            <span>{project.stars}</span>
                          </div>
                        </div>
                        <span
                          class="flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-primary/80"
                        >
                          View Project
                          <ArrowRight class="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </Card.Footer>
                  </Card.Root>
                </a>
              {/each}
            </div>
          </div>
        {/if}

        <!-- All Projects -->
        <div>
          <h2 class="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
            {selectedCategory === "All" ? "All Projects" : selectedCategory}
          </h2>
          <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {#each filteredProjects() as project}
              {@const Icon = iconMap[project.icon] ?? Brain}
              {@const statusMeta = getStatusMeta(project.status)}
              {@const StatusIcon = getStatusIcon(project.status)}
              <a href="/projects/{project.slug}" class="group block">
                <Card.Root
                  class="flex h-full flex-col border-border/60 bg-card/50 transition-all hover:border-border hover:bg-card hover:shadow-md"
                >
                  <Card.Header class="pb-3">
                    <div class="mb-3 flex items-start justify-between">
                      <div
                        class="flex h-9 w-9 items-center justify-center rounded-lg bg-muted/50 transition-colors group-hover:bg-primary/10"
                      >
                        <Icon
                          class="h-4.5 w-4.5 text-muted-foreground transition-colors group-hover:text-primary"
                        />
                      </div>
                      <div
                        class="flex items-center gap-1 text-xs text-muted-foreground"
                      >
                        <StatusIcon
                          class={`h-3 w-3 ${project.status === "active" ? "text-chart-2" : project.status === "completed" ? "text-primary" : "text-chart-3"}`}
                        />
                        <span>{statusMeta.label}</span>
                      </div>
                    </div>
                    <Card.Title
                      class="mb-1.5 text-base leading-snug transition-colors group-hover:text-primary"
                    >
                      {project.title}
                    </Card.Title>
                    <Card.Description class="line-clamp-2 text-xs leading-relaxed">
                      {project.description}
                    </Card.Description>
                  </Card.Header>
                  <Card.Footer class="mt-auto border-t border-border/40 pt-3">
                    <div class="flex w-full items-center justify-between text-xs text-muted-foreground">
                      <div class="flex items-center gap-3">
                        <div class="flex items-center gap-1">
                          <Users class="h-3 w-3" />
                          <span>{project.contributors}</span>
                        </div>
                        <div class="flex items-center gap-1">
                          <Star class="h-3 w-3" />
                          <span>{project.stars}</span>
                        </div>
                      </div>
                      <Badge variant="secondary" class="border-border/40 bg-muted/30 text-xs text-muted-foreground">
                        {project.category}
                      </Badge>
                    </div>
                  </Card.Footer>
                </Card.Root>
              </a>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </section>

  <!-- CTA -->
  <section class="border-t border-border/40 bg-card/20 py-20 md:py-28">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
          Have a Project Idea?
        </h2>
        <p class="mb-8 text-lg text-muted-foreground">
          Propose a new project or contribute to an existing one. All skill
          levels are welcome.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <Button size="lg" class="gap-2">
            Propose a Project
            <ArrowRight class="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" class="gap-2">
            <Github class="h-4 w-4" />
            GitHub Organization
          </Button>
        </div>
      </div>
    </div>
  </section>
</div>
