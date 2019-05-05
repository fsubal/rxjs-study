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

  const dispatch = (signal: Signals | Promise<Signals>) => {
    if (signal instanceof Promise) {
      signal.then(store$.next)
      return
    }

    store$.next(signal)
  }

  new Canvas(canvas, state$, dispatch)
})
