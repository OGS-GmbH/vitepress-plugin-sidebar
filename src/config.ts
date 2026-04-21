import type { Collapsible } from "./types.js";

function getCollapsedState(collapsible: Collapsible | undefined): boolean | undefined {
  if (!collapsible?.enabled) return;

  return Boolean(collapsible.collapsed);
}

export { getCollapsedState };
