import { addons, types } from "@storybook/addons";

import { ADDON_ID, TOOL_ID, PANEL_ID } from "../constants";
import { Tool } from "../Tool";
import { Panel } from "../Panel";

// Register the addon
addons.register(ADDON_ID, () => {
  // Register the tool
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "Interactions",
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: Tool,
  });

  // Register the panel
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "Interactions",
    match: ({ viewMode }) => viewMode === "story",
    render: Panel,
  });
});
