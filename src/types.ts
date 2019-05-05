export interface Signal<T extends string, P> {
  type: T
  payload: P
}
