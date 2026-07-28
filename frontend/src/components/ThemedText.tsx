import { type ElementType, type PropsWithChildren, forwardRef } from "react";
import styles from "./ThemedText.module.css";

export type ThemedTextType =
  | "displayLarge"
  | "displayMedium"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "caption"
  | "endnote"
  | "footnote"
  | "overline"
  | "blockquote";

export type ThemedTextWeight =
  | "thin"
  | "extraLight"
  | "light"
  | "regular"
  | "medium"
  | "semiBold"
  | "bold"
  | "extraBold"
  | "black";

export type ThemedTextVariant = "solid" | "outlined" | "link";

type PolymorphicAsProp<C extends ElementType> = {
  as?: C;
};

type AsProp<C extends ElementType> = PolymorphicAsProp<C>;

type ThemedTextProps<C extends ElementType = "span"> = PropsWithChildren<
  {
    type?: ThemedTextType;
    weight?: ThemedTextWeight;
    variant?: ThemedTextVariant;
    italic?: boolean;
    altColor?: boolean;
    lightColor?: string;
    darkColor?: string;
    className?: string;
    textAlign?: string;
  } & AsProp<C> &
    Omit<React.ComponentPropsWithoutRef<C>, "as" | "children" | "className">
>;

const typeClassMap: Record<ThemedTextType, string> = {
  displayLarge: styles.displayLarge,
  displayMedium: styles.displayMedium,
  h1: styles.h1,
  h2: styles.h2,
  h3: styles.h3,
  h4: styles.h4,
  h5: styles.h5,
  h6: styles.h6,
  body: styles.body,
  caption: styles.caption,
  endnote: styles.endnote,
  footnote: styles.footnote,
  overline: styles.overline,
  blockquote: styles.blockquote,
};

const weightClassMap: Record<ThemedTextWeight, string> = {
  thin: styles.weightThin,
  extraLight: styles.weightExtraLight,
  light: styles.weightLight,
  regular: styles.weightRegular,
  medium: styles.weightMedium,
  semiBold: styles.weightSemiBold,
  bold: styles.weightBold,
  extraBold: styles.weightExtraBold,
  black: styles.weightBlack,
};

const defaultElementMap: Record<ThemedTextType, ElementType> = {
  displayLarge: "h1",
  displayMedium: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body: "p",
  caption: "span",
  endnote: "span",
  footnote: "span",
  overline: "span",
  blockquote: "blockquote",
};

export const ThemedText = forwardRef<ElementType, ThemedTextProps>(
  function ThemedText(
    {
      as,
      type = "body",
      weight,
      variant,
      italic = false,
      altColor,
      lightColor,
      darkColor,
      textAlign,
      className,
      children,
      style,
      ...rest
    },
    ref,
  ) {
    const Component = as || defaultElementMap[type];

    const typeClass = typeClassMap[type];
    const weightClass = weight ? weightClassMap[weight] : undefined;

    const colorStyles = {
      ...(lightColor && { "--text-color-light": lightColor }),
      ...(darkColor && { "--text-color-dark": darkColor }),
      ...(textAlign && { textAlign }),
    } as React.CSSProperties;

    const classes = [
      styles.text,
      typeClass,
      weightClass,
      variant && styles[variant],
      italic && styles.italic,
      altColor && styles.altColor,
      lightColor && styles.themedLight,
      darkColor && styles.themedDark,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Component
        ref={ref}
        className={classes}
        style={{ ...colorStyles, ...style }}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);
