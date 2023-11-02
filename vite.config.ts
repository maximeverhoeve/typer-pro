import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
    define: {
      __APP_ENV__: process.env.VITE_VERCEL_ENV,
    },
  };
});
