/** utils */
import { computeValue } from "modular-utils";

/** internal */
import { UrlCheckerPlugin } from "./types";

import { queryParametersHandlers } from "./query-parameters";

import { processParams } from "./helper";

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
