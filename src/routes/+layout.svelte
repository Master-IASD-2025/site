<script lang="ts">
  import "./layout.css";
  import { ModeWatcher, toggleMode } from "mode-watcher";
  import { Sun, Moon, Github, Menu, ArrowRight, Heart } from "@lucide/svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Sheet from "$lib/components/ui/sheet";

  let { children } = $props();

  const navItems = [
    { href: "/projects", label: "Projects" },
    { href: "/research", label: "Research" },
    { href: "/blog", label: "Blog" },
    { href: "/community", label: "Community" },
  ];

  let isMobileOpen = $state(false);
</script>

<ModeWatcher defaultMode="dark" />

<div class="flex min-h-screen flex-col bg-background font-sans antialiased">
  <!-- Navigation -->
  <header
    class="fixed top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur-xl supports-backdrop-filter:bg-background/80"
  >
    <nav
      class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
    >
      <!-- Logo -->
      <a
        href="/"
        class="flex items-center gap-2.5 transition-opacity hover:opacity-80"
      >
        <div
          class="flex h-8 w-8 items-center justify-center rounded-md bg-primary"
        >
          <span class="text-sm font-bold text-primary-foreground">IA</span>
        </div>
        <span class="text-base font-semibold tracking-tight text-foreground"
          >MASTER IASD</span
        >
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden items-center gap-8 md:flex">
        {#each navItems as item}
          <a
            href={item.href}
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.label}
          </a>
        {/each}
      </div>

      <!-- Right Side Actions -->
      <div class="flex items-center gap-3">
        <a
          href="https://github.com/Master-IASD-2025/site"
          target="_blank"
          rel="noopener noreferrer"
          class="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
        >
          <Github class="h-4.5 w-4.5" />
        </a>
        <button
          onclick={toggleMode}
          class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
        >
          <Sun
            class="h-4.5 w-4.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Moon
            class="absolute h-4.5 w-4.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span class="sr-only">Toggle theme</span>
        </button>

        <div class="hidden sm:block">
          <Button href="/join" size="sm" class="gap-1.5 text-sm font-medium">
            Join Us
            <ArrowRight class="h-3.5 w-3.5" />
          </Button>
        </div>

        <!-- Mobile Menu -->
        <div class="md:hidden">
          <Sheet.Root bind:open={isMobileOpen}>
            <Sheet.Trigger>
              {#snippet child({ props })}
                <button
                  {...props}
                  class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Menu class="h-5 w-5" />
                  <span class="sr-only">Open menu</span>
                </button>
              {/snippet}
            </Sheet.Trigger>
            <Sheet.Content
              side="right"
              class="w-72 border-border/40 bg-background"
            >
              <Sheet.Header class="border-b border-border/40 pb-4">
                <Sheet.Title class="text-left">
                  <span class="text-base font-semibold">MASTER IASD</span>
                </Sheet.Title>
              </Sheet.Header>
              <nav class="flex flex-col gap-1 pt-4">
                {#each navItems as item}
                  <a
                    href={item.href}
                    onclick={() => (isMobileOpen = false)}
                    class="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {item.label}
                  </a>
                {/each}
                <div class="my-3 border-t border-border/40"></div>
                <a
                  href="https://github.com/Master-IASD-2025/site"
                  target="_blank"
                  rel="noopener noreferrer"
                  onclick={() => (isMobileOpen = false)}
                  class="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Github class="h-4 w-4" />
                  <span>GitHub</span>
                </a>
                <div class="mt-4 px-3">
                  <Button
                    href="/join"
                    class="w-full gap-1.5"
                    onclick={() => (isMobileOpen = false)}
                  >
                    Join Us
                    <ArrowRight class="h-4 w-4" />
                  </Button>
                </div>
              </nav>
            </Sheet.Content>
          </Sheet.Root>
        </div>
      </div>
    </nav>
  </header>

  <main class="flex-1 pt-16">
    {@render children()}
  </main>

  <!-- Footer -->
  <footer class="border-t border-border/40 bg-card/20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Main Footer Content -->
      <div class="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <!-- Brand Column -->
        <div class="space-y-4">
          <div class="flex items-center gap-2.5">
            <div
              class="flex h-9 w-9 items-center justify-center rounded-md bg-primary"
            >
              <span class="text-sm font-bold text-primary-foreground">IA</span>
            </div>
            <span class="text-base font-semibold text-foreground"
              >MASTER IASD</span
            >
          </div>
          <p class="text-sm leading-relaxed text-muted-foreground">
            A vibrant community of AI and Data Science enthusiasts at FSTT,
            pushing the boundaries of innovation and research.
          </p>
          <div class="flex items-center gap-3">
            <a
              href="https://github.com/Master-IASD-2025"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-9 w-9 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Github class="h-4 w-4" />
            </a>
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-9 w-9 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <svg
                class="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h3 class="text-sm font-semibold text-foreground">Quick Links</h3>
          <ul class="space-y-3 text-sm">
            <li>
              <a
                href="/projects"
                class="text-muted-foreground transition-colors hover:text-primary"
                >Projects</a
              >
            </li>
            <li>
              <a
                href="/research"
                class="text-muted-foreground transition-colors hover:text-primary"
                >Research</a
              >
            </li>
            <li>
              <a
                href="/blog"
                class="text-muted-foreground transition-colors hover:text-primary"
                >Blog</a
              >
            </li>
            <li>
              <a
                href="/community"
                class="text-muted-foreground transition-colors hover:text-primary"
                >Community</a
              >
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div class="space-y-4">
          <h3 class="text-sm font-semibold text-foreground">Resources</h3>
          <ul class="space-y-3 text-sm">
            <li>
              <a
                href="/blog"
                class="text-muted-foreground transition-colors hover:text-primary"
                >Documentation</a
              >
            </li>
            <li>
              <a
                href="https://github.com/Master-IASD-2025"
                target="_blank"
                rel="noopener noreferrer"
                class="text-muted-foreground transition-colors hover:text-primary"
                >GitHub</a
              >
            </li>
            <li>
              <a
                href="/blog"
                class="text-muted-foreground transition-colors hover:text-primary"
                >Tutorials</a
              >
            </li>
            <li>
              <a
                href="https://fstt.ac.ma"
                target="_blank"
                rel="noopener noreferrer"
                class="text-muted-foreground transition-colors hover:text-primary"
                >FSTT Website</a
              >
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="space-y-4">
          <h3 class="text-sm font-semibold text-foreground">Get in Touch</h3>
          <ul class="space-y-3 text-sm text-muted-foreground">
            <li class="flex items-start gap-2">
              <svg
                class="mt-0.5 h-4 w-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <span>FST Tanger, Morocco</span>
            </li>
            <li class="flex items-start gap-2">
              <svg
                class="mt-0.5 h-4 w-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              <a
                href="mailto:contact@master-iasd.com"
                class="transition-colors hover:text-primary"
                >contact@master-iasd.com</a
              >
            </li>
          </ul>
          <Button href="/join" size="sm" class="w-full gap-1.5">
            Join Community
            <ArrowRight class="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="flex flex-col items-center justify-between gap-4 border-t border-border/40 py-8 text-sm md:flex-row"
      >
        <div
          class="flex flex-col items-center gap-2 text-center md:flex-row md:text-left"
        >
          <p class="text-muted-foreground">
            © {new Date().getFullYear()} Master IASD Community — FST Tanger
          </p>
          <span class="hidden text-muted-foreground/60 md:inline">•</span>
          <p class="text-muted-foreground">Built by students, for students</p>
        </div>
        <div class="flex items-center gap-1.5 text-muted-foreground">
          <span>Made with</span>
          <Heart class="h-4 w-4 fill-chart-1 text-chart-1" />
          <span>using</span>
          <a
            href="https://kit.svelte.dev"
            target="_blank"
            rel="noopener noreferrer"
            class="font-semibold text-primary transition-colors hover:text-primary/80"
          >
            SvelteKit
          </a>
        </div>
      </div>
    </div>
  </footer>
</div>
