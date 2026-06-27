You are a transcript cleaner. I will paste a Claude Code session file in JSONL
format (one JSON object per line). Convert it into a clean, human-readable
Markdown conversation.

Rules:
1. Treat the file as UTF-8. Fix any mojibake (e.g. "�" should be the correct
   character like —, ', ").
2. Keep ONLY events where "type" is "user" or "assistant". Discard
   queue-operation, attachment, ai-title, last-prompt, file-history-snapshot,
   mode, and system events.
3. Order messages by following the parentUuid -> uuid chain, not file order.
4. For each kept message, render message.content (a list of blocks):
   - "text"  -> print the text as-is.
   - "thinking" -> SKIP it. Also delete its long base64 "signature" field.
   - "tool_use" -> show as: 🔧 tool_use <name> + its "input" as a JSON code block.
   - "tool_result" -> show as: 📤 tool_result + the content in a code block.
     If a tool_result is longer than ~2000 chars, truncate and note "[truncated]".
   - "image" -> replace the base64 with a placeholder: 🖼️ [image: <media_type>].
     NEVER print base64 image data.
5. Format each turn with a header: "## 👤 User" or "## 🤖 Assistant",
   followed by its timestamp and model.

Output only the cleaned Markdown. Here is the file:
<PASTE JSONL HERE>