// Define the attributes of each container for a rendered output
export function applyStyle(element) {
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