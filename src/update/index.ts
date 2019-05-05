import immer from "immer"
import { scan } from "rxjs/operators"
import { Signal } from "../types"

export interface State {
  dragging: boolean
  count: number
}

const initialState: State = {
  dragging: true,
  count: 0
}

export type Signals =
  | Signal<"init", void>
  | Signal<"increment", { by: number }>
  | Signal<"decrement", { by: number }>

export default scan<Signals, State>(
  (currentState, signal) =>
    immer(currentState, state => {
      switch (signal.type) {
        case "init": {
          state.dragging = false
          break
        }

        case "increment": {
          const { by } = signal.payload
          state.count += by
          break
        }

        case "decrement": {
          const { by } = signal.payload
          state.count -= by
          break
        }

        default: {
          unreachable(signal)
        }
      }
    }),
  initialState
)

const unreachable = (signal: never) => {
  throw new Error(`unreachable(${JSON.stringify(signal)})`)
}
