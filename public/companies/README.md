# Bilder för företagssidorna

Företagssidorna (`/hec-kilimanjaro-safaris`, `/smart-escapes`) fungerar utan bilder:
varje bildplats visar en tom platshållare tills en bild är utpekad i datan. Platserna
går att hitta i HTML:en via attributet `data-slot="{slug}/{plats}"`.

## Så lägger du in en bild

1. Lägg filen i `public/companies/{slug}/` med filnamnet i tabellen nedan
   (JPG, WebP eller PNG; `.jpg` används som exempel).
2. Peka ut den i företagets datafil `data/company-profiles/{slug}.ts` (fältet i
   kolumnen "Datafält"):
   ```ts
   history: {
     // ...
     image: {
       src: "/companies/hec-kilimanjaro-safaris/history.jpg",
       alt: { sv: "Emma och teamet framför kontoret" },
     },
   },
   ```
3. **Alt-text är obligatorisk när `src` sätts** (`alt: { sv: "..." }`, engelska kan
   läggas till som `en`). Utan `src` behövs ingen alt-text (platshållaren är dold för
   skärmläsare). Ingen kodändring krävs i komponenterna.

Logotypen är ett undantag: den pekas ut i `data/companies.ts` (fältet `logo`, en ren
sökväg). Saknas den visas företagsnamnet som text. Befintliga logotyper i
`public/images/companies/` ska inte ändras.

Rekommenderade proportioner utgår från skärmdumparna av originalsidorna. Bilderna
beskärs med `object-fit: cover`, så håll motivet centrerat. Ladda upp minst dubbla
visningsbredden för skarp visning på hög-DPI-skärmar.

## Bildplatser (gäller båda företagen)

`{slug}` är `hec-kilimanjaro-safaris` respektive `smart-escapes`.

| Plats | `data-slot` | Fil | Proportion (rekommenderad storlek) | Datafält i `data/company-profiles/{slug}.ts` |
|---|---|---|---|---|
| Hero (bakgrund) | `{slug}/hero` | `public/companies/{slug}/hero.jpg` | 16:9, bred (≥ 2400×1350). Text ligger över nedre delen | `heroImage` |
| Vår historia | `{slug}/history` | `public/companies/{slug}/history.jpg` | 1:1, beskärs till cirkel (≥ 1200×1200) | `history.image` |
| Grundaren | `{slug}/founder` | `public/companies/{slug}/founder.jpg` | 1:1, cirkel (≥ 1200×1200) | `founder.image` |
| Teamet | `{slug}/team` | `public/companies/{slug}/team.jpg` | 1:1, cirkel (≥ 1200×1200) | `team.image` |
| Upplevelse 1–6 | `{slug}/experience-1` … `experience-6` | `public/companies/{slug}/experience-1.jpg` … `experience-6.jpg` | 4:3 (≥ 1200×900) | `experiences.items[0].image` … `items[5].image` |
| Galleri 1–8 | `{slug}/gallery-1` … `gallery-8` | `public/companies/{slug}/gallery-1.jpg` … `gallery-8.jpg` | 1:1 (≥ 1200×1200) | `gallery.slots[0]` … `slots[7]` |
| Det som gör oss unika | `{slug}/unique` | `public/companies/{slug}/unique.jpg` | 1:1, cirkel (≥ 1200×1200) | `unique.image` |
| Avslutningen | `{slug}/closing` | `public/companies/{slug}/closing.jpg` | 1:1, cirkel (≥ 1200×1200) | `closing.image` |
| Logotyp | (ingen platshållare; företagsnamnet visas som text) | `public/companies/{slug}/logo.svg` (eller `.png`) | ca 8:5 (≥ 830×520), används på korten och i kontaktformuläret | `logo` i `data/companies.ts` |

Galleriremsan visar bilderna två gånger för en sömlös loop. Kopian får automatiskt
`data-slot="{slug}/gallery-N-loop-copy"` och pekas inte ut separat.

## Per företag

| Företag | Upplevelser | Galleri |
|---|---|---|
| `hec-kilimanjaro-safaris` | 6 (Kilimanjaro, Mount Meru, Oldonyo Lengai, Great Migration, Södra Tanzania, Safari & Zanzibar) | 8 |
| `smart-escapes` | 6 (Bush to Beach, Southern Circuit, Mikumi/Udzungwa/Nyerere, Ruaha, Mikumi, Luxury Escapes) | 8 |

Totalt 20 bildplatser per företag plus logotypen.

## Nytt företag

Lägg en post i `data/companies.ts` med en `profile` (se de två befintliga filerna i
`data/company-profiles/` som mall). Sidan `/{slug}` skapas då automatiskt, med
platshållare för alla bilder. Slugen får inte vara samma som en kategori eller en
reserverad route (bygget stoppas i så fall, se `data/routes.ts`).
