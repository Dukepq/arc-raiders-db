import { readFile } from "fs/promises";

export const profanityFilter = {
  getProfaneWords: async function () {
    const buffer = await readFile("bad-words.json");
    const profaneWords: string[] = JSON.parse(buffer.toString());
    return profaneWords;
  },
  censorProfanity: async function (content: string) {
    const profaneWords = await this.getProfaneWords();
    let censoredComment = content;

    for (const word of profaneWords) {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      censoredComment = censoredComment.replace(regex, "*".repeat(word.length));
    }

    return censoredComment;
  },
};
