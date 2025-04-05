/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // This is needed to ensure environment variables are loaded properly
        serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
      },
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
