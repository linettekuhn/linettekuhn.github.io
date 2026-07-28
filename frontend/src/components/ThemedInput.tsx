import { forwardRef } from "react";
import { ThemedText } from "./ThemedText";
import styles from "./ThemedInput.module.css";

type ThemedInputProps = {
  label?: string;
  multiline?: boolean;
  type?: string;
  placeholder?: string;
  value?: string | ReadonlyArray<string> | number | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  id?: string;
  required?: boolean;
  rows?: number;
  className?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
};

export const ThemedInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  ThemedInputProps
>(function ThemedInput(
  {
    label,
    multiline,
    type,
    placeholder,
    value,
    onChange,
    onFocus,
    onBlur,
    disabled,
    readOnly,
    name,
    id,
    required,
    rows,
    className,
    style,
    autoFocus,
    autoComplete,
    maxLength,
    minLength,
  },
  ref,
) {
  const baseProps = {
    value,
    onChange,
    onFocus,
    onBlur,
    disabled,
    readOnly,
    name,
    id,
    required,
    type,
    placeholder,
    autoFocus,
    autoComplete,
    maxLength,
    minLength,
  };

  return (
    <label className={`${styles.wrapper} ${className ?? ""}`} style={style}>
      {label && (
        <ThemedText
          style={{ alignSelf: "flex-start", paddingLeft: "var(--space-3xs)" }}
          type="overline"
        >
          {label}
        </ThemedText>
      )}
      {multiline ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={styles.textarea}
          rows={rows}
          {...baseProps}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          className={styles.input}
          {...baseProps}
        />
      )}
    </label>
  );
});
