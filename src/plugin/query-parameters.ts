import { ModularEngineConfig } from "modular-engine-types";

import { computeValue } from "modular-utils";

import { UrlCheckerQueryHandler } from "./types";

export const queryParametersHandlers: Record<string, UrlCheckerQueryHandler> = {
  config: ({ urlParam, config }) => {
    const parsedConfig = computeValue<ModularEngineConfig>(
      () => JSON.parse(urlParam),
      {}
    );

    return { ...config, ...parsedConfig };
  },

  appName: ({ urlParam, config }) => ({ ...config, appName: urlParam }),
};
