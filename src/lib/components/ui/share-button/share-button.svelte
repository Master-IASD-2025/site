<script lang="ts">
  import { onMount } from "svelte";
  import { cn } from "$lib/utils.js";
  import Button from "../button/button.svelte";
  import { Share2, MessageCircle, Facebook, Globe, Linkedin } from "@lucide/svelte";
  import { slide, fade, scale } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  let { url, title, description, className, variant, size } = $props();

  let isOpen = $state(false);
  let isMobile = $state(false);
  let container = $state<HTMLDivElement | null>(null);

  onMount(() => {
    const checkMobile = () => {
      isMobile = window.innerWidth < 768;
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    // Click outside handler
    function handleClickOutside(event: MouseEvent) {
      if (container && !container.contains(event.target as Node)) {
        isOpen = false;
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  function shareOnWhatsApp() {
    const text = `${title} - ${description}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}%20${encodeURIComponent(url)}`;
    
    if (isMobile) {
      window.open(whatsappUrl, "_blank");
    } else {
      window.open(whatsappUrl, "whatsapp", "width=600,height=400");
    }
    
    isOpen = false;
  }

  function shareOnFacebook() {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    
    if (isMobile) {
      window.open(facebookUrl, "_blank");
    } else {
      window.open(facebookUrl, "facebook", "width=600,height=400");
    }
    
    isOpen = false;
  }

  function shareOnLinkedIn() {
    const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`;
    
    if (isMobile) {
      window.open(linkedinUrl, "_blank");
    } else {
      window.open(linkedinUrl, "linkedin", "width=600,height=400");
    }
    
    isOpen = false;
  }

  function shareOnReddit() {
    const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    
    if (isMobile) {
      window.open(redditUrl, "_blank");
    } else {
      window.open(redditUrl, "reddit", "width=900,height=600");
    }
    
    isOpen = false;
  }
</script>

{#if isMobile}
  <!-- Mobile: Use native share API if available, otherwise show inline icons -->
  <div class="space-y-3">
    <div class="flex items-center gap-2">
      <span class="text-sm font-medium text-muted-foreground">Share:</span>
      <!-- WhatsApp -->
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-colors"
        onclick={() => shareOnWhatsApp()}
        title="Share via WhatsApp"
      >
        <MessageCircle class="h-5 w-5" />
      </button>
      
      <!-- Facebook -->
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-colors"
        onclick={() => shareOnFacebook()}
        title="Share on Facebook"
      >
        <Facebook class="h-5 w-5" />
      </button>
      
      <!-- Reddit -->
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 transition-colors"
        onclick={() => shareOnReddit()}
        title="Share on Reddit"
      >
        <Globe class="h-5 w-5" />
      </button>
      
      <!-- LinkedIn -->
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/10 text-sky-600 hover:bg-sky-500/20 transition-colors"
        onclick={() => shareOnLinkedIn()}
        title="Share on LinkedIn"
      >
        <Linkedin class="h-5 w-5" />
      </button>
    </div>
    
    <Button
      {variant}
      {size}
      class={cn("gap-2", className)}
      onclick={() => {
        if (navigator.share) {
          navigator.share({
            title,
            text: description,
            url
          }).catch(() => {
            // Fallback to inline icons
          });
        }
      }}
    >
      <Share2 class="h-4 w-4" />
      Share
    </Button>
  </div>
{:else}
  <!-- Desktop: Animated dropdown share icons -->
  <div bind:this={container} class="relative">
    <Button
      {variant}
      {size}
      class={cn("gap-2", className)}
      onclick={() => isOpen = !isOpen}
    >
      <Share2 class="h-4 w-4" />
      Share
    </Button>

    {#if isOpen}
      <div 
        in:slide={{ duration: 250, easing: cubicOut }}
        out:fade={{ duration: 150 }}
        class="absolute left-1/2 bottom-full z-50 mb-2 w-[13rem] -translate-x-1/2 rounded-lg border border-border bg-card shadow-lg"
      >
        <div class="flex items-center justify-center gap-2 p-2">
          <!-- WhatsApp -->
          <button
            type="button"
            in:scale={{ duration: 200, delay: 30, easing: cubicOut }}
            class="group relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500/15 to-green-600/10 text-green-600 hover:from-green-500/25 hover:to-green-600/20 border border-green-500/20 hover:border-green-500/40 transition-all duration-200 hover:scale-105"
            onclick={() => shareOnWhatsApp()}
            title="Share via WhatsApp"
          >
            <div class="absolute inset-0 rounded-lg bg-gradient-to-br from-green-500/5 to-transparent pointer-events-none"></div>
            <MessageCircle class="h-5 w-5 relative z-10 group-hover:scale-105 transition-transform duration-200" />
          </button>
          
          <!-- Facebook -->
          <button
            type="button"
            in:scale={{ duration: 200, delay: 60, easing: cubicOut }}
            class="group relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/15 to-blue-600/10 text-blue-600 hover:from-blue-500/25 hover:to-blue-600/20 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-200 hover:scale-105"
            onclick={() => shareOnFacebook()}
            title="Share on Facebook"
          >
            <div class="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none"></div>
            <Facebook class="h-5 w-5 relative z-10 group-hover:scale-105 transition-transform duration-200" />
          </button>
          
          <!-- Reddit -->
          <button
            type="button"
            in:scale={{ duration: 200, delay: 90, easing: cubicOut }}
            class="group relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/15 to-orange-600/10 text-orange-600 hover:from-orange-500/25 hover:to-orange-600/20 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-200 hover:scale-105"
            onclick={() => shareOnReddit()}
            title="Share on Reddit"
          >
            <div class="absolute inset-0 rounded-lg bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none"></div>
            <Globe class="h-5 w-5 relative z-10 group-hover:scale-105 transition-transform duration-200" />
          </button>
          
          <!-- LinkedIn -->
          <button
            type="button"
            in:scale={{ duration: 200, delay: 120, easing: cubicOut }}
            class="group relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500/15 to-sky-600/10 text-sky-600 hover:from-sky-500/25 hover:to-sky-600/20 border border-sky-500/20 hover:border-sky-500/40 transition-all duration-200 hover:scale-105"
            onclick={() => shareOnLinkedIn()}
            title="Share on LinkedIn"
          >
            <div class="absolute inset-0 rounded-lg bg-gradient-to-br from-sky-500/5 to-transparent pointer-events-none"></div>
            <Linkedin class="h-5 w-5 relative z-10 group-hover:scale-105 transition-transform duration-200" />
          </button>
        </div>
      </div>
    {/if}
  </div>
{/if}
