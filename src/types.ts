type Index = {
  path: string;
  hide?: boolean;
  item?: SidebarItem;
};

type TransformFn = (sidebarItem: SidebarItem) => SidebarItem;

type NormalizeTextFn = (value: string) => string;

type Collapsible = {
  enabled?: boolean;
  collapsed?: boolean;
};

type Config = {
  path: string;
  cwd?: string;
  collapsible?: Collapsible;
  index?: Index[];
  baseHref?: string;
  normalizeLinkNames: boolean;
  normalizeLinkNamesFn?: NormalizeTextFn;
  normalizeDirNames: boolean;
  normalizeDirNamesFn?: NormalizeTextFn;
  transformFn?: TransformFn;
};

type SidebarItem = {
  /**
   * The text label of the item.
   */
  text?: string;

  /**
   * The link of the item.
   */
  link?: string;

  /**
   * The children of the item.
   */
  items?: SidebarItem[];

  /**
   * If not specified, group is not collapsible.
   *
   * If `true`, group is collapsible and collapsed by default
   *
   * If `false`, group is collapsible but expanded by default
   */
  collapsed?: boolean;

  /**
   * Base path for the children items.
   */
  base?: string;

  /**
   * Customize text that appears on the footer of previous/next page.
   */
  docFooterText?: string;

  rel?: string;
  target?: string;
};

export type {
  Index,
  Config,
  TransformFn,
  NormalizeTextFn,
  Collapsible,
  SidebarItem
};
