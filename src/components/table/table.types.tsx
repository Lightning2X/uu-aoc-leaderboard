export interface MultiUseTableProps {
  columns: Column[];
  data: any[];
  isLoading: boolean;
  isError: boolean;
  onRowClick?: (row: any) => void;
}

export interface Column {
  id: string;
  label: unknown;
  mobile?: boolean;
  minWidth?: number;
  align?: "right";
  format?: (value: unknown) => JSX.Element;
}
