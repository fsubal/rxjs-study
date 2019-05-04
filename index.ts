import Canvas from "./src/canvas";

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector<HTMLCanvasElement>('#app')
  if (!canvas) {
    return
  }

  new Canvas(canvas)
})
