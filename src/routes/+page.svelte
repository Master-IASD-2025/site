<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import * as Accordion from "$lib/components/ui/accordion";
  import Button from "$lib/components/ui/button/button.svelte";
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import {
    Brain,
    Database,
    Network,
    Cpu,
    BookOpen,
    GraduationCap,
    BarChart,
    Code,
    ArrowRight,
    Server,
    Globe,
    Lightbulb,
    Users,
    Sparkles,
    MessageSquare,
    Eye,
    Target,
    Zap,
    Briefcase,
    Share2,
    Layers,
    Rocket,
  } from "@lucide/svelte";

  const scopeOfWork = [
    {
      title: "Machine Learning & Deep Learning",
      icon: Brain,
      description: "Building models that learn from data.",
    },
    {
      title: "Data Analysis & Visualization",
      icon: BarChart,
      description: "Extracting insights and telling stories with data.",
    },
    {
      title: "Natural Language Processing",
      icon: MessageSquare,
      description: "Understanding and generating human language.",
    },
    {
      title: "Computer Vision",
      icon: Eye,
      description: "Enabling machines to see and interpret the visual world.",
    },
    {
      title: "Applied AI Systems",
      icon: Rocket,
      description: "Real-world applications solving tangible problems.",
    },
    {
      title: "Research Experiments",
      icon: BookOpen,
      description: "Exploring new frontiers in AI science.",
    },
  ];

  const goals = [
    {
      title: "Impactful Open Source",
      description:
        "Build projects that matter and contribute to the global ecosystem.",
      icon: Globe,
      tags: ["Open Source", "Impact"],
    },
    {
      title: "Learning by Building",
      description:
        "Encourage learning through real implementation and collaboration.",
      icon: Code,
      tags: ["Practice", "Hands-on"],
    },
    {
      title: "Industry Workflows",
      description: "Apply modern best practices and bridging the academic gap.",
      icon: Briefcase,
      tags: ["Professional", "Best Practices"],
    },
    {
      title: "Portfolio Ready",
      description: "Create public work that demonstrates student skills.",
      icon: Layers,
      tags: ["Career", "Showcase"],
    },
    {
      title: "Knowledge Sharing",
      description: "Promoting peer learning and open transparency.",
      icon: Share2,
      tags: ["Community", "Education"],
    },
    {
      title: "Solutions for Morocco",
      description:
        "Contributing to AI solutions relevant to our local context.",
      icon: Database, // Used as placeholder for 'context'
      tags: ["Local", "Relevance"],
    },
  ];

  const principles = [
    {
      title: "Collaboration over Competition",
      description: "We go further when we go together.",
    },
    {
      title: "Learning through Building",
      description: "We learn best by doing.",
    },
    {
      title: "Open Knowledge",
      description: "Transparency in process and outcome.",
    },
    {
      title: "Respectful Communication",
      description: "Constructive feedback and safe space.",
    },
    {
      title: "Quality & Responsibility",
      description: "Taking pride in well-crafted contributions.",
    },
  ];
</script>

