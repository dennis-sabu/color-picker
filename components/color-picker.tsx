"use client"

import { useState, useEffect } from "react"
import { HexColorPicker } from "react-colorful"
import { Copy, Check, Save, Trash2, RefreshCw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import ColorFormatInputs from "./color-format-inputs"
import PredefinedPalettes from "./predefined-palettes"
import GradientGenerator from "./gradient-generator"
import ColorHarmony from "./color-harmony"

export default function ColorPicker() {
  const [color, setColor] = useState("#6366f1")
  const [copied, setCopied] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const { toast } = useToast()

  // Load saved favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("colorFavorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }

    const savedHistory = localStorage.getItem("colorHistory")
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  // Save favorites to localStorage when updated
  useEffect(() => {
    localStorage.setItem("colorFavorites", JSON.stringify(favorites))
  }, [favorites])

  // Save history to localStorage when updated
  useEffect(() => {
    localStorage.setItem("colorHistory", JSON.stringify(history))
  }, [history])

  // Update history when color changes
  useEffect(() => {
    if (color && !history.includes(color)) {
      setHistory((prev) => [color, ...prev.slice(0, 19)])
    }
  }, [color, history])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: text,
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const addToFavorites = () => {
    if (!favorites.includes(color)) {
      setFavorites((prev) => [color, ...prev])
      toast({
        title: "Added to favorites",
        description: color,
      })
    }
  }

  const removeFromFavorites = (colorToRemove: string) => {
    setFavorites((prev) => prev.filter((c) => c !== colorToRemove))
    toast({
      title: "Removed from favorites",
      description: colorToRemove,
    })
  }

  const clearHistory = () => {
    setHistory([])
    toast({
      title: "History cleared",
    })
  }

  const generateRandomColor = () => {
    const randomColor =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    setColor(randomColor)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Color Preview Column */}
        <div className="p-6 flex flex-col">
          <div
            className="w-full aspect-square rounded-lg shadow-md mb-4 flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            <div className="bg-white/90 dark:bg-black/70 px-4 py-2 rounded-md shadow-sm backdrop-blur-sm">
              <p className="font-mono text-sm">{color}</p>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <Button className="flex-1" onClick={() => copyToClipboard(color)} variant="outline">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              Copy
            </Button>
            <Button className="flex-1" onClick={addToFavorites} variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button className="flex-1" onClick={generateRandomColor} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Random
            </Button>
          </div>

          <div className="mb-6">
            <HexColorPicker color={color} onChange={setColor} className="w-full" />
          </div>

          <ColorFormatInputs color={color} onChange={setColor} />
        </div>

        {/* Tabs Column */}
        <div className="col-span-2 border-l dark:border-gray-700">
          <Tabs defaultValue="palettes" className="w-full">
            <TabsList className="w-full grid grid-cols-4 rounded-none">
              <TabsTrigger value="harmonies">Harmonies</TabsTrigger>
              <TabsTrigger value="palettes">Palettes</TabsTrigger>
              <TabsTrigger value="gradients">Gradients</TabsTrigger>
              <TabsTrigger value="saved">History & Favorites</TabsTrigger>
            </TabsList>

            <TabsContent value="harmonies" className="p-6">
              <ColorHarmony baseColor={color} onSelectColor={setColor} />
            </TabsContent>

            <TabsContent value="palettes" className="p-6">
              <PredefinedPalettes onSelectColor={setColor} />
            </TabsContent>

            <TabsContent value="gradients" className="p-6">
              <GradientGenerator baseColor={color} />
            </TabsContent>

            <TabsContent value="saved" className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium">Favorites</h3>
                  </div>
                  {favorites.length > 0 ? (
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                      {favorites.map((favColor, index) => (
                        <div key={index} className="relative group">
                          <button
                            className="w-full aspect-square rounded-md shadow-sm hover:shadow-md transition-shadow"
                            style={{ backgroundColor: favColor }}
                            onClick={() => setColor(favColor)}
                            title={favColor}
                          />
                          <button
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeFromFavorites(favColor)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">No favorites saved yet.</p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium">History</h3>
                    {history.length > 0 && (
                      <Button variant="ghost" size="sm" onClick={clearHistory}>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Clear
                      </Button>
                    )}
                  </div>
                  {history.length > 0 ? (
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                      {history.map((historyColor, index) => (
                        <button
                          key={index}
                          className="w-full aspect-square rounded-md shadow-sm hover:shadow-md transition-shadow"
                          style={{ backgroundColor: historyColor }}
                          onClick={() => setColor(historyColor)}
                          title={historyColor}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">No color history yet.</p>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
