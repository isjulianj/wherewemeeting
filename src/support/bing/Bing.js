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
      window.bingReady = () => {
        resolve();

        delete window.bingReady;
      };

      const bingUrl = `https://www.bing.com/api/maps/mapcontrol?key=AnwI1t4Sltp_gadZ9sPd3zxqWYOT39PoAmNwNjG2XSWH5096NMs_QAm5Rchogr5m&callback=bingReady`;

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
