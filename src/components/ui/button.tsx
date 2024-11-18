import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import colors from "@/app/theme/colors";
import styled from "styled-components";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        destructive: "",
        outline: "",
        secondary: "",
        ghost: "",
        link: "",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  theme?: "white" | "dark";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, theme = "white", ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const themeColors = colors[theme];

    const variantStyles = {
      default: {
        backgroundColor: themeColors.buttonPrimary,
        color: themeColors.buttonPrimaryForeground,
        "&:hover": {
          backgroundColor: themeColors.buttonPrimaryHover,
        },
      },
      destructive: {
        backgroundColor: themeColors.buttonDestructive,
        color: themeColors.buttonDestructiveForeground,
        "&:hover": {
          backgroundColor: themeColors.buttonDestructiveHover,
        },
      },
      secondary: {
        backgroundColor: themeColors.buttonSecondary,
        color: themeColors.buttonSecondaryForeground,
        "&:hover": {
          backgroundColor: themeColors.buttonSecondaryHover,
        },
      },
      outline: {
        backgroundColor: themeColors.buttonOutlineBackground,
        color: themeColors.text,
        border: `1px solid ${themeColors.buttonOutlineBorder}`,
        "&:hover": {
          backgroundColor: themeColors.buttonOutlineHoverBackground,
          color: themeColors.buttonOutlineHoverForeground,
        },
      },
      ghost: {
        backgroundColor: "transparent",
        color: themeColors.text,
        "&:hover": {
          backgroundColor: themeColors.buttonGhostHoverBackground,
          color: themeColors.buttonGhostHoverForeground,
        },
      },
      link: {
        backgroundColor: "transparent",
        color: themeColors.buttonLink,
        textDecoration: "underline",
        "&:hover": {
          color: themeColors.buttonLinkHover,
        },
      },
    };

    const style = {
      ...variantStyles[variant || "default"],
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={style}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
