import { Browsable } from "./browsable";

export interface Organization extends Browsable {
  readonly node_id: string;
  readonly login: string;
  readonly name: string;
  readonly description: string;
  readonly location: string;
  readonly email: string;
  readonly avatar_url: string;
}
