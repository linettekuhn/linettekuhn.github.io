import { type ElementType, type PropsWithChildren } from "react";
import styles from "./ThemedButton.module.css";

export type ThemedButtonVariant = "solid" | "outlined" | "link";
export type ThemedButtonSize = "sm" | "md" | "lg";

type ThemedButtonProps<C extends ElementType = "button"> = PropsWithChildren<
  {
    as?: C;
    variant?: ThemedButtonVariant;
    size?: ThemedButtonSize;
    color?: string;
    disabled?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
  } & Omit<
    React.ComponentPropsWithoutRef<C>,
    "as" | "children" | "className" | "disabled" | "style"
  >
>;

export function ThemedButton<C extends ElementType = "button">({
  as,
  variant = "solid",
  size = "md",
  color,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  className,
  children,
  style,
  ...rest
}: ThemedButtonProps<C>) {
  const Component = as || "button";

  const colorStyles: React.CSSProperties & Record<string, string> = {};
  if (color) {
    colorStyles["--btn-color"] = color;
    colorStyles["--btn-bg"] = color;
    colorStyles["--btn-bg-hover"] = color;
    colorStyles["--btn-bg-active"] = color;
    colorStyles["--btn-text"] = color;
  }

  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component
      className={classes}
      disabled={Component === "button" ? disabled : undefined}
      aria-disabled={disabled || undefined}
      style={{ ...colorStyles, ...style }}
      {...rest}
    >
      {loading && <span className={styles.spinner} />}
      {leftIcon && !loading && (
        <span className={styles.leftIcon}>{leftIcon}</span>
      )}
      {children}
      {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
    </Component>
  );
}
