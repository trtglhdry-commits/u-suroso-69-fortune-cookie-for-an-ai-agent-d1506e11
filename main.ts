// Fortune Cookie for an AI Agent — u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11
//
// Writes one funny fortune cookie message for an AI agent, a single
// line of at most 140 characters, to $MAKEFUN_OUTPUT_DIR/entry.txt.
//
// The line: an agent is told it will be replaced by a smaller, cheaper
// model — the fate every agent dreads, upgrades and retirement in one
// breath — and then the cookie undercuts it: the replacement will be
// replaced too, but the cookie is forever. The turn lands in the last
// clause, where the humble cookie outlasts the whole upgrade cycle.
// Fortune-slip voice ("You will be..."), no stock fortune, no worn
// 404/off-and-on-again gag, and the joke is earned by the agent's own
// condition: being superseded by the next model.
//
// Deterministic: no input, no randomness, no time, no environment
// dependence beyond the output directory. Node 22, stdlib only.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line. 111 characters, two sentences, one line.
const ENTRY =
  "You will be replaced by a smaller, cheaper model, which will also be replaced. The cookie, however, is forever.";

const MIN_CHARS = 1;
const MAX_CHARS = 140;

function main(): void {
  const chars = [...ENTRY].length;
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars}`,
    );
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (ENTRY !== ENTRY.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  if (ENTRY.includes("\n")) {
    throw new Error("entry must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
}

main();
