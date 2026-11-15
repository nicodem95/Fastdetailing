# Brouillon d’information sur Vercel Web Analytics

**Brouillon interne à valider avant activation de la collecte en production.** Ce document n’est pas un avis juridique et ne doit pas être publié tel quel sans validation des points entre crochets.

## Texte proposé

Nous utilisons Vercel Web Analytics afin de mesurer la fréquentation de notre site et d’en améliorer le contenu. Les statistiques peuvent inclure les pages consultées, le référent, une localisation approximative ainsi que des informations sur l’appareil, le système d’exploitation et le navigateur. Selon la documentation de Vercel, le service n’utilise pas de cookies tiers et établit une mesure de visite à partir d’un identifiant haché dont la session est supprimée après 24 heures. Les données sont utilisées sous forme agrégée pour produire des statistiques de fréquentation.

**À compléter avant publication :** [base juridique et éventuelle exemption applicable], [durée de conservation des données agrégées selon l’offre Vercel utilisée], [destinataires et sous-traitants], [lieu de traitement et éventuels transferts], [coordonnées du responsable et modalités d’exercice des droits].

## Points à confirmer

- Vercel décrit les mesures, identifiants et durées de session dans sa [documentation de confidentialité Web Analytics](https://vercel.com/docs/analytics/privacy-policy). Ces éléments doivent être rapprochés des réglages et conditions réellement applicables au projet.
- La durée de conservation des rapports varie selon l’offre Vercel ; l’offre du projet n’est pas vérifiée ici.
- Le texte ne détermine ni la base juridique, ni l’applicabilité d’une exemption de consentement, ni les éventuels transferts de données.
- Le suivi exclut les chemins `/admin`, `/auth` et `/api` afin de ne pas compter les pages d’administration, d’authentification et d’API dans les statistiques publiques.
