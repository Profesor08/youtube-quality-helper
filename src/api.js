// @ts-check

{
  class Api {
    constructor() {
      /**
       * @type {Config}
       */
      this.config = new Config();
    }

    run = async () => {
      chrome.storage.onChanged.addListener(async (changes, area) => {
        if (area === "local" && changes["time"] !== undefined) {
          this.update(await this.config.get());
        }
      });

      this.update(await this.config.get());
    };

    /**
     * @param {Quality} quality
     */
    update = (quality) => {
      window.dispatchEvent(
        new CustomEvent("quality-update", {
          detail: quality,
        })
      );
    };
  }

  class Config {
    get = async () => {
      /**
       * @type {{ quality?: Quality }}
       */
      const { quality } = await chrome.storage.local.get("quality");

      return quality ?? "auto";
    };
  }

  const api = new Api();

  api.run();
}
