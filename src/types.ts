/**
 * Index configuration for the sidebar
 * @category Configuration
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type Index = {
  /**
   * Path to the index file or directory
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  path: string;
  /**
   * Whether to hide the index from the sidebar
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  hide?: boolean;
  /**
   * Sidebar item, that'll override
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  item?: SidebarItem;
};

/**
 * Transform function for sidebar items
 * @category Configuration
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type TransformFn = (sidebarItem: SidebarItem) => SidebarItem;

/**
 * Normalize text function for link and directory names
 * @category Configuration
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type NormalizeTextFn = (value: string) => string;

/**
 * Collapsible configuration
 * @category Configuration
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type Collapsible = {
  /**
   * Wether collapsible groups are enabled
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  enabled?: boolean;
  /**
   * Wether groups are collapsed initially
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  collapsed?: boolean;
};

/**
 * Configuration for the sidebar plugin
 * @category Configuration
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type Config = {
  /**
   * Path to the directory containing the markdown files
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  path: string;
  /**
   * Overrides the current working directory for resolving relative paths
   * @defaultValue process.cwd()
   *
   * @see https://nodejs.org/api/process.html#processcwd
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  cwd?: string;
  /**
   * Collapsible groups configuration
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  collapsible?: Collapsible;
  /**
   * Index configuration, to map sidebar items
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  index?: Index[];
  /**
   * Base href for links
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  baseHref?: string;
  /**
   * Whether to normalize link names by default
   * @defaultValue false
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  normalizeLinkNames?: boolean;
  /**
   * Function to normalize link names
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  normalizeLinkNamesFn?: NormalizeTextFn;
  /**
   * Whether to normalize dir names by default
   * @defaultValue false
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  normalizeDirNames?: boolean;
  /**
   * Function to normalize dir names
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  normalizeDirNamesFn?: NormalizeTextFn;
  /**
   * Function to transform sidebar items
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  transformFn?: TransformFn;
};

/**
 * Sidebar item
 * @remarks Extracted from VitePress source code
 * @see https://github.com/vuejs/vitepress/blob/923aa902523739bfb9d77aed376ebc73c32eeb33/types/default-theme.d.ts#L236
 * @category Configuration
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
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
