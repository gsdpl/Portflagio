# Gaspard Duplaix — Portfolio

Portfolio bilingue construit avec Next.js, TypeScript, Tailwind CSS, Motion et MDX.

## Développement

```bash
npm install
npm run dev
```

Ouvrir `http://localhost:3000`. La racine redirige vers `/en`; la version française est disponible sur `/fr`.

## Contenu

Les études de cas sont stockées dans `content/projects/<slug>/<locale>.mdx`. Les métadonnées visuelles partagées se trouvent dans `src/data/projects.ts`.

## Vérification

```bash
npm run lint
npm run typecheck
npm run build
```

## Déploiement

Importer le dépôt dans Vercel. Aucun secret ni variable d’environnement n’est nécessaire.
