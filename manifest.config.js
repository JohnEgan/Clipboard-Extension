
export default {
  manifest_version: 3,
  name: "Snippet Deck",
  version: "0.1.0",
  action: { default_popup: "index.html" },
  permissions: ["storage"],
  commands: {
    _execute_action: {
      suggested_key: { default: "Ctrl+Shift+Y", mac: "Command+Shift+Y" },
      description: "Open Snippet Deck"
    }
  }
};