# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a single-page personal photography portfolio website for Rami Adam (ramiadam.com), deployed via GitHub Pages to `www.ramiadam.com` (CNAME configured). There is no build step — the site is pure HTML/CSS/JS in a single `index.html` file.

## Structure

- `index.html` — the entire site: nav, hero section, photo gallery, contact section, footer
- `photos/` — portfolio images referenced directly in `index.html`
- `logo.png`, `favicon*.png`, `favicon.ico`, `apple-touch-icon.png` — brand assets
- `CNAME` — GitHub Pages custom domain config (`www.ramiadam.com`)
- `.well-known/` — Apple Pay merchant domain verification

## Key Design Decisions

- **No framework or build tooling** — edit `index.html` directly; changes are live on push
- **All CSS is inline** in `<style>` within the `<head>` — no separate stylesheet
- **Lightbox2** (CDN) handles gallery photo enlargement via `data-lightbox="rami"` attributes
- **Google Fonts** loads "Sour Gummy" for all typography
- Color scheme: black background (`#000`/`#111`), white text, gold accents (`#FFD700`)
- Gallery uses CSS Grid with `auto-fit, minmax(300px, 1fr)` for responsive layout

## Deployment

Push to `main` branch — GitHub Pages deploys automatically. No CI, no build process.

## Adding Photos

Add the image file to `photos/`, then add a `<div class="gallery-item">` block to the gallery grid in `index.html`, following the existing pattern with `data-lightbox="rami"` and a `data-title` for the caption.
