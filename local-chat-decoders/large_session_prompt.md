Write me a Python script that converts Claude Code JSONL session transcripts
into clean, human-readable Markdown plus a normalized JSON file.

Input: a path to a .jsonl file OR a directory of them. Each line is one JSON
event. Output (per session): a .md and a .clean.json in an output folder.

Requirements:
- Read and write everything as UTF-8 (errors='replace'); skip unparsable lines
  (the last line of a live session may be half-written).
- Keep only "user" and "assistant" events; drop queue-operation, attachment,
  ai-title, last-prompt, file-history-snapshot, mode, system.
- Reorder messages by following parentUuid -> uuid (fall back to file order).
- Render message.content blocks:
    text -> as-is
    thinking -> drop it and its base64 "signature"
    tool_use -> name + input JSON (truncate input over N chars)
    tool_result -> content in a code block (truncate over N chars)
    image -> placeholder "[image: media_type]", with an option to base64-decode
             and save it to disk instead.
- CLI flags: -o/--outdir, --max-tool-chars N, --keep-thinking, --save-images.
- .clean.json = list of {uuid, parent, role, ts, model, tokens, text}.