import { cva } from "class-variance-authority";
import * as React from "react";
import "./styles.css";

import { cn } from "@/shared/lib/utils";
import { Slot } from "@radix-ui/react-slot";

import type { VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary/15 text-primary hover:bg-primary/20 border-gradient shadow-2xl backdrop-blur-xl z-1 rounded-2xl font-semibold",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90  focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 dark:hover:bg-destructive/50",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-4 py-2 text-xl  has-[>svg]:px-4  ",
        sm: "h-9 rounded-lg gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-15 px-6 rounded-2xl text-2xl max-md:text-lg max-md:h-13 has-[>svg]:px-4",
        icon: "size-12",
        "icon-sm": "size-8",
        "icon-lg": "size-16 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
