/// <reference types="vite/client" />

// Safari exposes AudioContext under a webkit-prefixed name.
interface Window {
  webkitAudioContext?: typeof AudioContext;
}
