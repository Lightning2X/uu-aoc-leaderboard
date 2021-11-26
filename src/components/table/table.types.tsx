export interface MultiUseTableProps {
  columns: Column[];
  data: any[];
}

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: unknown) => JSX.Element;
}
