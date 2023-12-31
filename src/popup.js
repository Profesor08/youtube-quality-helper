// @ts-check

{
  class Popup {
    constructor() {
      /**
       * @type {Config}
       */
      this.config = new Config();

      /**
       * @type {HTMLFormElement | null}
       */
      this.form = document.querySelector("form");
    }

    run = async () => {
      if (this.form !== null) {
        const quality = await this.config.get();

        /**
         * @type {HTMLInputElement | null}
         */
        const selectedInput =
          this.form.querySelector(`[value="${quality}"]`) ?? null;

        if (selectedInput !== null) {
          selectedInput.checked = true;
        }

        this.form.addEventListener("change", () => {
          if (this.form !== null) {
            const data = new FormData(this.form);

            /**
             * @type {any}
             */
            const quality = data.get("quality");

            if (typeof quality !== null) {
              this.config.save(quality);
            }
          }
        });
      }
    };
  }

  class Config {
    get = async () => {
      /**
       * @type {{ quality: Quality }}
       */
      const { quality } = await chrome.storage.local.get("quality");

      return quality ?? "auto";
    };

    /**
     * @param {Quality} quality
     * @returns
     */
    save = async (quality) => {
      console.log(quality);
      return await chrome.storage.local.set({ quality });
    };
  }

  const popup = new Popup();

  popup.run();
}
