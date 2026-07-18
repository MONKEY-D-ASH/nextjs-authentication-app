# how nextjs loads and renders your component on the browser and on your screen
1. What the Server Actually Sends

When a user requests a Client Component page, the server actually sends three things at the exact same time:
The Raw HTML: For the instant initial visual paint.
The JavaScript Bundles: The React runtime and your specific page code.
The JSON Payload (RSC Payload): A special data map that tells the browser's React runtime exactly how the server pre-rendered those components so the Virtual DOM can match it perfectly.

2. The Hydration Match
During hydration, React does not actually look at the browser's native DOM tree to compare. Instead, it reads that JSON Payload to rebuild its Virtual DOM in memory, matches it against your JavaScript code, and then binds the event listeners (like onClick) to the real HTML elements already on the screen