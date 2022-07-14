/**
 * @file {@link https://github.com/CianciarusoCataldo/modular-plugin-url-checker modular-plugin-url-checker} type definitions file
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-url-checker
 * @see https://cianciarusocataldo.github.io/modular-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import { ModularEngineParser, ModularEnginePlugin } from "modular-engine-types";

/**
 * {@link https://github.com/CianciarusoCataldo/modular-plugin-url-checker modular-plugin-url-checker} query parameter handler
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-url-checker
 * @see https://cianciarusocataldo.github.io/modular-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type UrlCheckerPluginQueryHandler = ModularEngineParser<
  {
    /** Query parameter value */
    urlParam: any;
  },
  UrlCheckerPluginSettings
>;

/**
 * {@link https://github.com/CianciarusoCataldo/modular-plugin-url-checker modular-plugin-url-checker} settings
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-url-checker
 * @see https://cianciarusocataldo.github.io/modular-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type UrlCheckerPluginSettings = {
  urlChecker?: {
    /** Query parameters handler functions, called when their parameter is contained inside the url query */
    queryParameters?: Record<string, UrlCheckerPluginQueryHandler>;

    /** Parameter handler called before the store init process */
    before?: string[];

    /** Parameter handler called after the store init process */
    after?: string[];
  };
};

/**
 * {@link https://github.com/CianciarusoCataldo/modular-plugin-url-checker modular-plugin-url-checker} interface
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-url-checker
 * @see https://cianciarusocataldo.github.io/modular-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export type UrlCheckerPlugin = ModularEnginePlugin<UrlCheckerPluginSettings>;
