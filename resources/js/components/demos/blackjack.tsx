import { useState } from 'react';
import { cn } from '@/lib/utils';

const CARD_BACK_SRC =
    '/game-assets/blackjack/SteamPunk%20Card%20Deck/1-Card%20Sets/Steampunk%20Card_Back-Simple%20Border.png';

const ASSETS = {
    base: '/game-assets/blackjack/SteamPunk%20Card%20Deck/2-Individual%20Images',
    other: '/game-assets/blackjack/SteamPunk%20Card%20Deck/2-Individual%20Images/3-Other',
} as const;

/** Card face background (no rank/suit). */
const CARD_FACE_BG = `${ASSETS.other}/Front%20of%20Card%20Main%20Image.png`;

const DESIGNATION_NAMES: Record<string, string> = {
    A: 'Ace',
    '2': 'Two',
    '3': 'Three',
    '4': 'Four',
    '5': 'Five',
    '6': 'Six',
    '7': 'Seven',
    '8': 'Eight',
    '9': 'Nine',
    '10': 'Ten',
    J: 'Jack',
    Q: 'Queen',
    K: 'King',
};

const SUIT_NAMES: Record<string, string> = {
    s: 'Spade',
    h: 'Heart',
    d: 'Diamond',
    c: 'Club',
};

/** Rank-only image for corners (1-Designations). */
function getDesignationSrc(cardId: string): string {
    const rank = cardId.slice(0, -1);
    const name = DESIGNATION_NAMES[rank];
    return `${ASSETS.base}/1-Designations/${name}.png`;
}

/** Center art image (2-Symbols): rank+suit. Asset has typo: Seven HEart.png */
function getSymbolSrc(cardId: string): string {
    const rank = cardId.slice(0, -1);
    const suit = cardId.slice(-1);
    const rankName = DESIGNATION_NAMES[rank];
    const suitName = SUIT_NAMES[suit];
    const filename =
        rank === 'J' || rank === 'Q' || rank === 'K'
            ? `${rankName} Image.png`
            : rank === '7' && suit === 'h'
              ? 'Seven HEart.png'
              : `${rankName} ${suitName}.png`;
    return `${ASSETS.base}/2-Symbols/${encodeURIComponent(filename)}`;
}

const CHIPS_BASE =
    '/game-assets/blackjack/SteamPunk%20Card%20Deck/2-Individual%20Images/3-Other';

const CHIP_OPTIONS = [
    { src: `${CHIPS_BASE}/PokerChipRed.png`, value: 5 },
    { src: `${CHIPS_BASE}/PokerChipBlue.png`, value: 10 },
    { src: `${CHIPS_BASE}/PokerChipGreen.png`, value: 25 },
];

const SUIT_SYMBOLS: Record<string, string> = {
    s: '♠',
    h: '♥',
    d: '♦',
    c: '♣',
};

type Card = { id: string; faceUp: boolean };

function shuffle<T>(arr: T[]): T[] {
    const out = [...arr];
    for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
}

function makeDeck(): Card[] {
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suits = ['s', 'h', 'd', 'c'];
    const cards: Card[] = [];
    ranks.forEach((r) => {
        suits.forEach((s) => {
            cards.push({ id: `${r}${s}`, faceUp: false });
        });
    });
    return shuffle(cards);
}

function cardValue(cardId: string): number {
    const rank = cardId.slice(0, -1);
    if (rank === 'A') return 11;
    if (['K', 'Q', 'J'].includes(rank)) return 10;
    return parseInt(rank, 10);
}

function handValue(cards: Card[]): number {
    const values = cards.map((c) => cardValue(c.id));
    let total = values.reduce((a, b) => a + b, 0);
    let aces = values.filter((v) => v === 11).length;
    while (total > 21 && aces > 0) {
        total -= 10;
        aces -= 1;
    }
    return total;
}

function cardLabel(cardId: string): string {
    const rank = cardId.slice(0, -1);
    const suit = SUIT_SYMBOLS[cardId.slice(-1)] ?? '';
    return `${rank}${suit}`;
}

