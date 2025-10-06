export type Kana = { char: string; romaji: string; type: "hiragana" | "katakana" };
export type Kanji = { kanji: string; onyomi?: string; kunyomi?: string; meaning: string; jlpt: "N5" | "N4" | "N3" };
export type Vocab = { word: string; reading?: string; meaning: string; jlpt: "N5" | "N4" | "N3" };
export type Grammar = { title: string; description: string; exampleJa: string; exampleVi: string; jlpt: "N5" | "N4" | "N3" };

export const hiragana: Kana[] = [
  { char: "あ", romaji: "a", type: "hiragana" },
  { char: "い", romaji: "i", type: "hiragana" },
  { char: "う", romaji: "u", type: "hiragana" },
  { char: "え", romaji: "e", type: "hiragana" },
  { char: "お", romaji: "o", type: "hiragana" },
  { char: "か", romaji: "ka", type: "hiragana" },
  { char: "き", romaji: "ki", type: "hiragana" },
  { char: "く", romaji: "ku", type: "hiragana" },
  { char: "け", romaji: "ke", type: "hiragana" },
  { char: "こ", romaji: "ko", type: "hiragana" },
];

export const katakana: Kana[] = [
  { char: "ア", romaji: "a", type: "katakana" },
  { char: "イ", romaji: "i", type: "katakana" },
  { char: "ウ", romaji: "u", type: "katakana" },
  { char: "エ", romaji: "e", type: "katakana" },
  { char: "オ", romaji: "o", type: "katakana" },
  { char: "カ", romaji: "ka", type: "katakana" },
  { char: "キ", romaji: "ki", type: "katakana" },
  { char: "ク", romaji: "ku", type: "katakana" },
  { char: "ケ", romaji: "ke", type: "katakana" },
  { char: "コ", romaji: "ko", type: "katakana" },
];

export const kanjiList: Kanji[] = [
  { kanji: "日", onyomi: "ニチ, ジツ", kunyomi: "ひ, か", meaning: "day; sun", jlpt: "N5" },
  { kanji: "一", onyomi: "イチ", kunyomi: "ひと-", meaning: "one", jlpt: "N5" },
  { kanji: "人", onyomi: "ジン, ニン", kunyomi: "ひと", meaning: "person", jlpt: "N5" },
  { kanji: "年", onyomi: "ネン", kunyomi: "とし", meaning: "year", jlpt: "N5" },
  { kanji: "学", onyomi: "ガク", kunyomi: "まな-ぶ", meaning: "study", jlpt: "N5" },
  { kanji: "時", onyomi: "ジ", kunyomi: "とき", meaning: "time", jlpt: "N5" },
  { kanji: "電", onyomi: "デン", kunyomi: "", meaning: "electricity", jlpt: "N4" },
  { kanji: "駅", onyomi: "エキ", kunyomi: "", meaning: "station", jlpt: "N4" },
  { kanji: "集", onyomi: "シュウ", kunyomi: "あつ-まる", meaning: "gather", jlpt: "N3" },
  { kanji: "報", onyomi: "ホウ", kunyomi: "むく-いる", meaning: "report; reward", jlpt: "N3" },
];

export const grammarList: Grammar[] = [
  {
    title: "AはBです",
    description: "Câu khẳng định cơ bản với danh từ.",
    exampleJa: "わたしは学生です。",
    exampleVi: "Tôi là sinh viên.",
    jlpt: "N5",
  },
  {
    title: "N1のN2",
    description: "Bổ nghĩa danh từ bằng の.",
    exampleJa: "日本語の先生",
    exampleVi: "Giáo viên tiếng Nhật",
    jlpt: "N5",
  },
  {
    title: "Vている",
    description: "Thì tiếp diễn/ trạng thái đang diễn ra.",
    exampleJa: "本を読んでいます。",
    exampleVi: "Đang đọc sách.",
    jlpt: "N4",
  },
  {
    title: "〜と思います",
    description: "Diễn đạt suy nghĩ/ý kiến.",
    exampleJa: "これは大切だと思います。",
    exampleVi: "Tôi nghĩ cái này quan trọng.",
    jlpt: "N3",
  },
];

export const vocabularyList: Vocab[] = [
  { word: "学校", reading: "がっこう", meaning: "trường học", jlpt: "N5" },
  { word: "先生", reading: "せんせい", meaning: "giáo viên", jlpt: "N5" },
  { word: "電車", reading: "でんしゃ", meaning: "tàu điện", jlpt: "N4" },
  { word: "会議", reading: "かいぎ", meaning: "cuộc họp", jlpt: "N3" },
];

export type SRScard = {
  id: string;
  front: string;
  back: string;
  tags?: string[];
};

export function toSrsFromKana(items: Kana[], tag: string): SRScard[] {
  return items.map((k) => ({ id: `${tag}:${k.char}` , front: k.char, back: k.romaji, tags: [tag] }));
}
export function toSrsFromKanji(items: Kanji[], tagPrefix = "kanji"): SRScard[] {
  return items.map((k) => ({
    id: `${tagPrefix}:${k.kanji}`,
    front: k.kanji,
    back: `${k.meaning}${k.onyomi ? `｜音: ${k.onyomi}` : ""}${k.kunyomi ? `｜訓: ${k.kunyomi}` : ""}`,
    tags: [tagPrefix, k.jlpt],
  }));
}
export function toSrsFromVocab(items: Vocab[], tagPrefix = "vocab"): SRScard[] {
  return items.map((v) => ({
    id: `${tagPrefix}:${v.word}`,
    front: `${v.word}${v.reading ? `（${v.reading}）` : ""}`,
    back: v.meaning,
    tags: [tagPrefix, v.jlpt],
  }));
}
