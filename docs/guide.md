# modular-plugin-url-checker

![NPM](https://img.shields.io/npm/l/modular-plugin-url-checker?label=License&style=for-the-badge)
![npm](https://img.shields.io/npm/v/modular-plugin-url-checker?color=orange%20&label=Latest%20version&style=for-the-badge&logo=npm)
![npm bundle size](https://img.shields.io/bundlephobia/min/modular-plugin-url-checker?label=Package%20size&style=for-the-badge)
![Maintenance](https://img.shields.io/maintenance/yes/2025?label=Maintained&style=for-the-badge)

---

<br>

An url checker plugin for [modular-engine](https://github.com/CianciarusoCataldo/modular-engine) system, to handle URL parameters

<br>

---

## Getting started

<br>

### Installation

Check [modular-engine guide](https://cianciarusocataldo.github.io/modular-engine/docs) to init the system

If you want to use this plugin with [modular-engine](https://github.com/CianciarusoCataldo/modular-engine), install it:

```sh
npm i modular-plugin-url-checker
```

<br>

### Usage

Include this plugin inside your modular-engine config file, and optionally set the `urlChecker` field, with the plugin settings.
For example, to add a custom query parameter:

```tsx
// Inside your modular-engine config file

const urlCheckerPlugin = require("modular-plugin-url-checker");

const config = {
  appName: "custom-app",
  plugins: [urlCheckerPlugin],
  urlChecker: {
    queryParameters: {
      testParam: ({ config, store, urlParam }) => {
        alert("test value" + urlParam);
      },
    },
    preInit: ["testParam"],
  },
};

module.exports = { config };
```

<br>

You can see a live preview by visiting [modular-engine-playground](https://cianciarusocataldo.github.io/modular-engine/)

## API

### Config

This plugin adds a custom field inside the [modular-engine]() config, `urlChecker`. This new field contains 3 fields, to easily integrate new functions. You can also set this new field with your custom handlers, for any parameter:

- `queryParameters` : a dictionary with all custom query parameter handlers (the `key` is the custom parameter name, and the `value` is the callback associated). A parameter handler is a callback function that takes an input object, containing the `config`, the `store` (null if not already created) and the value of the query parameter (when it is included inside url), called `urlParam`
- `before` : parameters handlers called before the store init process
- `after` : parameters handlers called after the store init process

Internally, this plugin has 2 query parameter handler pre-set:

- `config` : use it to set the config content, as a Json stringified (example, https://cianciarusocataldo.github.io/modular-engine?config="{appName:"custom"}")
- `appName` : use it to set the appName (example, https://cianciarusocataldo.github.io/modular-engine?appName=Custom)
  Check the [usage](#usage) section for a real example

---

## Integration with other plugins

This plugin expose some fields to work with any other plugin. If you want to interact with it, using your custom plugin, just check the `enabledPlugins` parameter inside your `format` function for `urlChecker`. If true, you can add custom params to the plugin (look at the [config](#config) section). For example, to create a custom query parameter, inside the `format` function of your custom plugin:

```tsx
//Just a skeleton of a custom plugin that interacts with url-checker plugin
const customPlugin = () => ({
  // Custom plugin stuffs

  format: (config, enabledPlugins) => {
    // Custom plugin stuffs

    //Check for `urlChecker` plugin
    if (enabledPlugins.urlChecker) {
      //Add the custom handler
      config.urlChecker.queryParameters["testParam"] = ({
        config,
        urlParam,
        store,
      }) => alert("param value : " + urlParam);

      //In this example, we want to process the param after the store creation, so we add it to postInit array
      config.urlChecker.postInit.push("testParam");
    }
  },
});
```

<br>

---

## Included libraries

- [Modular-engine-types](https://github.com/CianciarusoCataldo/modular-engine-types) - to use modular-engine type definitions inside the plugin
- [Modular-utils](https://github.com/CianciarusoCataldo/modular-utils) - to use shared util functions during init process
- Modular-plugin-localization is written entirely with [Typescript](https://www.typescriptlang.org/)

<br>

---

## Authors

- [**Cataldo Cianciaruso**](https://github.com/CianciarusoCataldo)

<br>

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
