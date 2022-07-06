import {
  ModularEngineParser,
  ModularEnginePlugin,
} from "modular-engine-types";

export type UrlCheckerQueryHandler = ModularEngineParser<
  {
    urlParam: any;
  },
  UrlCheckerSettings
>;

export type UrlCheckerSettings = {
  urlChecker?: {
    queryParameters?: Record<string, UrlCheckerQueryHandler>;
    before?: string[];
    after?: string[];
  };
};

export type UrlCheckerPlugin = ModularEnginePlugin<UrlCheckerSettings>;
