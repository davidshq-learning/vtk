// https://kitware.github.io/vtk-js/examples/ManyRenderers.html
import '@kitware/vtk.js/favicon';

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Geometry';
import '@kitware/vtk.js/Rendering/Misc/RenderingAPIs';

import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkConeSource from '@kitware/vtk.js/Filters/Sources/ConeSource';
import vtkSphereSource from '@kitware/vtk.js/Filters/Sources/SphereSource';
import vtkCubeSource from '@kitware/vtk.js/Filters/Sources/CubeSource';
import vtkCylinderSource from '@kitware/vtk.js/Filters/Sources/CylinderSource';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkRenderWindow from '@kitware/vtk.js/Rendering/Core/RenderWindow';
import vtkRenderWindowInteractor from '@kitware/vtk.js/Rendering/Core/RenderWindowInteractor';
import vtkRenderer from '@kitware/vtk.js/Rendering/Core/Renderer';
import vtkInteractorStyleTrackballCamera from '@kitware/vtk.js/Interaction/Style/InteractorStyleTrackballCamera';

// Meshes
const meshes = [];

function addMesh(name, source) {
  const mapper = vtkMapper.newInstance();
  mapper.setInputData(source.getOutputData());
  meshes.push({ name, mapper });
}

addMesh('Cone', vtkConeSource.newInstance());
addMesh('Sphere', vtkSphereSource.newInstance());
addMesh('Cube', vtkCubeSource.newInstance());
addMesh('Cylinder', vtkCylinderSource.newInstance());

// Named Properties (for colors)
const properties = [
  {
    name: '- Red',
    properties: { color: [1, 0.6, 0.6] },
  },
  {
    name: 'Edge - Red',
    properties: { edgeVisibility: true, color: [1, 0.6, 0.6] },
  },
  {
    name: '- Blue',
    properties: { color: [0.6, 0.6, 1] },
  },
  {
    name: 'Edge - Green',
    properties: { edgeVisibility: true, color: [0.6, 1, 0.6] },
  },
  {
    name: '- Green',
    properties: { color: [0.6, 1, 0.6] },
  },
  {
    name: 'Edge - Blue',
    properties: { edgeVisibility: true, color: [0.6, 0.6, 1] },
  },
];

// Background colors
const colors = [
  [0.2, 0.2, 0.2],
  [0.4, 0.2, 0.3],
  [0.2, 0.4, 0.3],
  [0.6, 0.6, 0.6],
  [0.2, 0.4, 0.4],
  [0.3, 0.4, 0.2],
  [0.3, 0.2, 0.4],
];

// Create a single RenderWindow in fullscreen
const RENDERERS = {};

// Create our renderWindow instance
const renderWindow = vtkRenderWindow.newInstance();
// Create our view for the renderWindow
const renderWindowView = renderWindow.newAPISpecificView();
// Add the view to the renderWindow
renderWindow.addView(renderWindowView);

// Setup HTML container for renderWindow view
const rootContainer = document.createElement('div');
rootContainer.style.position = 'fixed';
rootContainer.style.zIndex = -1;
rootContainer.style.left = 0;
rootContainer.style.top = 0;
rootContainer.style.pointerEvents = 'none';
document.body.appendChild(rootContainer);

// Tell renderWindow view to use the container
renderWindowView.setContainer(rootContainer);

// Create the interactor and tell it to use the view and set interactor style
const interactor = vtkRenderWindowInteractor.newInstance();
interactor.setView(renderWindowView);
interactor.initialize();
interactor.setInteractorStyle(vtkInteractorStyleTrackballCamera.newInstance());


function updateViewPort(element, renderer) {
  // Get the viewport dimensions
  const { innerHeight, innerWidth } = window;
  // Get the dimensions of the element and position relative to viewport.
  const { x, y, width, height } = element.getBoundingClientRect();
  // Ensure that scrollbar doesn't cut things off?
  const viewport = [
    x / innerWidth,
    1 - (y + height) / innerHeight,
    (x + width) / innerWidth,
    1 - y / innerHeight,
  ];
  renderer.setViewport(...viewport);
}

function recomputeViewports() {
  const rendererElems = document.querySelectorAll('.renderer');
  for (let i = 0; i < rendererElems.length; i++) {
    const elem = rendererElems[i];
    const { id } = elem;
    const renderer = RENDERERS[id];
    updateViewPort(elem, renderer);
  }
  renderWindow.render();
}

