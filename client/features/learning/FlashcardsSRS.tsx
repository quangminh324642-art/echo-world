import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SRScard } from "./data";

// Leitner boxes -> days interval
const BOX_INTERVALS_DAYS = [0, 1, 2, 5, 10, 20]; // index = box (0..5)

export type Deck = { id: string; name: string; cards: SRScard[] };

type CardState = {
  id: string;
  box: number; // 0..5
  dueAt: number; // timestamp ms
};

type PersistState = Record<string, CardState>; // key: cardId

function now() {
  return Date.now();
}

function nextDue(box: number) {
  const days = BOX_INTERVALS_DAYS[Math.max(0, Math.min(BOX_INTERVALS_DAYS.length - 1, box))];
  return now() + days * 24 * 60 * 60 * 1000;
}

function storageKey(deckId: string) {
  return `jph.srs.${deckId}`;
}

export default function FlashcardsSRS({ decks, initial }: { decks: Deck[]; initial?: string }) {
  const [deckId, setDeckId] = useState(initial || decks[0]?.id);
  const deck = useMemo(() => decks.find((d) => d.id === deckId) || decks[0], [decks, deckId]);

  const [state, setState] = useState<PersistState>({});
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(storageKey(deck.id));
    setState(raw ? (JSON.parse(raw) as PersistState) : {});
    setFlipped(false);
  }, [deck.id]);

  useEffect(() => {
    localStorage.setItem(storageKey(deck.id), JSON.stringify(state));
  }, [deck.id, state]);

  const dueCards = useMemo(() => {
    const list = deck.cards
      .map((c) => {
        const cs = state[c.id] || { id: c.id, box: 0, dueAt: now() };
        return { card: c, cs };
      })
      .filter(({ cs }) => cs.dueAt <= now())
      .sort((a, b) => a.cs.box - b.cs.box || a.cs.dueAt - b.cs.dueAt);
    return list;
  }, [deck.cards, state]);

  const current = dueCards[0];

  function rate(grade: "again" | "hard" | "good" | "easy") {
    if (!current) return;
    const { card, cs } = current;
    let nextBox = cs.box;
    if (grade === "again") nextBox = Math.max(0, cs.box - 1);
    if (grade === "hard") nextBox = Math.max(0, cs.box);
    if (grade === "good") nextBox = Math.min(5, cs.box + 1);
    if (grade === "easy") nextBox = Math.min(5, cs.box + 2);
    const updated: CardState = { id: card.id, box: nextBox, dueAt: nextDue(nextBox) };
    setState((s) => ({ ...s, [card.id]: updated }));
    setFlipped(false);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Select value={deck.id} onValueChange={setDeckId}>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Choose deck" />
            </SelectTrigger>
            <SelectContent>
              {decks.map((d) => (
                <SelectItem key={d.id} value={d.id}>
                  {d.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Badge variant="secondary">Due: {dueCards.length} / {deck.cards.length}</Badge>
        </div>
      </div>

      {current ? (
        <Card className="max-w-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">{flipped ? current.card.back : current.card.front}</CardTitle>
              <Badge>Box {state[current.card.id]?.box ?? 0}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Click Flip to reveal the answer, then rate your recall.
            </p>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setFlipped((f) => !f)}>
              {flipped ? "Hide" : "Flip"}
            </Button>
            <div className="ml-auto flex gap-2">
              <Button variant="destructive" onClick={() => rate("again")}>Again</Button>
              <Button variant="secondary" onClick={() => rate("hard")}>Hard</Button>
              <Button onClick={() => rate("good")}>Good</Button>
              <Button variant="outline" onClick={() => rate("easy")}>Easy</Button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>All caught up for now</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No cards due. Come back later or switch deck.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
