// Attempt to create VTK viewer by hacking MIQA code
import vtk2DView from '@kitware/vtk.js/Proxy/Core/View2DProxy';
import vtkLookupTableProxy from '@kitware/vtk.js/Proxy/Core/LookupTableProxy';
import vtkPiecewiseFunctionProxy from '@kitware/vtk.js/Proxy/Core/PiecewiseFunctionProxy';
import vtkProxySource from '@kitware/vtk.js/Proxy/Core/SourceProxy';
import vtkSliceRepresentationProxy from '@kitware/vtk.js/Proxy/Representations/SliceRepresentationProxy';
import vtkView from '@kitware/vtk.js/Proxy/Core/ViewProxy';
import vtkVolumeRepresentationProxy from '@kitware/vtk.js/Proxy/Representations/VolumeRepresentationProxy';
import '@kitware/vtk.js/Rendering/Profiles/All';

import ConfigUtils from './configUtils';

const { createProxyDefinition, activateOnCreate } = ConfigUtils;

function createDefaultView(classFactory, ui, options, props) {
    return activateOnCreate(
        createProxyDefinition(
            classFactory,
            ui,
            [      {
                type: 'application',
                link: 'AnnotationOpacity',
                property: 'annotationOpacity',
                updateOnBind: true,
              },
              {
                type: 'application',
                link: 'OrientationAxesVisibility',
                property: 'orientationAxesVisibility',
                updateOnBind: true,
              },
              {
                type: 'application',
                link: 'OrientationAxesPreset',
                property: 'presetToOrientationAxes',
                updateOnBind: true,
              },
              {
                type: 'application',
                link: 'OrientationAxesType',
                property: 'orientationAxesType',
                updateOnBind: true,
              },
            ],
            options,
            props,
        ),
    );
}

export default {
    definitions: {
        Proxy: {
            LookupTable: createProxyDefinition(vtkLookupTableProxy, [], [], {
                presetName: 'Default (Cool to Warm)',
            }),
            // Controls appearance of the volume
            PiecewiseFunction: createProxyDefinition(vtkPiecewiseFunctionProxy),
        },
        Sources: {
            // For stand-alone data objects
            TrivialProducer: activateOnCreate(createProxyDefinition(vtkProxySource)),
            Contour: proxyFilter.Contour,
        },
        Representations: {
            Slice: createProxyDefinition(
                vtkSliceRepresentationProxy,
                proxyUI.Slice,
                proxyLinks.Slice
            ),
            Volume: createProxyDefinition(
                vtkVolumeRepresentationProxy,
                proxyUI.Volume,
                proxyLinks.Volume,
            ),
        },
        Views: {
            View3D: createDefaultView(vtkView, proxyUI.View3D),
            View2D: createDefaultView(vtk2DView, proxyUI.View2D)
        },
    },
    representations: {
        View3D: proxyViewRepresentationMapping.View3D,
        View2D: proxyViewRepresentationMapping.View2D,
    },
    filters: {
        vtkPolyData: [],
        vtkImageData: ['Contour'],
    },
};