function resize() {
  rootContainer.style.width = `${window.innerWidth}px`;
  renderWindowView.setSize(window.innerWidth, window.innerHeight);
  recomputeViewports();
}

// Reports changes to dimensions of body in viewport
new ResizeObserver(resize).observe(document.body);
// If dimensions change, rerender
document.addEventListener('scroll', recomputeViewports);

// Renderers
let meshIndex = 0;
let propertyIndex = 0;
let bgIndex = 0;
let rendererId = 1;

// Define the attributes of each container for a rendered output
function applyStyle(element) {
  element.classList.add('renderer');
  element.style.width = '200px';
  element.style.height = '200px';
  element.style.margin = '20px';
  element.style.border = 'solid 1px #333';
  element.style.display = 'inline-block';
  element.style.boxSizing = 'border';
  element.style.textAlign = 'center';
  element.style.color = 'white';
  return element;
}

// This doesn't seem to work?
let captureCurrentRenderer = false;

function setCaptureCurrentRenderer(yn) {
  captureCurrentRenderer = yn;
  if (yn && interactor.getCurrentRenderer()) {
    // fix the current renderer to, well, the current renderer
    interactor.setCurrentRenderer(interactor.getCurrentRenderer());
  } else {
    // remove the fixed current renderer
    interactor.setCurrentRenderer(null);
  }
}

// Ensures the interactor is interacting with the user desired rendering
function bindInteractor(renderer, el) {
  // only change the interactor's container if needed
  if (interactor.getContainer() !== el) {
    if (interactor.getContainer()) {
      interactor.unbindEvents();
    }
    if (captureCurrentRenderer) {
      interactor.setCurrentRenderer(renderer);
    }
    if (el) {
      interactor.bindEvents(el);
    }
  }
}

function addRenderer() {
  const mesh = meshes[meshIndex];
  const prop = properties[propertyIndex];
  const background = colors[bgIndex];
  meshIndex = (meshIndex + 1) % meshes.length;
  propertyIndex = (propertyIndex + 1) % properties.length;
  bgIndex = (bgIndex + 1) % colors.length;

  const container = applyStyle(document.createElement('div'));
  container.id = rendererId++;
  document.body.appendChild(container);

  // Create an actor
  const actor = vtkActor.newInstance();
  actor.setMapper(mesh.mapper);
  actor.getProperty().set(prop.properties);
  actor.getProperty().setDiffuse(0.9);
  actor.getProperty().setSpecular(0.2);
  actor.getProperty().setSpecularPower(30);
  actor.getProperty().setSpecularColor(1.0, 1.0, 1.0);

  // Create a renderer
  const renderer = vtkRenderer.newInstance({ background });
  container.innerHTML = `${mesh.name} ${prop.name}`;

  // Observe when the mouse is enters or leaves the container
  container.addEventListener('pointerenter', () =>
    bindInteractor(renderer, container)
  );
  container.addEventListener('pointerleave', () => bindInteractor(null, null));

  renderer.addActor(actor);
  renderWindow.addRenderer(renderer);

  updateViewPort(container, renderer);
  renderer.resetCamera();

  // Keep track of renderer
  RENDERERS[container.id] = renderer;
}

// The single renderer capture control panel
const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.name = 'singleRendererCapture';
const label = document.createElement('label');
label.for = checkbox.name;
label.innerText = 'Enable single renderer capture';

// Listen for changes to control panel
checkbox.addEventListener('input', (ev) => {
  setCaptureCurrentRenderer(ev.target.checked);
});

// Add control panel to viewport
document.body.appendChild(checkbox);
document.body.appendChild(label);
document.body.appendChild(document.createElement('br'));

// Renders a maximum of 64 renders
for (let i = 0; i < 64; i++) {
  addRenderer();
}
resize();

function updateCamera(renderer) {
  const camera = renderer.getActiveCamera();
  camera.azimuth(0.5);
  renderer.resetCameraClippingRange();
}

function animate() {
  Object.values(RENDERERS).forEach(updateCamera);
  renderWindow.render();
  window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);

// Globals
global.rw = renderWindow;
global.glrw = renderWindowView;
global.renderers = RENDERERS;