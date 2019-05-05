import { fromEvent, merge, Observable } from "rxjs"
import { mapTo } from "rxjs/operators"
import { Signal } from "./types"

export default class Canvas {
  private context = this.canvas.getContext("2d")
  private dragging = false
  private color = "#000"
  private lastPosition = {
    x: 0,
    y: 0
  }

  private readonly mousedown$ = fromEvent<MouseEvent>(this.canvas, "mousedown")
  private readonly mouseup$ = fromEvent<MouseEvent>(this.canvas, "mouseup")
  private readonly mouseout$ = fromEvent<MouseEvent>(this.canvas, "mouseout")
  private readonly mousemove$ = fromEvent<MouseEvent>(this.canvas, "mousemove")

  constructor(
    readonly canvas: HTMLCanvasElement,
    readonly signal$: Observable<Signal<any, any>>
  ) {
    this.canvas.width = 500
    this.canvas.height = 500

    merge(
      // drag 開始
      this.mousedown$.pipe(mapTo(true)),

      // drag 終了
      this.mouseup$.pipe(mapTo(false)),
      this.mouseout$.pipe(mapTo(false))
    ).subscribe(dragging => {
      this.dragging = dragging

      if (dragging) {
        this.context.beginPath()
      } else {
        this.context.closePath()
      }
    })

    this.mousemove$.subscribe(e => this.draw(e.layerX, e.layerY))
  }

  private readonly draw = (x: number, y: number) => {
    if (!this.dragging) {
      return
    }

    this.context.lineCap = "round"
    this.context.lineJoin = "round"
    this.context.lineWidth = 2
    this.context.strokeStyle = this.color

    if (this.lastPosition.x === null || this.lastPosition.y === null) {
      this.context.moveTo(x, y)
    } else {
      this.context.moveTo(this.lastPosition.x, this.lastPosition.y)
    }

    this.context.lineTo(x, y)
    this.context.stroke()

    this.lastPosition.x = x
    this.lastPosition.y = y
  }
}
