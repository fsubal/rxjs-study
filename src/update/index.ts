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
      case (msg) {
        when ["init", undefined] -> {
          state.dragging = false
          break
        }

        when ["increment", { by }] -> {
          state.count += by
          break
        }

        when ["decrement", { by }] -> {
          state.count -= by
          break
        }

        when _ -> {
          unreachable(msg)
        }
      }
    }),
  initial
)

const unreachable = (_: never) => {
  // do nothing
}
