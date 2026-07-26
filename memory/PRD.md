# PRD — Widad International Volunteers (WIV)

## Problem statement (original)
Site vitrine professionnel, moderne et responsive pour l'ONG "Widad International Volunteers" (Cameroun), approche "startup humanitaire" : innovation, entrepreneuriat durable, inclusion numérique pour réfugiés et populations locales. Slogan hero : « Co-créer le futur : quand l'exil devient une force d'innovation durable. »

Contacts (partout) : widadinternationalvolunteers@gmail.com · WhatsApp +237 677 958 119 · Cameroun.

## User choices
- Paiements : Stripe + PayPal
- Contact : envoi email réel (Resend) + stockage en base
- Multilingue : FR (défaut) + EN
- Design : base bleu (#0033FF) / blanc, style startup à impact (Clash Display + Outfit)

## Architecture
- Backend FastAPI (`/app/backend/server.py`), MongoDB. Endpoints: `/api/config`, `/api/payments/donate`, `/api/payments/status/{id}`, `/api/stripe/webhook`, `/api/contact`, `/api/paypal/create-order`, `/api/paypal/capture-order`.
- Frontend React + Tailwind + framer-motion + lenis. Routes: `/`, `/don`, `/contact`, `/payment/success`, `/payment/cancel`.
- i18n maison (`src/i18n/translations.js` + `LanguageContext`).

## What's been implemented (2026-07-26 — MVP)
- Nav sticky glass (logo WIV, menu complet, dropdown "Nous contacter" Email/WhatsApp, switch FR/EN, burger mobile).
- Hero cinétique (révélation ligne par ligne, parallax photo, stats, 2 CTA).
- Marquee éditorial, "Notre Esprit" (3 piliers à chapitres numérotés).
- "Nos 3 Espaces Clés" : Makerspace & Tech Lab, Incubateur Green Startups, Coliving & Campus Nomade — sous-programmes détaillés, boutons Email + WhatsApp sous chaque bloc ET chaque projet.
- Feuille de route (timeline verticale 3 étapes).
- Page Don : montants 10/25/50/100 + libre, formulaire nom/email, Stripe Checkout (sandbox réclamable, actif), PayPal (bouton, activable via clés), pages succès/annulation avec polling.
- Page Contact : formulaire (stocké en base + email Resend si clé), boutons directs, localisation Cameroun, réseaux placeholders.
- Footer complet, SEO meta, bilingue.
- Testé : backend 100%, frontend 100% (iteration_1.json).

## Integrations status
- Stripe : ACTIF (sandbox réclamable). Mode taxe : DIY (dons non taxables — pas de calcul de taxe).
- PayPal : EN ATTENTE de PAYPAL_CLIENT_ID / PAYPAL_SECRET (dégrade proprement, endpoint 503, bouton désactivé).
- Resend (email) : EN ATTENTE de RESEND_API_KEY (contact stocké, email_sent=false).

## Backlog / Next
- P0 : fournir clés PayPal + Resend (+ vérifier un domaine Resend pour envoyer à l'adresse Gmail en prod).
- P1 : réclamer le compte Stripe (onboarding) avant déploiement.
- P2 : sitemap.xml, images optimisées auto, page "Widad Fest", galerie photos réelles, dashboard admin des dons/messages.
