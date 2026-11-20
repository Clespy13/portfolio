import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://clespy.fr',
  integrations: [icon(), sitemap()],
  server: {
    allowedHosts: ['.clespy.fr'],
  },
  vite: {
    build: { cssMinify: false },          // temporary, see below
    preview: {
      allowedHosts: ['.clespy.fr'],       // clespy.fr and every subdomain
    },
  },
});
