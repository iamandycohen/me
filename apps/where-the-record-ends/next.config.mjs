import { assertValidPublicGenealogyContent } from '@where-the-record-ends/genealogy-content';

assertValidPublicGenealogyContent();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@where-the-record-ends/genealogy-content'],
};

export default nextConfig;
