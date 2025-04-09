
import { useState } from "react";
import DataTable from "@/components/DataTable";
import { people as initialData } from "@/data/mockData";
import { Person } from "@/types/data";

const Index = () => {
  const [data, setData] = useState<Person[]>(initialData);

  const handleUpdateData = (updatedData: Person[]) => {
    setData(updatedData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-10 px-4 max-w-5xl">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Team Members</h1>
        <p className="text-gray-600 mb-8">
          Click on any cell to edit its content. Press Enter to save or Escape to cancel.
        </p>
        <DataTable data={data} onUpdateData={handleUpdateData} />
        <div className="mt-4 text-sm text-gray-500">
          <p>Note: Status and Join Date fields are not editable</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
