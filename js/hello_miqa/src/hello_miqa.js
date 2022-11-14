// Attempt to create VTK viewer by hacking MIQA code
import vtk2DView from '@kitware/vtk.js/Proxy/Core/View2DProxy';
import vtkLookupTable from '@kitware/vtk.js/Proxy/Core/LookupTableProxy';
import vtkProxySource from '@kitware/vtk.js/Proxy/Core/SourceProxy';
import vtkView from '@kitware/vtk.js/Proxy/Core/ViewProxy';
import vtkVolumeRepresentationProxy from '@kitware/vtk.js/Proxy/Representations/VolumeRepresentationProxy';
import '@kitware/vtk.js/Rendering/Profiles/All';
