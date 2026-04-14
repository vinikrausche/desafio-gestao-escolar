import type { ForwardedRef, ReactNode } from 'react';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('@gluestack-ui/overlay', () => {
  const React = require('react');

  return {
    OverlayProvider: ({ children }: { children: ReactNode }) => children,
  };
});

jest.mock('@gluestack-ui/themed', () => {
  const React = require('react');
  const {
    ActivityIndicator,
    Pressable,
    Text,
    TextInput,
    View,
  } = require('react-native');

  function createViewComponent(displayName: string) {
    const Component = ({
      children,
      ...props
    }: {
      children?: ReactNode;
      [key: string]: unknown;
    }) => React.createElement(View, props, children);

    Component.displayName = displayName;

    return Component;
  }

  function createTextComponent(displayName: string) {
    const Component = ({
      children,
      ...props
    }: {
      children?: ReactNode;
      [key: string]: unknown;
    }) => React.createElement(Text, props, children);

    Component.displayName = displayName;

    return Component;
  }

  const Button = ({
    accessibilityLabel,
    children,
    isDisabled,
    onPress,
    ...props
  }: {
    accessibilityLabel?: string;
    children?: ReactNode;
    isDisabled?: boolean;
    onPress?: () => void;
    [key: string]: unknown;
  }) =>
    React.createElement(
      Pressable,
      {
        ...props,
        accessibilityLabel,
        disabled: isDisabled,
        onPress: isDisabled ? undefined : onPress,
      },
      children,
    );

  const InputField = React.forwardRef(
    (
      props: {
        onChangeText?: (value: string) => void;
        placeholder?: string;
        value?: string;
        [key: string]: unknown;
      },
      ref: ForwardedRef<typeof TextInput>,
    ) => React.createElement(TextInput, { ...props, ref }),
  );

  const TextareaInput = React.forwardRef(
    (
      props: {
        onChangeText?: (value: string) => void;
        placeholder?: string;
        value?: string;
        [key: string]: unknown;
      },
      ref: ForwardedRef<typeof TextInput>,
    ) => React.createElement(TextInput, { ...props, multiline: true, ref }),
  );

  const Icon = createViewComponent('MockIcon');

  return {
    Badge: createViewComponent('MockBadge'),
    BadgeText: createTextComponent('MockBadgeText'),
    Button,
    ButtonText: createTextComponent('MockButtonText'),
    Card: createViewComponent('MockCard'),
    EditIcon: 'EditIcon',
    GluestackUIProvider: ({
      children,
    }: {
      children: ReactNode;
      config?: unknown;
    }) => children,
    Heading: createTextComponent('MockHeading'),
    HStack: createViewComponent('MockHStack'),
    Icon,
    Input: createViewComponent('MockInput'),
    InputField,
    Spinner: ActivityIndicator,
    Text: createTextComponent('MockText'),
    Textarea: createViewComponent('MockTextarea'),
    TextareaInput,
    TrashIcon: 'TrashIcon',
    VStack: createViewComponent('MockVStack'),
  };
});

// ! O setup centraliza defaults do runner para manter os testes previsiveis.
afterEach(() => {
  jest.restoreAllMocks();
});
