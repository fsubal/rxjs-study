export default class Canvas {
  private context = this.canvas.getContext('2d')
  private dragging = false
  private color = '#000'
  private lastPosition = {
    x: 0,
    y: 0
  }

  constructor(readonly canvas: HTMLCanvasElement) {
    this.canvas.width = 500
    this.canvas.height = 500

    this.canvas.addEventListener('mousedown', this.dragStart)
    this.canvas.addEventListener('mouseup', this.dragEnd)
    this.canvas.addEventListener('mouseout', this.dragEnd)
    this.canvas.addEventListener('mousemove', e => {
      this.draw(e.layerX, e.layerY)
    })
  }

  private readonly draw = (x: number, y: number) => {
    if(!this.dragging) {
      return
    }
    this.context.lineCap = 'round'
    this.context.lineJoin = 'round'
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

  private readonly clear = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  private readonly dragStart = () => {
    this.context.beginPath()

    this.dragging = true
  }

  private readonly dragEnd = () => {
    this.context.closePath()
    this.dragging = false
  }
}
