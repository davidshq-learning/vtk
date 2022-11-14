const View3D = {
    vtkImageData: { name: 'Volume' },
  };
  
  // TODO: Rework to include Slice
  const View2D = {
    vtkImageData: { name: 'Slice' },
  };
  
  export default {
    View2D,
    View3D,
  };
  