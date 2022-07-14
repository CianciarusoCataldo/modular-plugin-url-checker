import { ModularEngineParser } from "modular-engine-types";
import { computeValue } from "modular-utils";

import { queryParametersHandlers } from "./query-parameters";
import { UrlCheckerPluginQueryHandler } from "./types";

/**
 * {@link https://github.com/CianciarusoCataldo/modular-plugin-url-checker modular-plugin-url-checker} internal computation function, used to parse
 * `preInit` and `postInit` parameters
 *
 * @see https://cianciarusocataldo.github.io/modular-plugin-url-checker?id=config
 * @see https://cianciarusocataldo.github.io/modular-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const processParams: ModularEngineParser<{
  elements: string[];
  params: Record<string, any>;
}> = ({ elements, config, params, store }) => {
  let input = { ...config };

  const allParams = Object.keys(params);

  const customParams = config.urlChecker.queryParameters || {};
  const handlers = {
    ...queryParametersHandlers,
    ...customParams,
  };

  elements.forEach((param) => {
    const handler: UrlCheckerPluginQueryHandler =
      handlers[param] || (({ config }) => config);

    if (allParams.includes(param)) {
      input = computeValue(
        () =>
          handler({
            config: input,
            urlParam: params[param],
            store,
          }) || input,
        input
      );
    }
  });

  return input;
};