type Phase = 'betting' | 'player-turn' | 'dealer-turn' | 'result';

export function BlackjackDemo() {
    const [deck, setDeck] = useState<Card[]>([]);
    const [playerHand, setPlayerHand] = useState<Card[]>([]);
    const [dealerHand, setDealerHand] = useState<Card[]>([]);
    const [balance, setBalance] = useState(1000);
    const [bet, setBet] = useState(0);
    const [phase, setPhase] = useState<Phase>('betting');
    const [message, setMessage] = useState('');

    function draw(): Card {
        const [card, ...rest] = deck;
        setDeck(rest);
        return { ...card, faceUp: true };
    }

    function dealCards() {
        if (phase !== 'betting' || bet <= 0 || bet > balance) return;
        setBalance((b) => b - bet);
        const newDeck = makeDeck();
        const player: Card[] = [
            { ...newDeck[0], faceUp: true },
            { ...newDeck[2], faceUp: true },
        ];
        const dealer: Card[] = [
            { ...newDeck[1], faceUp: true },
            { ...newDeck[3], faceUp: false },
        ];
        setDeck(newDeck.slice(4));
        setPlayerHand(player);
        setDealerHand(dealer);
        setPhase('player-turn');
        setMessage('');

        const playerTotal = handValue(player);
        if (playerTotal === 21) {
            const remainingDeck = newDeck.slice(4);
            setTimeout(
                () => endPlayerTurnWithHands(player, dealer, remainingDeck),
                0,
            );
        }
    }

    function hit() {
        if (phase !== 'player-turn') return;
        const newCard = draw();
        const newHand = [...playerHand, newCard];
        setPlayerHand(newHand);
        if (handValue(newHand) > 21) {
            setPhase('result');
            setMessage('Bust! Dealer wins.');
        }
    }

    function stand() {
        if (phase !== 'player-turn') return;
        endPlayerTurn();
    }

    function endPlayerTurn() {
        setPhase('dealer-turn');
        const d = [...dealerHand];
        d[1] = { ...d[1], faceUp: true };
        setDealerHand(d);

        let dealerCards = [...d];
        while (handValue(dealerCards) < 17) {
            const newCard = draw();
            dealerCards = [...dealerCards, newCard];
            setDealerHand(dealerCards);
        }

        resolve(dealerCards);
    }

    /** Used when player has 21 on initial deal: run dealer turn with the hands we just dealt (avoids stale state in setTimeout). */
    function endPlayerTurnWithHands(
        playerCards: Card[],
        initialDealer: Card[],
        remainingDeck: Card[],
    ) {
        setPhase('dealer-turn');
        const revealed: Card[] = [
            initialDealer[0],
            { ...initialDealer[1], faceUp: true },
        ];
        let dealerCards = [...revealed];
        const deckCopy = [...remainingDeck];
        while (handValue(dealerCards) < 17 && deckCopy.length > 0) {
            const card = deckCopy.shift()!;
            dealerCards = [...dealerCards, { ...card, faceUp: true }];
        }
        setDeck(deckCopy);
        setDealerHand(dealerCards);
        setPhase('result');
        resolveWithHands(dealerCards, playerCards);
    }

    function resolve(dealerCards: Card[]) {
        resolveWithHands(dealerCards, playerHand);
    }

    function resolveWithHands(dealerCards: Card[], playerCards: Card[]) {
        const pv = handValue(playerCards);
        const dv = handValue(dealerCards);

        if (dv > 21) {
            setMessage('Dealer busts! You win.');
            setBalance((b) => b + bet * 2);
        } else if (pv > dv) {
            const isBlackjack = playerCards.length === 2 && pv === 21;
            setMessage(isBlackjack ? 'Blackjack! You win.' : 'You win.');
            setBalance((b) => b + bet + (isBlackjack ? Math.floor(bet * 0.5) : bet));
        } else if (pv < dv) {
            setMessage('Dealer wins.');
        } else {
            setMessage('Push.');
            setBalance((b) => b + bet);
        }
        setPhase('result');
    }

    function newRound() {
        setPlayerHand([]);
        setDealerHand([]);
        setDeck([]);
        setBet(0);
        setPhase('betting');
        setMessage('');
    }

    function addToBet(amount: number) {
        if (phase !== 'betting') return;
        const newBet = bet + amount;
        if (newBet <= balance) setBet(newBet);
    }

    const playerTotal = handValue(playerHand);
    const dealerTotal = phase !== 'betting' ? handValue(dealerHand) : 0;
    const canDeal = phase === 'betting' && bet > 0 && bet <= balance;
    const canHitStand = phase === 'player-turn' && playerTotal < 21;

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 bg-[#0f6b0f] p-8">
            <h1 className="text-3xl font-bold text-white">BlackJack</h1>

            {/* Table: fixed layout so cards don't shift the page */}
            <div
                className="relative w-full max-w-2xl rounded-3xl p-6"
                style={{ minHeight: '380px' }}
            >
                {/* Deck: stacked card backs, neat stack (deal from here) */}
                <div className="absolute left-0 top-6 h-[9.5rem] w-[6.75rem]">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            className="absolute h-[8.75rem] w-[6.25rem] overflow-hidden rounded-lg border border-amber-800/50 bg-neutral-900 shadow"
                            style={{
                                left: i * 1.5,
                                top: i * 1.5,
                                transform: 'rotate(-2deg)',
                            }}
                        >
                            <img
                                src={CARD_BACK_SRC}
                                alt=""
                                className="h-full w-full object-cover object-top"
                            />
                        </div>
                    ))}
                </div>

                {/* Dealer area */}
                <div className="mb-6 min-h-[120px] rounded-xl border-2 border-amber-100/80 bg-black/20 p-4">
                    <p className="mb-2 text-center text-sm font-medium text-amber-100/90">
                        Dealer
                        {phase !== 'betting' && dealerHand.some((c) => c.faceUp) && (
                            <span className="ml-2 text-white">({dealerTotal})</span>
                        )}
                    </p>
                    <div className="flex min-h-[9rem] flex-wrap justify-center gap-3">
                        {dealerHand.map((card, i) => (
                            <div
                                key={`d-${card.id}-${i}`}
                                className="relative h-[8.75rem] w-[6.25rem] shrink-0 overflow-hidden rounded-lg border border-amber-800/50 bg-neutral-900 shadow-lg"
                            >
                                {card.faceUp ? (
                                    <div
                                        className="relative h-full w-full"
                                        role="img"
                                        aria-label={cardLabel(card.id)}
                                    >
                                        <img
                                            src={CARD_FACE_BG}
                                            alt=""
                                            className="absolute inset-0 z-0 h-full w-full object-cover"
                                        />
                                        <img
                                            src={getSymbolSrc(card.id)}
                                            alt=""
                                            className="absolute inset-0 z-[1] h-full w-full object-contain p-2"
                                        />
                                        <img
                                            src={getDesignationSrc(card.id)}
                                            alt=""
                                            className="absolute left-0 top-0 z-[2] h-[36%] w-auto max-w-[48%] object-contain object-left-top"
                                        />
                                    </div>
                                ) : (
                                    <img
                                        src={CARD_BACK_SRC}
                                        alt=""
                                        className="h-full w-full object-cover object-top"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Message strip */}
                <div className="mb-4 min-h-[2rem] text-center">
                    {message && (
                        <p className="text-lg font-semibold text-amber-200">{message}</p>
                    )}
                </div>

                {/* Center: bet amount */}
                <div className="mb-6 min-h-[2.5rem] flex items-center justify-center">
                    {bet > 0 && (
                        <span className="rounded-lg bg-black/30 px-5 py-2 text-lg font-semibold text-amber-200">
                            Bet: ${bet}
                        </span>
                    )}
                </div>

                {/* Player area */}
                <div className="min-h-[120px] rounded-xl border-2 border-amber-100/80 bg-black/20 p-4">
                    <p className="mb-2 text-center text-sm font-medium text-amber-100/90">
                        Player
                        {playerHand.length > 0 && (
                            <span className="ml-2 text-white">({playerTotal})</span>
                        )}
                    </p>
                    <div className="flex min-h-[9rem] flex-wrap justify-center gap-3">
                        {playerHand.map((card, i) => (
                            <div
                                key={`p-${card.id}-${i}`}
                                className="relative h-[8.75rem] w-[6.25rem] shrink-0 overflow-hidden rounded-lg border border-amber-800/50 bg-neutral-900 shadow-lg"
                            >
                                {card.faceUp ? (
                                    <div
                                        className="relative h-full w-full"
                                        role="img"
                                        aria-label={cardLabel(card.id)}
                                    >
                                        <img
                                            src={CARD_FACE_BG}
                                            alt=""
                                            className="absolute inset-0 z-0 h-full w-full object-cover"
                                        />
                                        <img
                                            src={getSymbolSrc(card.id)}
                                            alt=""
                                            className="absolute inset-0 z-[1] h-full w-full object-contain p-2"
                                        />
                                        <img
                                            src={getDesignationSrc(card.id)}
                                            alt=""
                                            className="absolute left-0 top-0 z-[2] h-[36%] w-auto max-w-[48%] object-contain object-left-top"
                                        />
                                    </div>
                                ) : (
                                    <img
                                        src={CARD_BACK_SRC}
                                        alt=""
                                        className="h-full w-full object-cover object-top"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom left: Hit, Stand, New Round */}
            <div className="fixed bottom-8 left-8 flex flex-wrap gap-3">
                {canHitStand && (
                    <>
                        <button
                            type="button"
                            onClick={hit}
                            className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-green-500"
                        >
                            Hit
                        </button>
                        <button
                            type="button"
                            onClick={stand}
                            className="rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-amber-500"
                        >
                            Stand
                        </button>
                    </>
                )}
                {phase === 'result' && (
                    <button
                        type="button"
                        onClick={newRound}
                        className="rounded-lg bg-neutral-600 px-6 py-3 font-semibold text-white transition hover:bg-neutral-500"
                    >
                        New Round
                    </button>
                )}
            </div>

            {/* Bottom middle: Clear bet, Deal */}
            {phase === 'betting' && (
                <div className="fixed bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
                    <button
                        type="button"
                        onClick={() => setBet(0)}
                        className="rounded-lg border border-amber-100/50 px-4 py-2 text-sm text-amber-100/90 transition hover:bg-black/20"
                    >
                        Clear bet
                    </button>
                    <button
                        type="button"
                        onClick={dealCards}
                        disabled={!canDeal}
                        className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-green-500 disabled:opacity-50"
                    >
                        Deal
                    </button>
                </div>
            )}

            {/* Bottom right: balance + clickable chips */}
            <div className="fixed bottom-8 right-8 flex flex-col items-end gap-4">
                <div className="rounded-lg bg-black/30 px-4 py-2">
                    <span className="text-amber-100/90">Balance </span>
                    <span className="text-xl font-bold text-amber-200">${balance}</span>
                </div>
                <div className="flex items-end gap-4">
                {CHIP_OPTIONS.map((chip) => (
                    <button
                        key={chip.value}
                        type="button"
                        onClick={() => addToBet(chip.value)}
                        disabled={phase !== 'betting' || chip.value > balance - bet}
                        className="flex flex-col items-center transition hover:scale-105 disabled:cursor-default disabled:opacity-70 disabled:hover:scale-100"
                        title={phase === 'betting' ? `$${chip.value}` : 'Place bet next round'}
                    >
                        <img
                            src={chip.src}
                            alt={`$${chip.value} chip`}
                            className="h-14 w-14 object-contain drop-shadow-lg md:h-16 md:w-16"
                        />
                        <span className="mt-1 text-xs font-medium text-amber-100/90">
                            ${chip.value}
                        </span>
                    </button>
                ))}
                </div>
            </div>
        </div>
    );
}
