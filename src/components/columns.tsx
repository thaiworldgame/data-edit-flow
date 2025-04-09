
import { ColumnDef } from "@tanstack/react-table";
import { Person } from "@/types/data";
import EditableCell from "./EditableCell";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const getColumns = (
  isEditing: (id: string, columnId: string) => boolean,
  startEditing: (id: string, columnId: string, value: string) => void,
  saveEdit: (id: string, columnId: string, value: string) => void,
  cancelEdit: () => void
): ColumnDef<Person>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row, column }) => {
      const value = row.getValue("name") as string;
      const id = row.original.id;
      const columnId = column.id;
      
      return (
        <EditableCell
          value={value}
          isEditing={isEditing(id, columnId)}
          onSave={(newValue) => saveEdit(id, columnId, newValue)}
          onCancel={cancelEdit}
        />
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row, column }) => {
      const value = row.getValue("email") as string;
      const id = row.original.id;
      const columnId = column.id;
      
      return (
        <EditableCell
          value={value}
          isEditing={isEditing(id, columnId)}
          onSave={(newValue) => saveEdit(id, columnId, newValue)}
          onCancel={cancelEdit}
        />
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row, column }) => {
      const value = row.getValue("role") as string;
      const id = row.original.id;
      const columnId = column.id;
      
      return (
        <EditableCell
          value={value}
          isEditing={isEditing(id, columnId)}
          onSave={(newValue) => saveEdit(id, columnId, newValue)}
          onCancel={cancelEdit}
        />
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={status === "active" ? "default" : "secondary"}
          className={`${
            status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
    cell: ({ row }) => {
      const joinDate = row.getValue("joinDate") as string;
      return <span>{format(new Date(joinDate), "PPP")}</span>;
    },
  },
];
