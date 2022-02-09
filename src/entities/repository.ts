import { Browsable } from "./browsable";
import { Owner } from "./owner";

export interface Repository extends Browsable {
  readonly node_id: string;
  readonly name: string;
  readonly fullname: string;
  readonly owner: Owner;
}
