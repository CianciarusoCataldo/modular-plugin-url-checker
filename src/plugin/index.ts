/**
 * @file {@link https://github.com/CianciarusoCataldo/modular-plugin-url-checker modular-plugin-url-checker} init file
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-url-checker
 * @see https://cianciarusocataldo.github.io/modular-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import { computeValue } from "modular-utils";

import { UrlCheckerPlugin } from "./types";
import { queryParametersHandlers } from "./query-parameters";

import { processParams } from "./helper";

/**
 * {@link https://github.com/CianciarusoCataldo/modular-plugin-url-checker modular-plugin-url-checker} create function. To use it, include it inside
 * your modular-engine config
 *
 * @returns `url-checker` plugin
 *
 * @example <caption> Use url-checker plugin inside modular-engine config </caption>
 *
 * const urlCheckerPlugin = require("modular-plugin-url-checker");
 *
 * const config = {
 *   appName: "custom-app",
 *   plugins: [urlCheckerPlugin],
 *   urlChecker: {
 *     queryParameters: {
 *       testParam: ({ urlParam }) => {
 *         alert("test value" + urlParam);
 *       },
 *     },
 *     preInit: ["testParam"],
 *   },
 * };
 *
 * module.exports = { config };
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-url-checker
 * @see https://cianciarusocataldo.github.io/modular-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
const urlChecker: UrlCheckerPlugin = () => {
  let params: Record<string, any> = {};

  if (window.location.search) {
    new URLSearchParams(window.location.search).forEach((urlParam, param) => {
      params[param] = computeValue(
        () => urlParam.replace(/(^"|"$)/g, "").replace(/(^'|'$)/g, ""),
        urlParam
      );
    });

    if (window.history.replaceState) {
      window.history.replaceState(
        window.history.state,
        window.document.title,
        window.location.href.split("?")[0]
      );
    }
  }

  return {
    feature: "urlChecker",
    create: (config) => {
      const urlCheckerConfig = config.urlChecker || {};
      const initialParams = Object.keys(queryParametersHandlers);
      const params = urlCheckerConfig.before || [];

      return {
        field: "urlChecker",
        content: {
          queryParameters: urlCheckerConfig.queryParameters || {},
          before: initialParams.concat(params),
          after: urlCheckerConfig.after || [],
        },
      };
    },

    before: ({ config }) =>
      processParams({
        elements: config.urlChecker.before,
        config,
        params,
      }),

    after: ({ config, store }) =>
      processParams({
        elements: config.urlChecker.after,
        config,
        store,
        params,
      }),
  };
};

export default urlChecker;
