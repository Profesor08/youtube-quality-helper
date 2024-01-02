// @ts-check

{
  class YoutubeQualityHelper {
    constructor() {
      /**
       * @type {string | null}
       */
      this.url = null;

      /**
       * @type {Map<Quality, number>}
       */
      this.qualityMap = new Map();
      this.qualityMap.set("highres", 9);
      this.qualityMap.set("hd2160", 8);
      this.qualityMap.set("hd1440", 7);
      this.qualityMap.set("hd1080", 6);
      this.qualityMap.set("hd720", 5);
      this.qualityMap.set("large", 4);
      this.qualityMap.set("medium", 3);
      this.qualityMap.set("small", 2);
      this.qualityMap.set("tiny", 1);
      this.qualityMap.set("auto", 0);

      /**
       * @type {Quality}
       */
      this.quality = "auto";

      /** @type {PlayerElement | null} */
      this.player = this.getPlayer();

      /** @type {HTMLVideoElement | null} */
      this.video = this.getVideo();

      this.observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "src"
          ) {
            this.update();
          }
        }
      });
    }

    /**
     * @param {Quality} quality
     */
    updateQuality = (quality) => {
      this.quality = quality;
      this.update(true);
    };

    update = (force = false) => {
      console.log(force);

      if (force === false && this.url === window.location.href) {
        return;
      }

      const quality = this.getMatchingQuality();

      if (force === false || quality === this.player?.getPlaybackQuality()) {
        return;
      }

      this.player?.setPlaybackQuality?.(quality);
      this.player?.setPlaybackQualityRange?.(quality);
      this.url = window.location.href;
    };

    observe = () => {
      this.observer.disconnect();

      if (this.video !== null) {
        this.observer.observe(this.video, {
          attributes: true,
        });
      }
    };

    /**
     * @returns {Quality}
     */
    getMatchingQuality = () => {
      const availableQualityLevels =
        this.player?.getAvailableQualityLevels() ?? [];

      if (availableQualityLevels.includes(this.quality)) {
        return this.quality;
      }

      for (const availableQuality of availableQualityLevels) {
        const availableQualityLevel =
          this.qualityMap.get(availableQuality) ?? 0;
        const qualityLevel = this.qualityMap.get(this.quality) ?? 0;

        if (availableQualityLevel < qualityLevel) {
          return availableQuality;
        }
      }

      return "auto";
    };

    getPlayer = () => {
      /** @type {PlayerElement | null} */
      return (
        document.querySelector("#movie_player") ??
        document.querySelector(".html5-video-player")
      );
    };

    getVideo = () => {
      /** @type {HTMLVideoElement | null} */
      return (
        this.player?.querySelector(".video-stream") ??
        this.player?.querySelector(".html5-main-video") ??
        null
      );
    };
  }

  const qualityHelper = new YoutubeQualityHelper();

  window.addEventListener("quality-update", (event) => {
    qualityHelper.updateQuality(event.detail);
    qualityHelper.observe();
  });

  window.addEventListener("popstate", () => {
    qualityHelper.update();
  });
}
