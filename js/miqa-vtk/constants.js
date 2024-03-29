export const DEFAULT_VIEW_TYPE = 'View3D:default';

export const VIEW_TYPES = [ // RAS
  { text: '3D', value: 'View3D:default' }, // LPS: same
  { text: 'Orientation Y', value: 'View2D_Y:y' }, // LPS: text: 'Sagittal'
  { text: 'Orientation X', value: 'View2D_X:x' }, // LPS: text: 'Coronal'
  { text: 'Orientation Z', value: 'View2D_Z:z' }, // LPS: text: 'Axial'
];

export const VIEW_ORIENTATIONS = {
  LPS: {
    default: {
      axis: 1,
      viewUp: [0, 0, 1],
    },
    x: {
      axis: 0,
      viewUp: [0, 0, 1],
      directionOfProjection: [1, 0, 0],
    },
    y: {
      axis: 1,
      viewUp: [0, 0, 1],
      directionOfProjection: [0, -1, 0],
    },
    z: {
      axis: 2,
      viewUp: [0, -1, 0],
      directionOfProjection: [0, 0, -1],
    },
  },
  RAS: {
    default: {
      axis: 1,
      viewUp: [0, 0, 1],
    },
    x: {
      axis: 0,
      viewUp: [0, 0, 1],
      directionOfProjection: [-1, 0, 0],
    },
    y: {
      axis: 1,
      viewUp: [0, 0, 1],
      directionOfProjection: [0, 1, 0],
    },
    z: {
      axis: 2,
      viewUp: [0, -1, 0],
      directionOfProjection: [0, 0, 1],
    },
  },
};

export const ijkMapping = {
  x: 'i',
  y: 'j',
  z: 'k',
};

export const windowPresets = [
  {
    text: 'High contrast',
    value: 0,
    apply: (winMin, winMax) => {
      const windowRange = winMax - winMin;
      return [
        Math.ceil(winMin + windowRange * 0.2),
        Math.ceil(winMin + windowRange * 0.3),
      ];
    },
  },
  {
    text: 'Low contrast',
    value: 1,
    apply: (winMin, winMax) => [
      winMin,
      winMax,
    ],
  },
];
