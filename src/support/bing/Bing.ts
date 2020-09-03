let bingInitialised;

class Bing {
  // /**
  //  * Bing API Key
  //  * AmcYyI5OQrrBbVe5oRmpWFn-BPy-tnWRajjGM0RkTfP4VcSXYjhbrpYMRVdIIcsK
  //  */
  // bingKey = "AmcYyI5OQrrBbVe5oRmpWFn-BPy-tnWRajjGM0RkTfP4VcSXYjhbrpYMRVdIIcsK";

  static initialise() {
    if (bingInitialised !== undefined) {
      return bingInitialised;
    }

    return (bingInitialised = new Promise((resolve, reject) => {
      //get the docuementhead
      const head = document.getElementsByTagName("head")[0];

      // set the callback function to resolve promise once script tag appended
      (window as any).bingReady = () => {
        resolve();

        delete (window as any).bingReady;
      };

      const bingUrl = `https://www.bing.com/api/maps/mapcontrol?key=AkClI0BW6HSg2UWqXLQ2fxymgNtFHQ-7qY713jM2D50Jx7gzvGYFGcwACrPDDkss&callback=bingReady`;

      // create Script tag, set the url
      const bingScript = document.createElement("script");
      bingScript.type = "text/javascript";
      bingScript.setAttribute("src", bingUrl);
      bingScript.setAttribute("crossorigin", "anonymous");

      //apend new script tag to head
      head.appendChild(bingScript);
    }));
  }
}

export default Bing;
