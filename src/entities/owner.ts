import { Browsable } from "./browsable";

export interface Owner extends Browsable {
  readonly node_id: string;
  readonly login: string;
  readonly avatar_url: string;
}
