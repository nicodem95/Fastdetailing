# Fast Detailing - Site vitrine

Site statique HTML/CSS/JS multi-pages prêt pour un hébergement simple chez OVH mutualisé.

## Arborescence

- `index.html` : accueil synthétique avec accès direct aux pages.
- `prestations.html` : page dédiée aux services.
- `avant-apres.html` : page dédiée aux comparatifs.
- `realisations.html` : galerie filtrable.
- `pare-brise.html` : bloc commercial pare-brise.
- `contact.html` : coordonnées et formulaire.
- `assets/css/style.css` : styles responsive mobile-first.
- `assets/js/main.js` : menu mobile, filtres galerie, sliders avant/après, fallback images, formulaire mailto.
- `robots.txt` : consignes d'indexation.
- `sitemap.xml` : sitemap de base.

## Remplacer les images

Les images actuelles sont déjà branchées sur les fichiers présents dans `assets/`.

Pour remplacer plus tard, gardez les mêmes sections logiques et mettez vos nouvelles photos dans les dossiers suivants si vous voulez une structure propre:

- `assets/images/hero/`
- `assets/images/avant-apres/`
- `assets/images/garage-exterieur/`
- `assets/images/garage-interieur/`
- `assets/images/interieur-voiture/`
- `assets/images/phares/`
- `assets/images/sieges/`
- `assets/images/moto/`

Le script JS prévoit un fallback visuel si une image manque.

## Modifier les textes et contacts

Les infos principales sont dans `index.html`:

- Téléphone: `06 54 14 99 76`
- Email: `fastdetailing27140@gmail.com`
- Instagram: `https://www.instagram.com/fastdetailing27140/`
- Horaires: `09h00 – 19h00`

Les CTA téléphone, email, WhatsApp et Instagram sont déjà cliquables.

## Publication sur OVH

1. Déposez tous les fichiers à la racine du webspace.
2. Vérifiez que `index.html` reste en page d'accueil.
3. Conservez les chemins relatifs tels quels.
4. Si vous changez de domaine, remplacez la base URL utilisée dans `index.html`, `prestations.html`, `avant-apres.html`, `realisations.html`, `pare-brise.html`, `contact.html`, `robots.txt` et `sitemap.xml`.

## SEO à faire ensuite

- Remplacer `https://fastdetailing.example/` par votre vrai domaine.
- Ajouter l'adresse exacte si vous voulez un `LocalBusiness` encore plus précis.
- Brancher de vraies balises `Open Graph` avec vos meilleures images définitives.
- Ajouter des avis Google intégrés si vous en avez.
- Ajouter une vraie adresse si vous souhaitez un balisage local plus précis.
- Ajouter éventuellement une page par service si vous voulez aller encore plus loin sur le SEO local.

## Formulaire

Le formulaire de contact ouvre la messagerie avec un `mailto:` prérempli. Si vous voulez un envoi serveur réel, ajoutez un petit endpoint PHP sur OVH plus tard.