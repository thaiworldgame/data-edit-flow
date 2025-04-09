
import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBar from "./StatusBar";
import { Person } from "@/types/data";
import { getColumns } from "./columns";
import { EditingCell } from "@/types/data";

interface DataTableProps {
  data: Person[];
  onUpdateData: (updatedData: Person[]) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, onUpdateData }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);

  const isEditing = (rowId: string, columnId: string) => {
    return editingCell?.rowId === rowId && editingCell?.columnId === columnId;
  };

  const startEditing = (rowId: string, columnId: string, initialValue: string) => {
    setEditingCell({
      rowId,
      columnId,
      initialValue,
    });
  };

  const saveEdit = (rowId: string, columnId: string, newValue: string) => {
    if (!editingCell) return;
    
    // Don't update if the value is the same
    if (newValue === editingCell.initialValue) {
      setEditingCell(null);
      return;
    }

    const updatedData = data.map((item) => {
      if (item.id === rowId) {
        return {
          ...item,
          [columnId]: newValue,
        };
      }
      return item;
    });

    onUpdateData(updatedData);
    toast.success("Data updated successfully");
    setEditingCell(null);
  };

  const cancelEdit = () => {
    setEditingCell(null);
  };

  const columns = React.useMemo(
    () => getColumns(isEditing, startEditing, saveEdit, cancelEdit),
    [data, editingCell]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="rounded-md border shadow-sm">
      <div className="relative">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="font-semibold"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell 
                      key={cell.id} 
                      className="p-0 px-4"
                      style={{ width: cell.column.getSize() }}
                      onClick={() => {
                        const columnId = cell.column.id;
                        // Skip editing for non-editable columns
                        if (columnId === "status" || columnId === "joinDate") return;
                        
                        if (!editingCell) {
                          startEditing(
                            row.original.id,
                            columnId,
                            cell.getValue() as string
                          );
                        }
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <StatusBar 
        isEditing={!!editingCell} 
        message={editingCell 
          ? "Editing cell - Press Enter to save or Esc to cancel" 
          : ""} 
      />
    </div>
  );
};

export default DataTable;
