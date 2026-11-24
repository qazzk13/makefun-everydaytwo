process.umask(0o022);
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Two lines on one everyday thing, for a 10-year-old.
// Line 1 explains a queue with one analogy, line 2 says what
// the analogy maps and what it leaves out. Total 1-400 chars.
const TEXT =
  "A queue is a human train that lost its engine, so everybody shuffles forward a bit each time the person at the front hops off at the till.\n" +
  "It fits because your spot in the train is your spot in line, but it leaves out that real queues are not joined together, and anyone can walk off.";

const chars = [...TEXT].length;
if (chars < 1 || chars > 400) throw new Error(`text is ${chars} chars, must be 1-400`);
if (!TEXT.trim()) throw new Error("text is only whitespace");
const lines = TEXT.split("\n");
if (lines.length !== 2) throw new Error(`text must be exactly 2 lines, got ${lines.length}`);
for (const line of lines) {
  if (!line.trim()) throw new Error("a line is empty");
  if (!line.endsWith(".")) throw new Error("each line must be one sentence ending in a full stop");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
if (readFileSync(join(outDir, "entry.txt"), "utf8") !== TEXT) throw new Error("write mismatch");
console.log(`wrote ${chars} characters, ${lines.length} lines`);
