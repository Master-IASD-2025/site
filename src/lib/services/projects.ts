// Projects service - handles fetching and caching project data

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  status: "active" | "completed" | "in-progress" | "archived";
  contributors: number;
  stars: number;
  icon: string;
  tags: string[];
  techStack: string[];
  githubUrl: string;
  featured: boolean;
  published: boolean;
  startDate: string;
  highlights: string[];
}

export interface ProjectIndex {
  projects: Project[];
  lastUpdated: string;
}

// GitHub repository configuration
const GITHUB_OWNER = "Master-IASD-2025";
const GITHUB_REPO = "master-iasd-2025.github.io";
const GITHUB_BRANCH = "master";
const PROJECTS_PATH = "src/lib/projects";

const PROJECTS_REPO_BASE =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "/src/lib/projects"
    : `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${PROJECTS_PATH}`;

const INDEX_URL = `${PROJECTS_REPO_BASE}/ProjectIndex.json`;
const CACHE_KEY = "projects-index-cache";
const CACHE_VERSION = "v1";

// In-memory cache
let indexCache: ProjectIndex | null = null;

/**
 * Fetch and cache the projects index
 */
export async function fetchProjectIndex(): Promise<ProjectIndex> {
  // Return in-memory cache if available
  if (indexCache) {
    return indexCache;
  }

  // Try localStorage cache
  if (typeof window !== "undefined") {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed.version === CACHE_VERSION) {
          indexCache = parsed.data;
          return indexCache as ProjectIndex;
        }
      } catch (e) {
        console.warn("Failed to parse cached projects index", e);
      }
    }
  }

  // Fetch from remote
  try {
    const response = await fetch(INDEX_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch projects index: ${response.statusText}`);
    }

    const data: ProjectIndex = await response.json();

    // Cache in memory
    indexCache = data;

    // Cache in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          version: CACHE_VERSION,
          data,
        })
      );
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch projects index:", error);
    throw error;
  }
}

/**
 * Get a single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const index = await fetchProjectIndex();
    return index.projects.find((p) => p.slug === slug) || null;
  } catch (error) {
    console.error("Failed to get project by slug:", error);
    return null;
  }
}

/**
 * Get all published projects
 */
export async function getPublishedProjects(): Promise<Project[]> {
  try {
    const index = await fetchProjectIndex();
    return index.projects.filter((p) => p.published);
  } catch (error) {
    console.error("Failed to get published projects:", error);
    return [];
  }
}

/**
 * Get featured projects
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const index = await fetchProjectIndex();
    return index.projects.filter((p) => p.published && p.featured);
  } catch (error) {
    console.error("Failed to get featured projects:", error);
    return [];
  }
}

/**
 * Clear all caches
 */
export function clearProjectsCache(): void {
  indexCache = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem(CACHE_KEY);
  }
}

/**
 * Get status label and style
 */
export function getStatusMeta(status: Project["status"]): {
  label: string;
  colorClass: string;
} {
  switch (status) {
    case "active":
      return { label: "Active", colorClass: "chart-2" };
    case "completed":
      return { label: "Completed", colorClass: "primary" };
    case "in-progress":
      return { label: "In Progress", colorClass: "chart-3" };
    case "archived":
      return { label: "Archived", colorClass: "muted-foreground" };
    default:
      return { label: status, colorClass: "muted-foreground" };
  }
}

/**
 * Format date string
 */
export function formatProjectDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}
