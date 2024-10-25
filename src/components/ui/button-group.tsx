"use client"

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import * as React from "react"

import { cn } from "@/lib/utils"

const ButtonGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("flex gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
ButtonGroup.displayName = RadioGroupPrimitive.Root.displayName

const ButtonGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> &
  { children: React.ReactNode }
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "data-[state=checked]:border-blue-400",
        "data-[state=checked]:border-2",
        "text-center focus:outline-none 2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item >
  )
})
ButtonGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { ButtonGroup, ButtonGroupItem }
