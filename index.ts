import Canvas from "./src/canvas"
import { Subject } from "rxjs"
import update, { Messages } from "./src/update"

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector<HTMLCanvasElement>("#app")
  if (!canvas) {
    return
  }

  const store$ = new Subject<Messages>()
  const model$ = store$.pipe(update)
  const dispatch = (msg: Messages) => store$.next(msg)

  model$.subscribe(console.log)

  new Canvas(canvas, model$, dispatch)
})
