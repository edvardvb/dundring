import { Box } from '@radix-ui/themes';

export function DecorativeBox(
  props: React.ComponentPropsWithoutRef<typeof Box>
) {
  return (
    <Box
      height="100%"
      {...props}
      style={{
        backgroundColor: 'var(--gray-a3)',
        backgroundClip: 'padding-box',
        border: '1px solid var(--gray-a5)',
        borderRadius: 'var(--radius-1)',
        ...props.style,
      }}
    />
  );
}
