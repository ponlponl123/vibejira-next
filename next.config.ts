/** @type {import('next').NextConfig} */
import { version } from './package.json';

const nextConfig = {
  publicRuntimeConfig: {
    version,
  }
};

module.exports = nextConfig;
