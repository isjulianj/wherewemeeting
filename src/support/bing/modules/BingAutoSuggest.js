import Bing from "../Bing";

/**
 * store pre intialised Promise
 */
let autoSuggestInitialised;
let Microsoft;

export default class BingAutoSuggest {
  static search(query, maxResults = 5) {
    return BingAutoSuggest.initialise().then(() => {
      Microsoft = window.Microsoft;
      return new Promise((resolve, reject) => {
        let options = { maxResults };
        const manager = new Microsoft.Maps.AutosuggestManager(options);
        manager.getSuggestions(query, (suggestions) => {
          resolve(suggestions);
        });
      });
    });
  }
  static initialise() {
    if (autoSuggestInitialised) {
      return autoSuggestInitialised;
    }

    autoSuggestInitialised = new Promise((resolve, reject) => {
      Bing.initialise().then(() => {
        window.Microsoft.Maps.loadModule("Microsoft.Maps.AutoSuggest", {
          callback: () => resolve(),
          errorCallBack: () => reject(),
        });
      });
    });

    return autoSuggestInitialised;
  }
}
