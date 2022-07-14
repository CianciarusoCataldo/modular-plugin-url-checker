/**
 * @file {@link https://github.com/CianciarusoCataldo/modular-plugin-url-checker modular-plugin-url-checker} internal query parameters file
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-url-checker?id=config
 * @see https://cianciarusocataldo.github.io/modular-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import { ModularEngineConfig } from "modular-engine-types";

import { computeValue } from "modular-utils";

import { UrlCheckerPluginQueryHandler } from "./types";

/**
 * {@link https://github.com/CianciarusoCataldo/modular-plugin-url-checker modular-plugin-url-checker} internal query parameters
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-url-checker?id=config
 * @see https://cianciarusocataldo.github.io/modular-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const queryParametersHandlers: Record<
  string,
  UrlCheckerPluginQueryHandler
> = {
  config: ({ urlParam, config }) => {
    const parsedConfig = computeValue<ModularEngineConfig>(
      () => JSON.parse(urlParam),
      {}
    );

    return { ...config, ...parsedConfig };
  },

  appName: ({ urlParam, config }) => ({ ...config, appName: urlParam }),
};
