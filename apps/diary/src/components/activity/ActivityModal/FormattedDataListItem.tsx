import { Text, DataList } from '@radix-ui/themes';

interface FormattedDataListItemProps {
  label: string;
  value: string | number | undefined;
  unit?: string;
}

export function FormattedDataListItem({
  label,
  value,
  unit,
}: FormattedDataListItemProps) {
  return (
    <DataList.Item>
      <DataList.Label minWidth="88px">
        <Text className="text-slate-300">{label}</Text>
      </DataList.Label>
      <DataList.Value className="pl-5">
        {value}
        {unit && ` ${unit}`}
      </DataList.Value>
    </DataList.Item>
  );
}
