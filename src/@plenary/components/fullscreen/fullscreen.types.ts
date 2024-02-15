export type FSDocument = {
  mozFullScreenElement?: Element;
  mozCancelFullScreen?: () => void;
  msFullscreenElement?: Element;
  msExitFullscreen?: () => void;
  webkitFullscreenElement?: Element;
  webkitExitFullscreen?: () => void;
} & HTMLDocument;

export type FSDocumentElement = {
  mozRequestFullScreen?: () => void;
  msRequestFullscreen?: () => void;
  webkitRequestFullscreen?: () => void;
} & HTMLElement;
