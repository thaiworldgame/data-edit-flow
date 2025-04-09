
export interface Person {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
}

export type EditingCell = {
  rowId: string;
  columnId: string;
  initialValue: string;
};
