const draw = (parentElement) => {
  parentElement.innerHTML = ''
  const canvas = document.createElement('canvas')
  // ... set up the canvas with chart js
  parentElement.appendChild(canvas)
}

