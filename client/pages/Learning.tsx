import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FlashcardsSRS, { Deck } from "@/features/learning/FlashcardsSRS";
import {
  grammarList,
  hiragana,
  katakana,
  kanjiList,
  toSrsFromKana,
  toSrsFromKanji,
  toSrsFromVocab,
  vocabularyList,
} from "@/features/learning/data";
import { useMemo, useState } from "react";

function KanaGrid({ type }: { type: "hiragana" | "katakana" }) {
  const [q, setQ] = useState("");
  const data = (type === "hiragana" ? hiragana : katakana).filter(
    (k) => k.char.includes(q) || k.romaji.includes(q.toLowerCase()),
  );
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Input placeholder="Search kana or romaji" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-xs" />
        <Badge variant="secondary">{data.length} shown</Badge>
      </div>
      <div className="grid grid-cols-5 gap-3 sm:grid-cols-8 md:grid-cols-10">
        {data.map((k) => (
          <Card key={k.char} className="text-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">{k.char}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-xs text-muted-foreground">{k.romaji}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function KanjiTable({ level }: { level: "N5" | "N4" | "N3" }) {
  const [q, setQ] = useState("");
  const data = useMemo(
    () =>
      kanjiList.filter((k) => k.jlpt === level).filter(
        (k) =>
          k.kanji.includes(q) ||
          k.meaning.toLowerCase().includes(q.toLowerCase()) ||
          (k.kunyomi || "").includes(q) ||
          (k.onyomi || "").includes(q),
      ),
    [level, q],
  );
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Input placeholder="Search kanji/meaning/reading" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-xs" />
        <Badge variant="secondary">{data.length} shown</Badge>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {data.map((k) => (
          <Card key={k.kanji}>
            <CardHeader className="pb-2 flex-row items-baseline gap-3">
              <CardTitle className="text-3xl leading-none">{k.kanji}</CardTitle>
              <Badge>{k.jlpt}</Badge>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <div><span className="font-medium text-foreground">Meaning:</span> {k.meaning}</div>
              {k.onyomi && <div><span className="font-medium text-foreground">音読み:</span> {k.onyomi}</div>}
              {k.kunyomi && <div><span className="font-medium text-foreground">訓読み:</span> {k.kunyomi}</div>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function GrammarList({ level }: { level: "N5" | "N4" | "N3" }) {
  const items = grammarList.filter((g) => g.jlpt === level);
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((g) => (
        <Card key={g.title}>
          <CardHeader className="pb-2 flex-row items-baseline gap-3">
            <CardTitle className="text-lg">{g.title}</CardTitle>
            <Badge variant="secondary">{g.jlpt}</Badge>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>{g.description}</p>
            <div className="mt-2 rounded-md bg-muted p-3 text-foreground">
              <div className="font-medium">{g.exampleJa}</div>
              <div className="text-xs text-muted-foreground">{g.exampleVi}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function VocabularyList({ level }: { level: "N5" | "N4" | "N3" }) {
  const items = vocabularyList.filter((v) => v.jlpt === level);
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {items.map((v) => (
        <Card key={v.word}>
          <CardHeader className="pb-2 flex-row items-baseline gap-3">
            <CardTitle className="text-lg">{v.word}{v.reading ? `（${v.reading}）` : ""}</CardTitle>
            <Badge variant="secondary">{v.jlpt}</Badge>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">{v.meaning}</CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function Learning() {
  const decks: Deck[] = useMemo(() => {
    return [
      { id: "kana:hiragana", name: "Hiragana", cards: toSrsFromKana(hiragana, "hiragana") },
      { id: "kana:katakana", name: "Katakana", cards: toSrsFromKana(katakana, "katakana") },
      { id: "kanji:N5", name: "Kanji N5", cards: toSrsFromKanji(kanjiList.filter((k) => k.jlpt === "N5"), "kanji-N5") },
      { id: "kanji:N4", name: "Kanji N4", cards: toSrsFromKanji(kanjiList.filter((k) => k.jlpt === "N4"), "kanji-N4") },
      { id: "kanji:N3", name: "Kanji N3", cards: toSrsFromKanji(kanjiList.filter((k) => k.jlpt === "N3"), "kanji-N3") },
      { id: "vocab:N5", name: "Vocabulary N5", cards: toSrsFromVocab(vocabularyList.filter((v) => v.jlpt === "N5"), "vocab-N5") },
      { id: "vocab:N4", name: "Vocabulary N4", cards: toSrsFromVocab(vocabularyList.filter((v) => v.jlpt === "N4"), "vocab-N4") },
      { id: "vocab:N3", name: "Vocabulary N3", cards: toSrsFromVocab(vocabularyList.filter((v) => v.jlpt === "N3"), "vocab-N3") },
    ];
  }, []);

  return (
    <div className="container py-10">
      <div className="mb-8 text-center">
        <Badge className="mb-3" variant="secondary">Learning Modules</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Study Kana, Kanji, Grammar and Vocabulary</h1>
        <p className="mt-2 text-muted-foreground">Aligned with Dekiru Nihongo and JLPT N5 → N3</p>
      </div>

      <Tabs defaultValue="kana" className="">
        <TabsList className="flex w-full flex-wrap gap-2">
          <TabsTrigger value="kana">Kana</TabsTrigger>
          <TabsTrigger value="kanji">Kanji</TabsTrigger>
          <TabsTrigger value="grammar">Grammar</TabsTrigger>
          <TabsTrigger value="vocab">Vocabulary</TabsTrigger>
          <TabsTrigger value="flashcards">Flashcards (SRS)</TabsTrigger>
        </TabsList>

        <TabsContent value="kana" className="space-y-10 pt-4">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Hiragana</h2>
              <Button variant="outline" className="" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>Practice with Flashcards</Button>
            </div>
            <KanaGrid type="hiragana" />
          </section>
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Katakana</h2>
            </div>
            <KanaGrid type="katakana" />
          </section>
        </TabsContent>

        <TabsContent value="kanji" className="space-y-10 pt-4">
          <section>
            <h2 className="mb-4 text-xl font-semibold">N5</h2>
            <KanjiTable level="N5" />
          </section>
          <section>
            <h2 className="mb-4 text-xl font-semibold">N4</h2>
            <KanjiTable level="N4" />
          </section>
          <section>
            <h2 className="mb-4 text-xl font-semibold">N3</h2>
            <KanjiTable level="N3" />
          </section>
        </TabsContent>

        <TabsContent value="grammar" className="space-y-10 pt-4">
          <section>
            <h2 className="mb-4 text-xl font-semibold">N5</h2>
            <GrammarList level="N5" />
          </section>
          <section>
            <h2 className="mb-4 text-xl font-semibold">N4</h2>
            <GrammarList level="N4" />
          </section>
          <section>
            <h2 className="mb-4 text-xl font-semibold">N3</h2>
            <GrammarList level="N3" />
          </section>
        </TabsContent>

        <TabsContent value="vocab" className="space-y-10 pt-4">
          <section>
            <h2 className="mb-4 text-xl font-semibold">N5</h2>
            <VocabularyList level="N5" />
          </section>
          <section>
            <h2 className="mb-4 text-xl font-semibold">N4</h2>
            <VocabularyList level="N4" />
          </section>
          <section>
            <h2 className="mb-4 text-xl font-semibold">N3</h2>
            <VocabularyList level="N3" />
          </section>
        </TabsContent>

        <TabsContent value="flashcards" className="pt-4">
          <FlashcardsSRS decks={decks} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
