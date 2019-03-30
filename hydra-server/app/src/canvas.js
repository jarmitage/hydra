
const Canvas = function (canvasElem) {
  const sizeCanvas = () => {
    canvasElem.width = 3840
    canvasElem.height = 2160
    canvasElem.style.width = '100%'
    canvasElem.style.height = '100%'
  }

  return {
    element: canvasElem,
    size: sizeCanvas
  }
}

module.exports = Canvas
