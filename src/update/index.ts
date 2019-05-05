import immer from "immer"
import { scan } from "rxjs/operators"
import { Msg } from "../types"
import initial, { Model } from "../model"

export type Messages =
  | Msg<"init", void>
  | Msg<"increment", { by: number }>
  | Msg<"decrement", { by: number }>

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
