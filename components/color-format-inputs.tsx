"use client"

import type React from "react"

import { useState, useEffect } from "react"
import chroma from "chroma-js"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"

interface ColorFormatInputsProps {
  color: string
  onChange: (color: string) => void
}

export default function ColorFormatInputs({ color, onChange }: ColorFormatInputsProps) {
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 })
  const [hsl, setHsl] = useState({ h: 0, s: 0, l: 0 })

  // Update RGB and HSL values when color changes
  useEffect(() => {
    try {
      const chromaColor = chroma(color)
      const [r, g, b] = chromaColor.rgb()
      const [h, s, l] = chromaColor.hsl()

      setRgb({ r, g: g, b: b })
      setHsl({
        h: isNaN(h) ? 0 : Math.round(h),
        s: isNaN(s) ? 0 : Math.round(s * 100),
        l: isNaN(l) ? 0 : Math.round(l * 100),
      })
    } catch (e) {
      // Invalid color
    }
  }, [color])

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    if (/^#[0-9A-F]{6}$/i.test(newColor)) {
      onChange(newColor)
    } else if (/^#[0-9A-F]{3}$/i.test(newColor)) {
      // Convert 3-digit hex to 6-digit
      const expanded = newColor.replace(/^#(.)(.)(.)/i, "#$1$1$2$2$3$3")
      onChange(expanded)
    } else if (/^[0-9A-F]{6}$/i.test(newColor)) {
      onChange(`#${newColor}`)
    } else if (newColor.startsWith("#") && newColor.length <= 7) {
      // Allow partial input
      e.target.value = newColor
    }
  }

  const handleRgbChange = (channel: "r" | "g" | "b", value: number) => {
    const newRgb = { ...rgb, [channel]: value }
    setRgb(newRgb)
    try {
      const newColor = chroma(newRgb.r, newRgb.g, newRgb.b).hex()
      onChange(newColor)
    } catch (e) {
      // Invalid color
    }
  }

  const handleHslChange = (channel: "h" | "s" | "l", value: number) => {
    const newHsl = { ...hsl, [channel]: value }
    setHsl(newHsl)
    try {
      const newColor = chroma.hsl(newHsl.h, newHsl.s / 100, newHsl.l / 100).hex()
      onChange(newColor)
    } catch (e) {
      // Invalid color
    }
  }

  return (
    <Tabs defaultValue="hex" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="hex">HEX</TabsTrigger>
        <TabsTrigger value="rgb">RGB</TabsTrigger>
        <TabsTrigger value="hsl">HSL</TabsTrigger>
      </TabsList>

      <TabsContent value="hex" className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="hex-input">Hex Color</Label>
          <Input id="hex-input" value={color} onChange={handleHexChange} className="font-mono" placeholder="#000000" />
        </div>
      </TabsContent>

      <TabsContent value="rgb" className="space-y-4 py-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="r-slider">Red (R): {rgb.r}</Label>
            </div>
            <Slider
              id="r-slider"
              min={0}
              max={255}
              step={1}
              value={[rgb.r]}
              onValueChange={(value: number[]) => handleRgbChange("r", value[0])}
              className="[&>.sliderTrack]:bg-red-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="g-slider">Green (G): {rgb.g}</Label>
            </div>
            <Slider
              id="g-slider"
              min={0}
              max={255}
              step={1}
              value={[rgb.g]}
              onValueChange={(value: number[]) => handleRgbChange("g", value[0])}
              className="[&>.sliderTrack]:bg-green-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="b-slider">Blue (B): {rgb.b}</Label>
            </div>
            <Slider
              id="b-slider"
              min={0}
              max={255}
              step={1}
              value={[rgb.b]}
              onValueChange={(value: number[]) => handleRgbChange("b", value[0])}
              className="[&>.sliderTrack]:bg-blue-500"
            />
          </div>

          <div className="pt-2">
            <p className="font-mono text-sm">
              rgb({rgb.r}, {rgb.g}, {rgb.b})
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="hsl" className="space-y-4 py-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="h-slider">Hue (H): {hsl.h}°</Label>
            </div>
            <Slider
              id="h-slider"
              min={0}
              max={360}
              step={1}
              value={[hsl.h]}
              onValueChange={(value: number[]) => handleHslChange("h", value[0])}
              className="[&>.sliderTrack]:bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="s-slider">Saturation (S): {hsl.s}%</Label>
            </div>
            <Slider
              id="s-slider"
              min={0}
              max={100}
              step={1}
              value={[hsl.s]}
              onValueChange={(value: number[]) => handleHslChange("s", value[0])}
              className="[&>.sliderTrack]:bg-gradient-to-r from-gray-400 to-red-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="l-slider">Lightness (L): {hsl.l}%</Label>
            </div>
            <Slider
              id="l-slider"
              min={0}
              max={100}
              step={1}
              value={[hsl.l]}
              onValueChange={(value: number[]) => handleHslChange("l", value[0])}
              className="[&>.sliderTrack]:bg-gradient-to-r from-black via-gray-500 to-white"
            />
          </div>

          <div className="pt-2">
            <p className="font-mono text-sm">
              hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
            </p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
