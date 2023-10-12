export interface ButtonValueProps {
  name: string | undefined;
  label: string | undefined;
  operator: (x: number, y: number | undefined) => number | undefined;
}
