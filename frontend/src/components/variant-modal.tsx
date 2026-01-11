import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface VariantModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddVariant: (variant: { name: string; price: string; sku: string }) => void
}

export function VariantModal({ open, onOpenChange, onAddVariant }: VariantModalProps) {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [sku, setSku] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddVariant({ name, price, sku })
    // Reset form
    setName("")
    setPrice("")
    setSku("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Create Variant</DialogTitle>
          <DialogDescription>Add a new variant for this product</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Variant Name */}
          <div className="space-y-2">
            <Label htmlFor="variant-name" className="text-sm font-medium">
              Variant Name
            </Label>
            <Input
              id="variant-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Small Blue, XL Red"
              required
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          {/* SKU */}
          <div className="space-y-2">
            <Label htmlFor="sku" className="text-sm font-medium">
              SKU
            </Label>
            <Input
              id="sku"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="Enter SKU code"
              required
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Variant
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
