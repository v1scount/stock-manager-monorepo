"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X, Plus } from "lucide-react"
import { VariantModal } from "./variant-modal"

interface ProductUploadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface Variant {
  id: string
  name: string
  price: string
  sku: string
}

export function ProductUploadModal({ open, onOpenChange }: ProductUploadModalProps) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [variants, setVariants] = useState<Variant[]>([])
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview(null)
  }

  const handleAddVariant = (variant: Omit<Variant, "id">) => {
    const newVariant = {
      ...variant,
      id: Math.random().toString(36).substr(2, 9),
    }
    setVariants([...variants, newVariant])
  }

  const handleRemoveVariant = (id: string) => {
    setVariants(variants.filter((v) => v.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Product data:", { name, category, description, imageFile, variants })
    // Handle form submission
    onOpenChange(false)
    // Reset form
    setName("")
    setCategory("")
    setDescription("")
    setImageFile(null)
    setImagePreview(null)
    setVariants([])
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Upload Product</DialogTitle>
            <DialogDescription>Add a new product to your catalog with all the details</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Product Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                required
                className="w-full"
              />
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Category
              </Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                  <SelectItem value="sports">Sports & Outdoors</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="toys">Toys & Games</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
                rows={4}
                required
                className="w-full resize-none"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="image" className="text-sm font-medium">
                Product Image
              </Label>
              {!imagePreview ? (
                <label
                  htmlFor="image"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 px-6 py-12 transition-colors hover:bg-muted"
                >
                  <Upload className="mb-3 h-10 w-10 text-muted-foreground" />
                  <p className="mb-1 text-sm font-medium text-foreground">Click to upload image</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    required
                  />
                </label>
              ) : (
                <div className="relative rounded-lg border border-border bg-muted/50 p-4">
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute right-2 top-2 rounded-full bg-background p-1.5 shadow-md transition-colors hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="h-48 w-full rounded-md object-cover"
                  />
                </div>
              )}
            </div>

            {/* Variants Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Product Variants</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsVariantModalOpen(true)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Variant
                </Button>
              </div>

              {variants.length > 0 && (
                <div className="space-y-2">
                  {variants.map((variant) => (
                    <div
                      key={variant.id}
                      className="flex items-center justify-between rounded-lg border border-border bg-muted/50 px-4 py-3"
                    >
                      <div>
                        <p className="font-medium text-foreground">{variant.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${variant.price} · SKU: {variant.sku}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveVariant(variant.id)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {variants.length === 0 && <p className="text-sm text-muted-foreground">No variants added yet</p>}
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Upload Product
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <VariantModal open={isVariantModalOpen} onOpenChange={setIsVariantModalOpen} onAddVariant={handleAddVariant} />
    </>
  )
}
