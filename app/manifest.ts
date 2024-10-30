import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Calculadora de Riesgo Cardiovascular',
    short_name: 'Riesgo Cardiovascular',
    description: 'Aplicación web progresiva de la clínica Unitat de Salut Cardiovascular para calcular el riesgo cardiovascular de forma sencilla y efectiva.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#254fc2',
    icons: [
      {
        src: '/images/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        "src": "/images/web-app-manifest-144x144.png",
        "sizes": "144x144",
        "type": "image/png",
        "purpose": "any"
      },
      {
        src: '/images/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
    ],
  }
}
