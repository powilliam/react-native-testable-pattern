export interface ComponentState<S = {}, C = {}> {
  readonly states: S;
  readonly callbacks: C;
}
