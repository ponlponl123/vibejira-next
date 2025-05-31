/** @type {import('next').NextConfig} */
import { NextConfig } from 'next';
import { version } from './package.json';

export const nextConfig: NextConfig = {
  publicRuntimeConfig: {
    version,
  },
  output: 'standalone'
}

export default nextConfig;