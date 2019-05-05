import Canvas from "./src/canvas"
import { Subject } from "rxjs"
import update, { Signals } from "./src/update"

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector<HTMLCanvasElement>("#app")
  if (!canvas) {
    return
  }

  const store$ = new Subject<Signals>()
  const state$ = store$.pipe(update)
  const dispatch = (signal: Signals) => store$.next(signal)

  new Canvas(canvas, state$, dispatch)
})
