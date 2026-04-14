export type FormActionsProps = {
  isPrimaryDisabled?: boolean;
  isSecondaryDisabled?: boolean;
  onPrimaryPress: () => void;
  onSecondaryPress: () => void;
  primaryLabel: string;
  secondaryLabel?: string;
};
