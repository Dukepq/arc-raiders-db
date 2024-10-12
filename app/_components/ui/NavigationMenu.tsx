import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";

import cn from "@/app/utils/cn";
import { usePathname, useRouter } from "next/navigation";
import { useNavigationProgressContext } from "@/app/context/navigationProgressContext";
import { ProgressLinkProps } from "./ProgressLink";
import Link from "next/link";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root ref={ref} className={cn(className)} {...props}>
    {children}
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn("flex h-12", className)}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(
      "group px-6 h-12 flex gap-2 items-center data-[state=open]:bg-text/10",
      className
    )}
    {...props}
  >
    {children}
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn("absolute z-30 top-12 left-0 w-full rounded-sm", className)}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

export const NavigationMenuProgressLink = React.forwardRef<
  HTMLAnchorElement,
  ProgressLinkProps
>(
  (
    { children, href, whenClicked, className }: ProgressLinkProps,
    forwardedRef
  ) => {
    const pathname = usePathname();
    const router = useRouter();
    const progress = useNavigationProgressContext();
    return (
      <NavigationMenuPrimitive.Link
        className="px-3 py-1.5 hover:bg-text/10"
        asChild
      >
        <Link
          href={href}
          className={className}
          ref={forwardedRef}
          onClick={(e) => {
            e.preventDefault();
            if (whenClicked) {
              whenClicked(e);
            }
            if (pathname === href) return;
            progress.start();

            React.startTransition(() => {
              progress.done();
              router.push(href.toString());
            });
          }}
        >
          {children}
        </Link>
      </NavigationMenuPrimitive.Link>
    );
  }
);

export const NavigationMenuTriggerProgressLink = React.forwardRef<
  HTMLAnchorElement,
  ProgressLinkProps
>(
  (
    { children, href, whenClicked, className }: ProgressLinkProps,
    forwardedRef
  ) => {
    const pathname = usePathname();
    const router = useRouter();
    const progress = useNavigationProgressContext();
    return (
      <NavigationMenuPrimitive.Trigger
        className="px-6 h-full flex gap-2 items-center data-[state=open]:bg-text/10 group"
        asChild
      >
        <Link
          href={href}
          className={className}
          ref={forwardedRef}
          onClick={(e) => {
            e.preventDefault();
            if (whenClicked) {
              whenClicked(e);
            }
            if (pathname === href) return;
            progress.start();

            React.startTransition(() => {
              progress.done();
              router.push(href.toString());
            });
          }}
        >
          {children}
        </Link>
      </NavigationMenuPrimitive.Trigger>
    );
  }
);

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

export {
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenu,
  NavigationMenuTrigger,
  NavigationMenuItem,
  NavigationMenuLink,
};
