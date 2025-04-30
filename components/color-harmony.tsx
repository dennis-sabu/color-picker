"use client"

import { useEffect, useState } from "react"
import chroma from "chroma-js"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface ColorHarmonyProps {
  baseColor: string
  onSelectColor: (color: string) => void
}

export default function ColorHarmony({ baseColor, onSelectColor }: ColorHarmonyProps) {
  const [harmonies, setHarmonies] = useState({
    complementary: ["#000000", "#000000", "#000000", "#000000"],
    analogous: ["#000000", "#000000", "#000000", "#000000"],
    triadic: ["#000000", "#000000", "#000000", "#000000"],
    tetradic: ["#000000", "#000000", "#000000", "#000000"],
    monochromatic: ["#000000", "#000000", "#000000", "#000000"],
  })
  const { toast } = useToast()

  useEffect(() => {
    try {
      // Generate color harmonies
      const color = chroma(baseColor)
      const hsl = color.hsl()
      const h = hsl[0] || 0 // Default to 0 if NaN

      // Complementary (opposite on the color wheel)
      const complementary = [
        color.hex(),
        chroma.hsl((h + 180) % 360, hsl[1], hsl[2]).hex(),
        chroma.hsl((h + 180) % 360, Math.max(0.2, hsl[1] - 0.3), Math.min(0.9, hsl[2] + 0.2)).hex(),
        chroma.hsl((h + 180) % 360, Math.min(1, hsl[1] + 0.1), Math.max(0.2, hsl[2] - 0.2)).hex(),
      ]

      // Analogous (adjacent on the color wheel)
      const analogous = [
        color.hex(),
        chroma.hsl((h + 30) % 360, hsl[1], hsl[2]).hex(),
        chroma.hsl((h - 30) % 360, hsl[1], hsl[2]).hex(),
        chroma.hsl((h + 60) % 360, hsl[1], hsl[2]).hex(),
      ]

      // Triadic (three colors equidistant on the color wheel)
      const triadic = [
        color.hex(),
        chroma.hsl((h + 120) % 360, hsl[1], hsl[2]).hex(),
        chroma.hsl((h + 240) % 360, hsl[1], hsl[2]).hex(),
        chroma.hsl((h + 180) % 360, hsl[1], hsl[2]).hex(),
      ]

      // Tetradic (four colors equidistant on the color wheel)
      const tetradic = [
        color.hex(),
        chroma.hsl((h + 90) % 360, hsl[1], hsl[2]).hex(),
        chroma.hsl((h + 180) % 360, hsl[1], hsl[2]).hex(),
        chroma.hsl((h + 270) % 360, hsl[1], hsl[2]).hex(),
      ]

      // Monochromatic (different shades and tints of the same hue)
      const monochromatic = [
        color.hex(),
        chroma.hsl(h, Math.max(0, hsl[1] - 0.3), Math.min(0.9, hsl[2] + 0.2)).hex(),
        chroma.hsl(h, Math.min(1, hsl[1] + 0.1), Math.max(0.3, hsl[2] - 0.25)).hex(),
        chroma.hsl(h, Math.min(1, hsl[1] + 0.2), Math.max(0.15, hsl[2] - 0.4)).hex(),
      ]

      setHarmonies({
        complementary,
        analogous,
        triadic,
        tetradic,
        monochromatic,
      })
    } catch (e) {
      console.error("Error generating color harmonies:", e)
    }
  }, [baseColor])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: text,
    })
  }

  const copyPalette = (colors: string[]) => {
    navigator.clipboard.writeText(colors.join(", "))
    toast({
      title: "Palette copied to clipboard",
      description: "Color values copied as comma-separated list",
    })
  }

  const renderColorPalette = (colors: string[]) => (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-2">
        {colors.map((color, index) => (
          <div key={index} className="space-y-1">
            <button
              className="w-full aspect-square rounded-md shadow-sm hover:shadow-md transition-shadow"
              style={{ backgroundColor: color }}
              onClick={() => onSelectColor(color)}
              title={color}
            />
            <p className="text-xs font-mono text-center truncate">{color}</p>
          </div>
        ))}
        <div className="flex items-center justify-center">
          <Button variant="outline" size="sm" onClick={() => copyPalette(colors)}>
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="w-full h-12 rounded-md shadow-sm overflow-hidden flex">
        {colors.map((color, index) => (
          <div key={index} className="flex-1" style={{ backgroundColor: color }}></div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="bg-gray-100 dark:bg-gray-850 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Color Harmonies</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Select a harmony type to find matching colors that work well with your base color.
        </p>
      </div>

      <Tabs defaultValue="complementary" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="complementary">Complementary</TabsTrigger>
          <TabsTrigger value="analogous">Analogous</TabsTrigger>
          <TabsTrigger value="triadic">Triadic</TabsTrigger>
          <TabsTrigger value="tetradic">Tetradic</TabsTrigger>
          <TabsTrigger value="monochromatic">Monochromatic</TabsTrigger>
        </TabsList>

        <TabsContent value="complementary" className="pt-4">
          {renderColorPalette(harmonies.complementary)}
          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            Complementary colors are opposite on the color wheel and create high contrast combinations.
          </div>
        </TabsContent>

        <TabsContent value="analogous" className="pt-4">
          {renderColorPalette(harmonies.analogous)}
          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            Analogous colors are adjacent on the color wheel and create harmonious, low-contrast combinations.
          </div>
        </TabsContent>

        <TabsContent value="triadic" className="pt-4">
          {renderColorPalette(harmonies.triadic)}
          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            Triadic colors are evenly spaced around the color wheel and offer vibrant contrast while maintaining
            harmony.
          </div>
        </TabsContent>

        <TabsContent value="tetradic" className="pt-4">
          {renderColorPalette(harmonies.tetradic)}
          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            Tetradic colors use four colors evenly spaced on the color wheel for rich, balanced combinations.
          </div>
        </TabsContent>

        <TabsContent value="monochromatic" className="pt-4">
          {renderColorPalette(harmonies.monochromatic)}
          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            Monochromatic colors use different shades and tints of the same hue for a cohesive look.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
