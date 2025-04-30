"use client"

import { useState, useEffect } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ColorHistoryProps {
  onSelectColor: (color: string) => void
}

export default function ColorHistory({ onSelectColor }: ColorHistoryProps) {
  const [history, setHistory] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const savedHistory = localStorage.getItem("colorHistory")
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }

    const savedFavorites = localStorage.getItem("colorFavorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem("colorHistory")
  }

  const removeFromFavorites = (color: string) => {
    const newFavorites = favorites.filter((c) => c !== color)
    setFavorites(newFavorites)
    localStorage.setItem("colorFavorites", JSON.stringify(newFavorites))
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">Favorites</h3>
        </div>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-8 gap-2">
            {favorites.map((color, index) => (
              <div key={index} className="relative group">
                <button
                  className="w-full aspect-square rounded-md shadow-sm hover:shadow-md transition-shadow"
                  style={{ backgroundColor: color }}
                  onClick={() => onSelectColor(color)}
                  title={color}
                />
                <button
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFromFavorites(color)}
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
          <div className="grid grid-cols-8 gap-2">
            {history.map((color, index) => (
              <button
                key={index}
                className="w-full aspect-square rounded-md shadow-sm hover:shadow-md transition-shadow"
                style={{ backgroundColor: color }}
                onClick={() => onSelectColor(color)}
                title={color}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm">No color history yet.</p>
        )}
      </div>
    </div>
  )
}
