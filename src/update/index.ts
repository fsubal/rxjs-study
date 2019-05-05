import immer from "immer"
import { scan } from "rxjs/operators"
import initial, { Model } from "../model"
import { Messages } from "./message"

export default scan<Messages, Model>(
  (currentState, msg) =>
    immer(currentState, state => {
      switch (msg.type) {
        case "init": {
          state.dragging = false
          break
        }

        case "increment": {
          const { by } = msg.payload
          state.count += by
          break
        }

        case "decrement": {
          const { by } = msg.payload
          state.count -= by
          break
        }

        default: {
          unreachable(msg)
        }
      }
    }),
  initial
)

const unreachable = (_: never) => {
  // do nothing
}
