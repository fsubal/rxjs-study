import Canvas from "./src/canvas"
import { Subject } from "rxjs"
import update from "./src/update"
import { Messages } from "./src/update/message"

document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector<HTMLCanvasElement>("#app")
  if (!el) {
    return
  }

  const store$ = new Subject<Messages>()
  const model$ = store$.pipe(update)
  const dispatch = (msg: Messages) => store$.next(msg)
  const canvas = new Canvas(el, dispatch)

  model$.subscribe(state => {
    requestAnimationFrame(() => canvas.render(state))
  })
})
