# Restock Design System

Restock is a mobile app for households. Everyone in the home adds to one shared weekly shopping list, checks things off in the store, and sees how much was spent in each category (produce, dairy, pantry, treats, household) against a weekly budget.

The audience is people in their 20s–30s sharing a home: couples, roommates, young families. The brand should make grocery shopping feel fun and low-stress. It is warm and playful, but stays adult and calm.

## Sources
All provided as uploads; originals are kept in `guidelines/references/`:
- `palette-source.jpg`: "Mountain Sunset" palette. **This is the source of truth for colour** (#C4C3E3, #504E76, #FDF8E2, #A3B565, #FCDD9D, #F1642E).
- `gradient-reference.jpg`: soft blurred gradient cards (style reference only; its colours are not used).
- `app-layout-reference.jpg`, `card-grid-reference.jpg`: cream backgrounds, square ingredient tiles, pill buttons.
- `component-inventory-reference.jpg`: open-source wireframe kit, used as the component checklist (buttons, steppers, inputs, toggles, tags, segment control, progress, tab bar).
- `type-pairing.png`: Figtree for headings, Manrope for paragraphs.
- `stickers-price.jpg`, `stickers-fruit-1/2/3.jpg`: price-tag and fruit-label stickers. These inspired the `Sticker` component. They contain third-party trademarks, so they are reference only and never shipped as assets.
- Fonts: Figtree (roman + italic variable) and Manrope (variable) TTFs, in `fonts/`.

No codebase, Figma file or logo was provided.

---

## Content fundamentals
- **Voice:** a friendly housemate who is good with money. Warm, a little witty, never preachy. Talk to the user as **you**, and to the household as **we / the team**. The app never says "I".
- **Casing:** sentence case for everything: titles, buttons, tabs ("Add to list", "This week’s list"). The only uppercase text is small eyebrows ("WEEK OF NOV 3") and sticker labels.
- **Money talk is calm:** never use alarm words like "Warning" or "Exceeded". Over budget reads as "฿210 over — no stress, it happens". Under budget gets a small celebration ("You’re ฿500 under budget", "Nice work, team.").
- **Use people’s names:** "Sam’s doing the run", "Maya added 3 things". It's a shared list, so attribution makes it feel human.
- **Short and concrete:** "6 things left to grab", "Add anything by Friday night." Use numerals for counts and money (฿4,995; tabular figures). Currency is Thai Baht: ฿ prefix, no space, whole baht with thousands commas.
- **Buttons are verbs:** Add item, Invite someone, See breakdown. Use "Cancel" / "Done", not "Dismiss".
- **Emoji:** none in UI chrome. Users' own item names may include them. Use stickers and icons for playful moments instead.
- **Humour:** at most one light touch per screen ("Maya’s birthday cake counts as a necessity"). Never at the user's expense.

## Visual foundations
- **Colour:** six palette hues. **Cream** (#FDF8E2) is the app background; cards use a lighter cream (#FFFDF6), so the UI never sits on stark white. **Dusk** (#504E76) is the primary action colour and, darkened to #26243D, all text. **Tangerine** (#F1642E) is the accent: the add button, sale stickers and over-budget states. **Sage** means done/success and produce, **lavender** means dairy and soft secondary fills, and **apricot** is for warm highlights (stepper buttons, select chevrons, near-budget). Each spending category owns one hue (see `--cat-*`).
- **Type:** Figtree for headings and all numbers (weights 600–900, tight tracking, -0.02 to -0.03em on large sizes). Manrope for body, labels and captions (500 body, 700 labels). Money always uses `font-variant-numeric: tabular-nums`.
- **Gradients + grain:** the signature surface. Soft mesh gradients built only from palette colours (`--grad-sunset`, `--grad-peach`, `--grad-meadow`, `--grad-dusk`), always overlaid with SVG film grain (`--grain`, soft-light, about 32% opacity). Use at most one gradient hero per screen: weekly spend, next shop, onboarding. Never use them as full-page backgrounds or behind long text.
- **Stickers:** fruit-label / price-tag stickers (`Sticker`) are the playful accent. They come in circle, oval, tag and burst shapes, have an inner ring and grain, and are rotated ±4–12°. They mark deals, savings, milestones and empty states. Use no more than two per screen, and let them overlap card edges.
- **Backgrounds:** flat cream. There is no photography in the system. Product imagery is optional and, if used, should be warm and naturally lit on cream/beige backgrounds, as in the layout references.
- **Corner radii:** generous. Controls 14px, cards 20px, hero cards 28px, sheets 36px. Buttons, tags, segmented controls and the tab bar are full pills.
- **Cards:** flat by default (cream-50 on cream-100, no border, no shadow). Tinted variants (lavender, sage, apricot) group related content. Shadows are reserved for floating things: the tab bar, sheets and the FAB.
- **Borders:** 1.5px. Use the warm beige `--border-1` for inputs and tiles, and dusk for outlined secondary buttons and selected tiles.
- **Shadows:** warm dusk-tinted at low alpha (`--shadow-xs…lg`). No hard drop shadows and no inner glow.
- **Spacing:** 4-based scale with a 20px screen gutter. Vertical rhythm is 16–20px between blocks and 8–10px between list rows. Tap targets are at least 44px; controls are 36/48/56px.
- **Layout:** single column on mobile. A floating pill tab bar plus a tangerine FAB sit 24px from the bottom, and content gets 120px of bottom padding so it can scroll under them. The status bar area is plain.
- **Transparency & blur:** only for chips or buttons sitting on gradients (cream at 55–60% with a 12–16px backdrop blur), and for the sheet scrim (dusk at 38%).
- **Motion:** quick and soft. Movement uses `--ease-out` (sheets slide up 320ms, bars fill 320ms). Toggles, radio dots and check-offs use `--ease-spring` (200ms). Fades are short and there are no page-level transitions.
- **Hover / press:** on press, buttons scale to 0.97, icon buttons to 0.92 and tiles to 0.96. Primary hover darkens dusk-500 to dusk-700, and accent hover darkens tangerine-500 to tangerine-700. Focus shows a 4px lavender-100 halo with a dusk border.
- **Checked items:** strikethrough in sage, text fades to `--text-3`, and the sage checkbox fills.

## Iconography
- **Icon set: [Lucide](https://lucide.dev)**, loaded from CDN as the `lucide-static@0.454.0` icon font (`tokens/icons.css`). Use it as `<i class="icon-carrot"></i>` or the `<Icon name="carrot" />` component. **This is a substitution**: no icon set was supplied. Lucide's rounded 2px stroke matches the soft, friendly shapes.
- Icons are drawn in `--dusk-700` and sit inside tinted rounded-square chips (44px, radius 14) for categories, or bare at 18–22px in controls.
- Category icons: produce `carrot`, dairy `milk`, pantry `wheat`, treats `cookie`, household `spray-can`.
- No emoji, and no unicode characters used as icons. Stickers (`Sticker`) are the "illustration" layer. No custom SVG illustrations exist.
- **Logo:** none was provided. The brand name is set in Figtree 800 lowercase ("restock", -0.04em) wherever a mark would go. This is a placeholder, not a logo.

---

## Index
- `styles.css`: entry point (imports only) → `tokens/` (fonts, colors, typography, spacing, effects, gradients, icons, base)
- `fonts/`: Figtree + Manrope variable TTFs
- `guidelines/`: foundation specimen cards; `references/` holds the source images
- `components/`: React primitives (one card per folder)
- `ui_kits/app/`: interactive mobile app recreation (`index.html`)
- `thumbnail.html`, `SKILL.md`

### Components
- **core:** Button, IconButton, Icon, Tag, Badge, Avatar
- **forms:** Input, Select, Checkbox, Radio, Toggle, Stepper, SegmentedControl
- **feedback:** ProgressBar, PageDots
- **navigation:** TabBar
- **surfaces:** Card, GradientCard, Sheet
- **list:** ShoppingItem, ItemTile, CategoryBudget
- **brand:** Sticker

### Intentional additions
No source defined a component library, so this standard set was authored to fit the wireframe-kit inventory. The product-specific additions are:
- ShoppingItem, ItemTile, CategoryBudget: core Restock patterns (list row, quick-add tile, category budget row).
- GradientCard: carries the grain-gradient brand surface.
- Sticker: the brand's sticker motif.
- Sheet: needed for the add-item flow.
- Icon: wrapper for the Lucide font.

### UI kits
- `ui_kits/app/`: Home, List, Add item sheet, Spending, Household.
