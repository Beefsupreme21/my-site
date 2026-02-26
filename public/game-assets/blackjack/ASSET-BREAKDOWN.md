# SteamPunk Card Deck – Asset breakdown

The deck is **modular**: full card faces are built from separate pieces, not single PNGs per card.

---

## 1. `1-Card Sets/` – Pre-made full cards (backs only)

| File | Description |
|------|--------------|
| `Steampunk Card_Back-Simple Border.png` | Card back (used for deck stack & face-down cards) |
| `Steampunk Card_Back-Ring Border.png` | Alternate card back |

No full **front** faces here; fronts are assembled from the pieces below.

---

## 2. `2-Individual Images/` – Pieces to build a card

### `1-Designations/` – **Rank labels (numbers / letters)**

One image per rank. Content is the rank only (e.g. “A”, “2” … “10”, “J”, “Q”, “K”), often shown twice (upright + upside-down for card corners). No suit, no background – meant to be overlaid on the card.

| File | Rank |
|------|------|
| Ace.png, Two.png … Ten.png | A, 2–10 |
| Jack.png, Queen.png, King.png | J, Q, K |
| Joker.png | Joker |

**Use:** Layer on the card (e.g. corners) to show the rank.

---

### `2-Symbols/` – **Center art (rank + suit)**

One image per playing card: the **center illustration** (suit symbol + rank art). Not a full card – no border, no corner numbers. Examples: `Ace Spade.png`, `Two Heart.png`, `King Image.png`, `Royal Spade.png` (Queen), etc.

- **Numbered cards:** `{Rank} {Suit}.png` (e.g. `Seven Spade.png`, `Ten Diamond.png`).  
  Note: `Seven HEart.png` (typo) = 7 of hearts.
- **Face cards:** `King Image.png`, `Queen Image.png`, `Jack Image.png` (one image per face, shared across suits).
- **Joker:** `Joker Image.png`

**Use:** Center of the card face.

---

### `3-Other/` – **Card backgrounds, borders, chips, misc**

**Card fronts (backgrounds only – no rank/suit):**

| File | Description |
|------|--------------|
| `Front of Card Main Image.png` | Main card-face background (steampunk aged look) |
| `Smooth Border Front_Back.png` | Blank card with smooth dark border |
| `Detailed Border Front_Back.png` | Blank card with detailed border |

**Card backs (alternate / decorative):**

| File | Description |
|------|--------------|
| `Back of Card Image Main.jpg` | Back artwork |
| `Back of Card Large Gear.png` / `...Combo.png` | Gear-style back art |
| `Smooth Border Back Ring.png` | Back with ring border |
| `Detailed Border Back Ring.png` | Back with detailed ring |

**Chips:**

| File | Use |
|------|-----|
| PokerChipRed.png, PokerChipBlue.png, PokerChipGreen.png | Bet chips |

**Other:** Character card assets (name, notes, info, image) – likely for a different card type, not standard playing cards.

---

## 3. `3-Sprite Sheets/` – Animation

| File | Likely use |
|------|------------|
| Card Flip1.png … Card Flip4.png | Flip/deal animation frames |

---

## How to build one card face

1. **Background** – Use one of: `Front of Card Main Image.png`, `Smooth Border Front_Back.png`, or `Detailed Border Front_Back.png`.
2. **Rank (corners)** – Use the right file from `1-Designations/` (Ace.png, Two.png, … King.png).
3. **Center art** – Use the right file from `2-Symbols/` (e.g. Ace Spade.png, Ten Heart.png, King Image.png).

Layer order: background → designation (rank) → symbol (center). Positions/sizes depend on the art (e.g. designation in corners, symbol centered).
