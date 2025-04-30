"use client"

import { useState, useEffect } from "react"
import chroma from "chroma-js"
import { Copy, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface GradientGeneratorProps {
  baseColor: string
}

interface GradientStop {
  color: string
  position: number
}

export default function GradientGenerator({ baseColor }: GradientGeneratorProps) {
  const [gradientType, setGradientType] = useState<"linear" | "radial">("linear")
  const [angle, setAngle] = useState(90)
  const [stops, setStops] = useState<GradientStop[]>([
    { color: baseColor, position: 0 },
    { color: "#ffffff", position: 100 },
  ])
  const [gradientPreview, setGradientPreview] = useState("")
  const [gradientCSS, setGradientCSS] = useState("")
  const { toast } = useToast()

  // Update first stop when baseColor changes
  useEffect(() => {
    setStops((prev) => [{ ...prev[0], color: baseColor }, ...prev.slice(1)])
  }, [baseColor])

  // Generate gradient preview and CSS
  useEffect(() => {
    const sortedStops = [...stops].sort((a, b) => a.position - b.position)

    let gradient = ""
    let css = ""

    if (gradientType === "linear") {
      gradient = `linear-gradient(${angle}deg, ${sortedStops
        .map((stop) => `${stop.color} ${stop.position}%`)
        .join(", ")})`

      css = `background: ${gradient};`
    } else {
      gradient = `radial-gradient(circle, ${sortedStops.map((stop) => `${stop.color} ${stop.position}%`).join(", ")})`

      css = `background: ${gradient};`
    }

    setGradientPreview(gradient)
    setGradientCSS(css)
  }, [stops, angle, gradientType])

  const addStop = () => {
    if (stops.length >= 5) {
      toast({
        title: "Maximum stops reached",
        description: "You can have a maximum of 5 gradient stops",
      })
      return
    }

    // Find middle position between existing stops
    const positions = stops.map((stop) => stop.position)
    const min = Math.min(...positions)
    const max = Math.max(...positions)
    const middle = min + (max - min) / 2

    // Generate a color between the two closest stops
    const sortedStops = [...stops].sort((a, b) => a.position - b.position)
    const closestIndex = sortedStops.findIndex((stop) => stop.position > middle) - 1
    const startColor = sortedStops[closestIndex]?.color || sortedStops[0].color
    const endColor = sortedStops[closestIndex + 1]?.color || sortedStops[sortedStops.length - 1].color

    const middleColor = chroma.mix(startColor, endColor, 0.5, "rgb").hex()

    setStops([...stops, { color: middleColor, position: Math.round(middle) }])
  }

  const removeStop = (index: number) => {
    if (stops.length <= 2) {
      toast({
        title: "Minimum stops required",
        description: "You need at least 2 gradient stops",
      })
      return
    }

    setStops(stops.filter((_, i) => i !== index))
  }

  const updateStop = (index: number, field: "color" | "position", value: string | number) => {
    setStops(stops.map((stop, i) => (i === index ? { ...stop, [field]: value } : stop)))
  }

  const copyCSS = () => {
    navigator.clipboard.writeText(gradientCSS)
    toast({
      title: "Copied to clipboard",
      description: gradientCSS,
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="linear" onValueChange={(value) => setGradientType(value as "linear" | "radial")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="linear">Linear Gradient</TabsTrigger>
          <TabsTrigger value="radial">Radial Gradient</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="w-full h-32 rounded-lg shadow-md" style={{ background: gradientPreview }} />

      <div className="flex items-center justify-between">
        <div className="font-mono text-sm overflow-x-auto max-w-[80%] p-2 bg-gray-100 dark:bg-gray-900 rounded">
          {gradientCSS}
        </div>
        <Button variant="outline" size="sm" onClick={copyCSS}>
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      {gradientType === "linear" && (
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="angle-slider">Angle: {angle}°</Label>
          </div>
          <Slider
            id="angle-slider"
            min={0}
            max={360}
            step={1}
            value={[angle]}
            onValueChange={(value) => setAngle(value[0])}
          />
        </div>
      )}

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Color Stops</h3>
          <Button variant="outline" size="sm" onClick={addStop}>
            <Plus className="h-4 w-4 mr-1" />
            Add Stop
          </Button>
        </div>

        {stops.map((stop, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md shadow-sm" style={{ backgroundColor: stop.color }} />

            <div className="flex-1 space-y-1">
              <Input
                type="text"
                value={stop.color}
                onChange={(e) => updateStop(index, "color", e.target.value)}
                className="font-mono"
              />

              <div className="flex items-center gap-2">
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[stop.position]}
                  onValueChange={(value) => updateStop(index, "position", value[0])}
                />
                <span className="text-sm w-8">{stop.position}%</span>
              </div>
            </div>

            {stops.length > 2 && (
              <Button variant="ghost" size="sm" onClick={() => removeStop(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
