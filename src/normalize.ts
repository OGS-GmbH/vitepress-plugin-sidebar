import { Config, NormalizeTextFn } from "./types";

const defaultDirNamesNormalizer: NormalizeTextFn = (value: string): string => {
  let normalizedValue: string = value.trim().replaceAll("_", " ");

  /* eslint-disable-next-line @tseslint/no-non-null-assertion */
  normalizedValue = normalizedValue.at(0)!.toUpperCase() + normalizedValue.slice(1);

  return normalizedValue;
};
const defaultLinkNamesNormalizer: NormalizeTextFn = (value: string): string => value.trim();

function normalizeDirNames (value: string, config: Config): string {
  let normalizedValue: string = value;

  if (config.normalizeDirNames)
    normalizedValue = defaultDirNamesNormalizer(normalizedValue);

  if (config.normalizeDirNamesFn)
    normalizedValue = config.normalizeDirNamesFn(normalizedValue);

  return normalizedValue;
}

function normalizeLinkNames (value: string, config: Config): string {
  let normalizedValue: string = value;

  if (config.normalizeLinkNames)
    normalizedValue = defaultDirNamesNormalizer(normalizedValue);

  if (config.normalizeLinkNamesFn)
    normalizedValue = config.normalizeLinkNamesFn(normalizedValue);

  return normalizedValue;
}

export {
  defaultDirNamesNormalizer,
  defaultLinkNamesNormalizer,
  normalizeDirNames,
  normalizeLinkNames
};
