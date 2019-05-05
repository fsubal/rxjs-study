const msg = <T extends string, P>(type: T, payload: P) => ({ type, payload })

const Msg = {
  init: () => msg("init", undefined as void),
  increment: (by: number) => msg("increment", { by }),
  decrement: (by: number) => msg("decrement", { by })
}

export default Msg

export type Messages = ReturnType<typeof Msg[keyof typeof Msg]>
