export interface Msg<T extends string, P> {
  type: T
  payload: P
}

export interface Renderable<Model> {
  render(state: Model): void
}
