export type FormOption<TValue extends string> = {
  label: string;
  value: TValue;
};

export type FormOptionGroupProps<TValue extends string> = {
  errorMessage?: string;
  helperMessage?: string;
  label: string;
  onChange: (value: TValue) => void;
  options: readonly FormOption<TValue>[];
  value: TValue;
};
