declare class PlayerElement extends HTMLElement {
  getPlaybackQuality(): Quality;
  getAvailableQualityLevels(): Quality[];
  setPlaybackQuality(quality: Quality): void;
  setPlaybackQualityRange(quality: Quality): void;
}

type Quality =
  | "highres"
  | "hd2160"
  | "hd1440"
  | "hd1080"
  | "hd720"
  | "large"
  | "medium"
  | "small"
  | "tiny"
  | "auto";

interface OnQualityUpdate extends CustomEvent {
  detail: Quality;
}

interface CustomWindowEventMap extends WindowEventMap {
  "quality-update": OnQualityUpdate;
}

interface Window {
  addEventListener<K extends keyof CustomWindowEventMap>(
    type: K,
    listener: (this: Window, ev: CustomWindowEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof CustomWindowEventMap>(
    type: K,
    listener: (this: Window, ev: CustomWindowEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}

declare namespace Chrome {
  type AreaName = "sync" | "local" | "managed" | "session";

  type StorageChangedCallback = (
    changes: { [key: string]: StorageChange },
    areaName: AreaName
  ) => void;

  interface StorageChange {
    newValue?: any;
    oldValue?: any;
  }

  interface Browser {
    storage: {
      local: any;
      sync: any;

      onChanged: {
        addListener: (callback: StorageChangedCallback) => void;
      };
    };
  }
}

declare const chrome: Chrome.Browser;
