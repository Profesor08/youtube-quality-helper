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
      chrome.storage.onChanged.addListener((changes, area) => {
        if (area === "sync" && changes["quality"] !== undefined) {
          this.update(changes["quality"].newValue);
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
       * @type {{ quality: Quality }}
       */
      const { quality } = await chrome.storage.sync.get("quality");

      return quality ?? "auto";
    };

    /**
     * @param {Quality} quality
     * @returns
     */
    save = async (quality) => {
      return await chrome.storage.sync.set({ quality });
    };
  }

  const api = new Api();

  api.run();
}
