import Canvas from "./src/canvas"
import { from } from "rxjs"

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector<HTMLCanvasElement>('#app')
  if (!canvas) {
    return
  }

  const signal$ = from([{ type: 'init', payload: {} }])

  new Canvas(canvas, signal$)
})
