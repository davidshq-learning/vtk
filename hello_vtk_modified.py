# Minor refactoring to make the code easier to understand (at least for me).
# Find original in hello_vtk.py

import vtkmodules.vtkInteractionStyle # This is required, despite what Python says.
import vtkmodules.vtkRenderingOpenGL2 # Also required.
from vtkmodules.vtkCommonColor import vtkNamedColors
from vtkmodules.vtkFiltersSources import vtkConeSource
from vtkmodules.vtkRenderingCore import (
    vtkActor,
    vtkPolyDataMapper,
    vtkRenderWindow,
    vtkRenderer
)

def main(argv):
    # Allows one to quickly reference colors by names rather than RGBA values.
    colors = vtkNamedColors()
    mistyRose = colors.GetColor3d('MistyRose')
    midnightBlue = colors.GetColor3d('MidnightBlue')

    # Creates a cone with specified properties.
    cone = vtkConeSource()
    cone.SetHeight(3.0)
    cone.SetRadius(1.0)
    cone.SetResolution(10) # Defines how many sides (facets) the cone will have.

    # Maps polygona data (e.g. cone) to graphics primitives.
    coneMapper = vtkPolyDataMapper()
    coneOutputPort = cone.GetOutputPort()
    coneMapper.SetInputConnection(coneOutputPort)

    # Represents an entity in a rendering scene.
    coneActor = vtkActor()
    coneActor.SetMapper(coneMapper)
    coneActor.GetProperty().SetColor(mistyRose)

    # Controls the process by which objects/entities are rendered.
    coneRenderer = vtkRenderer()
    coneRenderer.AddActor(coneActor)
    coneRenderer.SetBackground(midnightBlue)

    # Represents the window in a GUI where the rendering appears.
    coneWindow = vtkRenderWindow()
    coneWindow.AddRenderer(coneRenderer)
    coneWindow.SetSize(300, 300)
    coneWindow.SetWindowName('VTK Modified')

    for i in range(0, 360):
        # Asks all renderers in the window to render image and synchronizes this process.
        coneWindow.Render()
        # Gets existing camera or creates a new instance of vtkCamera
        # And rotates camera around view up vector centered at the focal point.
        coneRenderer.GetActiveCamera().Azimuth(1)

if __name__ == '__main__':
    import sys

    main(sys.argv)

# Useful Links
# - https://vtk.org/doc/nightly/html/classvtkNamedColors.html#details
# - https://vtk.org/doc/nightly/html/classvtkConeSource.html#details
# - https://vtk.org/doc/nightly/html/classvtkPolyDataMapper.html#details
# - https://vtk.org/doc/nightly/html/classvtkActor.html#details
# - https://vtk.org/doc/nightly/html/classvtkRenderer.html#details
# - https://vtk.org/doc/nightly/html/classvtkRenderWindow.html#details
# - https://vtk.org/doc/nightly/html/classvtkCamera.html#details