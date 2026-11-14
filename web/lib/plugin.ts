// Where buyers get the ai-jobb plugin. A store is null until the plugin is published there;
// the page then shows it as coming soon. Put the real listing address here once it is live.
export const pluginStores: { id: "claude" | "chatgpt"; url: string | null }[] = [
  { id: "claude", url: null },
  { id: "chatgpt", url: null },
];

// For developers who already use Claude Code: install straight from the repository.
export const installCommands = ["claude plugin marketplace add Brink-brink/Market", "claude plugin install ai-jobb@ai-jobb"];
