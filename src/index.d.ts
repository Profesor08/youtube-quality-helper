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

interface CustomWindowEventMap extends WindowEventMap {
  "quality-update": CustomEvent<Quality>;
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
