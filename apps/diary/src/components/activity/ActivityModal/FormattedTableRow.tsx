import { Table } from '@radix-ui/themes';

interface FormattedTableRowProps {
  label: string;
  avgValue: number | string | undefined;
  maxValue: number | string | undefined;
}

export function FormattedTableRow({
  label,
  avgValue,
  maxValue,
}: FormattedTableRowProps) {
  return (
    <Table.Row>
      <Table.RowHeaderCell>{label}</Table.RowHeaderCell>
      <Table.Cell>{avgValue}</Table.Cell>
      <Table.Cell>{maxValue}</Table.Cell>
    </Table.Row>
  );
}
