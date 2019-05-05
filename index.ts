import Canvas from "./src/canvas"
import { from } from "rxjs"
import update from "./src/update"

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector<HTMLCanvasElement>("#app")
  if (!canvas) {
    return
  }

  const signal$ = from([{ type: "init", payload: undefined }])
  const state$ = signal$.pipe(update)

  new Canvas(canvas, state$)
})
