import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A landing sai como site estático (out/), servido pelo Cloudflare Workers. Os números,
  // os esportes e os planos vêm da API no build; o rebuild agendado em
  // .github/workflows/rebuild-agendado.yml os mantém atualizados.
  output: "export",
};

export default nextConfig;