<div class="flex min-h-screen flex-col">
  <!-- Hero Section -->
  <section
    class="flex flex-col items-center justify-center space-y-10 py-24 text-center md:py-32"
  >
    <div class="space-y-4 px-4">
      <div
        class="bg-primary/10 text-primary mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
      >
        <Users class="h-10 w-10" />
      </div>
      <h1 class="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
        AI & Data Science Community <br class="hidden sm:block" /> FST Tanger
      </h1>
      <p
        class="text-muted-foreground mx-auto max-w-[800px] text-lg sm:text-xl md:text-2xl"
      >
        A student-led initiative by members of the AI and Data Science Master at
        FST Tanger. Transforming learning into contribution and ideas into
        impact through open-source collaboration.
      </p>
    </div>
    <div class="flex flex-col gap-4 sm:flex-row">
      <Button size="lg" class="gap-2">
        <Sparkles class="h-4 w-4" /> View Projects
      </Button>
      <Button size="lg" variant="outline" class="gap-2">
        <MessageSquare class="h-4 w-4" /> Join Us
      </Button>
    </div>
  </section>

  <!-- Vision Section -->
  <section class="bg-muted/50 w-full py-16 md:py-24">
    <div class="container mx-auto px-4 md:px-6">
      <div class="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
        <div class="flex flex-col justify-center space-y-4">
          <div
            class="inline-flex items-center gap-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400"
          >
            <Target class="h-4 w-4" />
            Our Vision
          </div>
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">
            From Learners to Contributors
          </h2>
          <p class="text-muted-foreground text-lg">
            We believe that students are not only learners, but also
            contributors to the global AI ecosystem. Our vision is to build a
            strong, collaborative AI community that produces high-quality
            open-source projects and helps position Moroccan talent on the
            international stage.
          </p>
          <div class="pt-4">
            <p class="text-muted-foreground italic">
              "Our purpose is creating meaningful open-source impact in
              Artificial Intelligence and Data Science, while giving real
              practical value to students."
            </p>
          </div>
        </div>
        <div class="flex items-center justify-center">
          <div
            class="bg-card text-card-foreground shadow-lg flex aspect-video w-full max-w-md items-center justify-center rounded-xl border p-8"
          >
            <Globe class="h-24 w-24 text-muted-foreground/20" />
            <span class="ml-4 text-2xl font-bold text-muted-foreground/40"
              >Moroccan Talent</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Goals Section -->
  <section class="w-full py-16 md:py-24">
    <div class="container mx-auto px-4 md:px-6">
      <div class="mx-auto mb-12 max-w-2xl text-center">
        <h2 class="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl">
          Our Goals
        </h2>
        <p class="text-muted-foreground text-lg">
          We aim to bridge the gap between academic knowledge and real-world
          application.
        </p>
      </div>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {#each goals as goal}
          {@const Icon = goal.icon}
          <Card.Root class="flex flex-col h-full">
            <Card.Header>
              <div
                class="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
              >
                <Icon class="h-6 w-6" />
              </div>
              <Card.Title>{goal.title}</Card.Title>
              <Card.Description class="pt-2">
                {goal.description}
              </Card.Description>
            </Card.Header>
            <Card.Content class="mt-auto">
              <div class="flex flex-wrap gap-2">
                {#each goal.tags as tag}
                  <Badge variant="secondary">{tag}</Badge>
                {/each}
              </div>
            </Card.Content>
          </Card.Root>
        {/each}
      </div>
    </div>
  </section>

  <!-- Scope of Work -->
  <section class="bg-muted/50 w-full py-16 md:py-24">
    <div class="container mx-auto px-4 md:px-6">
      <div class="mx-auto mb-16 max-w-2xl text-center">
        <h2 class="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl">
          Scope of Work
        </h2>
        <p class="text-muted-foreground text-lg">
          Key areas where we focus our efforts and experiments.
        </p>
      </div>
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {#each scopeOfWork as scope}
          {@const Icon = scope.icon}
          <div
            class="bg-background flex flex-col items-center rounded-xl border p-6 text-center shadow-sm transition-all hover:shadow-md"
          >
            <div
              class="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full"
            >
              <Icon class="h-6 w-6" />
            </div>
            <h3 class="mb-2 text-xl font-bold">{scope.title}</h3>
            <p class="text-muted-foreground">{scope.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Principles Section -->
  <section class="w-full py-16 md:py-24">
    <div class="container mx-auto px-4 md:px-6">
      <div class="mx-auto mb-12 max-w-2xl text-center">
        <h2 class="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl">
          Community Principles
        </h2>
        <p class="text-muted-foreground text-lg">
          The values that guide our collaboration and growth.
        </p>
      </div>
      <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {#each principles as principle}
          <div class="flex flex-col items-center text-center space-y-2">
            <div class="bg-primary/5 p-4 rounded-full">
              <Zap class="h-6 w-6 text-primary" />
            </div>
            <h3 class="font-bold">{principle.title}</h3>
            <p class="text-sm text-muted-foreground">{principle.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- CTA / Who This Is For -->
  <section class="border-t py-16 md:py-24 bg-muted/30">
    <div class="container mx-auto flex flex-col items-center px-4 text-center">
      <Users class="mb-6 h-12 w-12" />
      <h2 class="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl">
        Who This Is For
      </h2>
      <p class="text-muted-foreground mb-4 max-w-[700px] text-lg">
        Primarily for students of the AI and Data Science Master at FST Tanger,
        as well as motivated contributors who share our values.
      </p>
      <p class="text-primary font-medium mb-8 text-xl">
        Skill level is not a barrier. Commitment, curiosity, and consistency
        matter more than experience.
      </p>
      <Button
        size="lg"
        variant="default"
        href="https://github.com/Master-IASD-2025"
      >
        Join the Initiative
      </Button>
    </div>
  </section>
</div>
