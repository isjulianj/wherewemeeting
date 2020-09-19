import Bing from "../Bing";

/**
 * store pre intialised Promise
 */
let autoSuggestInitialised: Promise<any>;
let Microsoft: any;
let manager: any;

export default class BingAutoSuggest {
  /**
   * Search loaction mannually
   */
  static search(query, maxResults = 5) {
    return BingAutoSuggest.initialise().then(() => {
      Microsoft = (window as any).Microsoft;
      return new Promise((resolve, reject) => {
        let options = { maxResults };
        const manager = new Microsoft.Maps.AutosuggestManager(options);
        manager.getSuggestions(query, (suggestions) => {
          resolve(suggestions);
        });
      });
    });
  }

  /**
   * Attach a seatchbox to input
   */
  static attach(searchBox, searchBoxContainer, callBack) {
    return BingAutoSuggest.initialise().then(() => {
      Microsoft = (window as any).Microsoft;
      return new Promise((resolve, reject) => {
        let options = { maxResults: 5 };
        manager = new Microsoft.Maps.AutosuggestManager(options);
        manager.attachAutosuggest(searchBox, searchBoxContainer, callBack);
      });
    });
  }

  static detach() {
    manager.detachAutosuggest();
  }

  static initialise() {
    if (autoSuggestInitialised) {
      return autoSuggestInitialised;
    }

    autoSuggestInitialised = new Promise((resolve, reject) => {
      Bing.initialise().then(() => {
        (window as any).Microsoft.Maps.loadModule(
          "Microsoft.Maps.AutoSuggest",
          {
            callback: () => resolve(),
            errorCallBack: () => reject(),
          }
        );
      });
    });

    return autoSuggestInitialised;
  }
}
