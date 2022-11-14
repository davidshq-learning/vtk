const Volume = [
    {
        name: 'colorBy',
        domain: {},
    },
    {
        name: 'volumeVisibility',
    },
    {
        name: 'useShadow',
    },
    {
        name: 'sampleDistance',
        domain: { min: 0, max: 1, step: 0.01 },
    },
    {
        name: 'edgeGradient',
        domain: { min: 0, max: 1, step: 0.01 },
    },
    {
        name: 'windowWidth',
        domain: { min: 0, max: 255, step: 0.01 },
    },
    {
        name: 'windowLevel',
        domain: { min: 0, max: 255, step: 0.01 },
    },
    {
        name: 'sliceVisibility',
    },
];

const View3D = [
    { name: 'name' },
    {
        name: 'background',
        domain: {
            palette: [],
        },
    },
    {
        name: 'orientationAxesVisibility',
    },
    {
        name: 'presetToOrientationAxes',
        domain: {
            items: [
                { text: 'XYZ', value: 'default' },
            ],
        },
    },
];

const View2D = [
    { name: 'name' },
    {
        name: 'background',
        domain: {
            palette: [],
        },
    },
    {
        name: 'orientationAxesVisibility',
    },
    {
        name: 'presetToOrientationAxes',
        domain: {
            items: [
                { text: 'XYZ', value: 'default' },
            ],
        },
    },
    {
        name: 'annotationOpacity',
        domain: { min: 0, max: 1, step: 0.01 },
    },
];

export default {
    Volume,
    View3D,
    View2D,
};