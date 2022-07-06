import { ModularEngineParser } from "modular-engine-types";
import { computeValue } from "modular-utils";

import { queryParametersHandlers } from "./query-parameters";
import { UrlCheckerQueryHandler } from "./types";

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
      const handler: UrlCheckerQueryHandler =
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