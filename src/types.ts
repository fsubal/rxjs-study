export interface Msg<T extends string, P> {
  type: T
  payload: P
}
