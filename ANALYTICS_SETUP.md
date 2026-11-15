# Configuration de Vercel Web Analytics

L’administration affiche les visites dans `/admin/statistiques` sur les périodes de 7 ou 30 jours. Les données sont lues côté serveur depuis l’API Vercel ; le jeton n’est jamais envoyé au navigateur.

## Configuration Vercel

1. Dans le projet Vercel, activer **Web Analytics**.
2. Créer un jeton depuis [Account Tokens](https://vercel.com/account/tokens). Donner un nom reconnaissable et choisir le scope le plus limité disponible : l’équipe qui possède le projet, puis le projet Fastdetailing seul si Vercel le propose.
3. Copier le jeton une seule fois dans **Project → Settings → Environment Variables** :
   - `VERCEL_ANALYTICS_TOKEN` : le jeton créé à l’étape précédente.
   - `VERCEL_ANALYTICS_PROJECT_ID` : l’identifiant du projet, dans **Settings → General**.
   - `VERCEL_ANALYTICS_TEAM_ID` : l’identifiant de l’équipe, obligatoire pour un projet d’équipe. Pour un projet personnel, laisser cette variable vide.
4. Cibler **Production** et, si souhaité, **Preview**, puis sauvegarder et redéployer.

Ne pas préfixer ces variables par `NEXT_PUBLIC_`, ne pas les écrire dans `.env.example` et ne pas committer leur valeur. Pour le développement local, utiliser `.env.local`, qui doit rester privé.

La collecte ne démarre qu’après activation de Web Analytics et déploiement. Avant l’activation en production, valider et publier les informations de confidentialité applicables ; voir [ANALYTICS_PRIVACY_DRAFT.md](ANALYTICS_PRIVACY_DRAFT.md).
