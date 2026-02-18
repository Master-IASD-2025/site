<script lang="ts">
  import type { Component } from "svelte";
  import { onMount } from "svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import * as Card from "$lib/components/ui/card";
  import {
    Brain,
    BarChart,
    MessageSquare,
    Eye,
    Rocket,
    Globe,
    ArrowLeft,
    Github,
    Users,
    Star,
    Calendar,
    Tag,
    CheckCircle2,
    Circle,
    Clock3,
    AlertCircle,
    Loader2,
    ExternalLink,
    Sparkles,
    Code2,
    Layers,
    ArrowRight,
  } from "@lucide/svelte";
  import {
    getProjectBySlug,
    getStatusMeta,
    formatProjectDate,
    getPublishedProjects,
    type Project,
  } from "$lib/services/projects";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const iconMap: Record<string, Component<any, any, any>> = {
    Brain,
    BarChart,
    MessageSquare,
    Eye,
    Rocket,
    Globe,
  };

  let project = $state<Project | null>(null);
  let relatedProjects = $state<Project[]>([]);
  let isLoading = $state(true);
  let error = $state<string | null>(null);

  const statusMeta = $derived(project ? getStatusMeta(project.status) : null);

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

  onMount(async () => {
    const pathname = window.location.pathname;
    const slug = pathname.split("/").pop();

    if (!slug) {
      error = "Invalid project URL";
      isLoading = false;
      return;
    }

    try {
      project = await getProjectBySlug(slug);

      if (!project) {
        error = "Project not found";
        isLoading = false;
        return;
      }

      if (!project.published) {
        error = "This project is not yet published";
        isLoading = false;
        return;
      }

      // Load related projects (same category, excluding current)
      const all = await getPublishedProjects();
      relatedProjects = all
        .filter((p) => p.slug !== slug && p.category === project!.category)
        .slice(0, 2);

      isLoading = false;
    } catch (err) {
      error = err instanceof Error ? err.message : "Failed to load project";
      isLoading = false;
    }
  });
</script>

<svelte:head>
  {#if project}
    <title>{project.title} | IASD Community Projects</title>
    <meta name="description" content={project.description} />
    <meta property="og:title" content={project.title} />
    <meta property="og:description" content={project.description} />
    <meta property="og:type" content="website" />
  {:else}
    <title>Project - Master IASD</title>
  {/if}
</svelte:head>

<div class="flex min-h-screen flex-col">
  {#if isLoading}
    <!-- Loading State -->
    <section class="py-20 md:py-28">
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col items-center justify-center py-20">
          <Loader2 class="h-12 w-12 animate-spin text-primary" />
          <p class="mt-4 text-lg text-muted-foreground">Loading project...</p>
        </div>
      </div>
    </section>
  {:else if error}
    <!-- Error State -->
    <section class="py-20 md:py-28">
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col items-center justify-center py-20">
          <AlertCircle class="h-12 w-12 text-destructive" />
          <h1 class="mt-6 text-2xl font-bold">{error}</h1>
          <p class="mt-2 text-muted-foreground">
            The project you're looking for couldn't be found.
          </p>
          <Button href="/projects" variant="outline" class="mt-8 gap-2">
            <ArrowLeft class="h-4 w-4" />
            Back to Projects
          </Button>
        </div>
      </div>
    </section>
  {:else if project}
    {@const Icon = iconMap[project.icon] ?? Brain}
    {@const StatusIcon = getStatusIcon(project.status)}

    <!-- Hero Header -->
    <section class="relative overflow-hidden border-b border-border/40 py-16 md:py-24">
      <!-- Ambient glow -->
      <div class="pointer-events-none absolute inset-0 -z-10">
        <div
          class="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[140px]"
        ></div>
        <div
          class="absolute bottom-0 right-1/3 h-72 w-72 rounded-full bg-primary/5 blur-[100px]"
        ></div>
      </div>

      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumb -->
        <Button href="/projects" variant="ghost" size="sm" class="mb-10 gap-2 -ml-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft class="h-4 w-4" />
          All Projects
        </Button>

        <div class="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          <!-- Left: Main Info -->
          <div class="flex-1">
            <!-- Category & Status row -->
            <div class="mb-5 flex flex-wrap items-center gap-3">
              <Badge
                variant="secondary"
                class="border-primary/20 bg-primary/10 text-primary"
              >
                {project.category}
              </Badge>
              <div
                class={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
                  project.status === "active"
                    ? "border-chart-2/20 bg-chart-2/10 text-chart-2"
                    : project.status === "completed"
                      ? "border-primary/20 bg-primary/10 text-primary"
                      : "border-chart-3/20 bg-chart-3/10 text-chart-3"
                }`}
              >
                <StatusIcon class="h-3 w-3" />
                <span>{statusMeta?.label}</span>
              </div>
            </div>

            <!-- Title -->
            <h1 class="mb-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {project.title}
            </h1>

            <!-- Short description -->
            <p class="mb-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
              {project.description}
            </p>

            <!-- Meta row -->
            <div class="mb-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div class="flex items-center gap-2">
                <Users class="h-4 w-4 text-primary" />
                <span><strong class="text-foreground">{project.contributors}</strong> contributors</span>
              </div>
              <div class="flex items-center gap-2">
                <Star class="h-4 w-4 text-primary" />
                <span><strong class="text-foreground">{project.stars}</strong> stars</span>
              </div>
              <div class="flex items-center gap-2">
                <Calendar class="h-4 w-4 text-primary" />
                <span>Started {formatProjectDate(project.startDate)}</span>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-wrap gap-3">
              <Button
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="gap-2"
              >
                <Github class="h-4 w-4" />
                View on GitHub
                <ExternalLink class="h-3.5 w-3.5 opacity-70" />
              </Button>
            </div>
          </div>

          <!-- Right: Icon Card -->
          <div class="lg:w-64 lg:shrink-0">
            <div
              class="flex flex-col items-center rounded-2xl border border-border/60 bg-card/50 p-8 text-center"
            >
              <div
                class="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10"
              >
                <Icon class="h-10 w-10 text-primary" />
              </div>
              <p class="text-sm font-semibold text-foreground">{project.title}</p>
              <p class="mt-1 text-xs text-muted-foreground">{project.category}</p>

              <div class="mt-6 w-full border-t border-border/40 pt-5">
                <div class="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div class="text-2xl font-bold text-foreground">{project.contributors}</div>
                    <div class="text-xs text-muted-foreground">Contributors</div>
                  </div>
                  <div>
                    <div class="text-2xl font-bold text-foreground">{project.stars}</div>
                    <div class="text-xs text-muted-foreground">Stars</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-16 md:py-20">
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-10 lg:grid-cols-3">
          <!-- Left: Long Description + Highlights -->
          <div class="lg:col-span-2 space-y-10">
            <!-- About section -->
            <div>
              <div class="mb-5 flex items-center gap-3">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles class="h-4 w-4 text-primary" />
                </div>
                <h2 class="text-xl font-bold tracking-tight">About the Project</h2>
              </div>
              <div
                class="rounded-xl border border-border/40 bg-card/30 p-6 text-base leading-relaxed text-muted-foreground"
              >
                {project.longDescription}
              </div>
            </div>

            <!-- Key Highlights -->
            <div>
              <div class="mb-5 flex items-center gap-3">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle2 class="h-4 w-4 text-primary" />
                </div>
                <h2 class="text-xl font-bold tracking-tight">Key Highlights</h2>
              </div>
              <ul class="space-y-3">
                {#each project.highlights as highlight, i}
                  <li
                    class="flex items-start gap-3 rounded-lg border border-border/40 bg-card/30 p-4 transition-colors hover:border-primary/30 hover:bg-card/50"
                  >
                    <span
                      class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary"
                    >
                      {i + 1}
                    </span>
                    <span class="text-sm leading-relaxed text-foreground">{highlight}</span>
                  </li>
                {/each}
              </ul>
            </div>
          </div>

          <!-- Right Sidebar: Tech Stack + Tags -->
          <div class="space-y-8">
            <!-- Tech Stack -->
            <div>
              <div class="mb-4 flex items-center gap-2.5">
                <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <Code2 class="h-3.5 w-3.5 text-primary" />
                </div>
                <h3 class="text-base font-semibold tracking-tight">Tech Stack</h3>
              </div>
              <div class="space-y-2">
                {#each project.techStack as tech}
                  <div
                    class="flex items-center gap-2.5 rounded-lg border border-border/40 bg-card/30 px-3 py-2.5 text-sm transition-colors hover:border-primary/30"
                  >
                    <div class="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span class="font-medium text-foreground">{tech}</span>
                  </div>
                {/each}
              </div>
            </div>

            <!-- Tags -->
            <div>
              <div class="mb-4 flex items-center gap-2.5">
                <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <Layers class="h-3.5 w-3.5 text-primary" />
                </div>
                <h3 class="text-base font-semibold tracking-tight">Tags</h3>
              </div>
              <div class="flex flex-wrap gap-2">
                {#each project.tags as tag}
                  <span
                    class="flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/30 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                  >
                    <Tag class="h-3 w-3" />
                    {tag}
                  </span>
                {/each}
              </div>
            </div>

            <!-- Contribute CTA -->
            <div
              class="relative overflow-hidden rounded-xl border border-border/60 bg-card/50 p-6"
            >
              <div
                class="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-primary/10 blur-[40px]"
              ></div>
              <div class="relative">
                <h3 class="mb-2 text-base font-semibold">Want to Contribute?</h3>
                <p class="mb-4 text-sm leading-relaxed text-muted-foreground">
                  Join the team and help build something meaningful.
                </p>
                <Button
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                  class="w-full gap-2"
                >
                  <Github class="h-3.5 w-3.5" />
                  Contribute on GitHub
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Projects -->
    {#if relatedProjects.length > 0}
      <section class="border-t border-border/40 bg-card/20 py-16 md:py-20">
        <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div class="mb-8 flex items-center justify-between">
            <h2 class="text-xl font-bold tracking-tight sm:text-2xl">
              More in <span class="text-primary">{project.category}</span>
            </h2>
            <Button href="/projects" variant="ghost" size="sm" class="gap-1.5 text-muted-foreground">
              View All
              <ArrowRight class="h-3.5 w-3.5" />
            </Button>
          </div>

          <div class="grid gap-5 sm:grid-cols-2">
            {#each relatedProjects as related}
              {@const RelatedIcon = iconMap[related.icon] ?? Brain}
              {@const relatedStatus = getStatusMeta(related.status)}
              {@const RelatedStatusIcon = getStatusIcon(related.status)}
              <a href="/projects/{related.slug}" class="group block">
                <Card.Root
                  class="flex h-full flex-col border-border/60 bg-card/50 transition-all hover:border-primary/40 hover:bg-card hover:shadow-md"
                >
                  <Card.Header class="pb-4">
                    <div class="mb-4 flex items-start justify-between">
                      <div
                        class="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50 transition-colors group-hover:bg-primary/10"
                      >
                        <RelatedIcon
                          class="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary"
                        />
                      </div>
                      <div class="flex items-center gap-1 text-xs text-muted-foreground">
                        <RelatedStatusIcon
                          class={`h-3 w-3 ${related.status === "active" ? "text-chart-2" : related.status === "completed" ? "text-primary" : "text-chart-3"}`}
                        />
                        <span>{relatedStatus.label}</span>
                      </div>
                    </div>
                    <Card.Title
                      class="mb-2 text-base leading-snug transition-colors group-hover:text-primary"
                    >
                      {related.title}
                    </Card.Title>
                    <Card.Description class="line-clamp-2 text-sm leading-relaxed">
                      {related.description}
                    </Card.Description>
                  </Card.Header>
                  <Card.Footer class="mt-auto border-t border-border/40 pt-3">
                    <div class="flex w-full items-center justify-between text-xs text-muted-foreground">
                      <div class="flex items-center gap-3">
                        <div class="flex items-center gap-1">
                          <Users class="h-3 w-3" />
                          <span>{related.contributors}</span>
                        </div>
                        <div class="flex items-center gap-1">
                          <Star class="h-3 w-3" />
                          <span>{related.stars}</span>
                        </div>
                      </div>
                      <span class="flex items-center gap-1 font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        View
                        <ArrowRight class="h-3 w-3" />
                      </span>
                    </div>
                  </Card.Footer>
                </Card.Root>
              </a>
            {/each}
          </div>
        </div>
      </section>
    {/if}
  {/if}
</div>
