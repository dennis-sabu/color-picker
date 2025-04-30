"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PredefinedPalettesProps {
  onSelectColor: (color: string) => void
}

export default function PredefinedPalettes({ onSelectColor }: PredefinedPalettesProps) {
  const materialPalette = [
    // Reds
    ["#FFEBEE", "#FFCDD2", "#EF9A9A", "#E57373", "#EF5350", "#F44336", "#E53935", "#D32F2F", "#C62828", "#B71C1C"],
    // Pinks
    ["#FCE4EC", "#F8BBD0", "#F48FB1", "#F06292", "#EC407A", "#E91E63", "#D81B60", "#C2185B", "#AD1457", "#880E4F"],
    // Purples
    ["#F3E5F5", "#E1BEE7", "#CE93D8", "#BA68C8", "#AB47BC", "#9C27B0", "#8E24AA", "#7B1FA2", "#6A1B9A", "#4A148C"],
    // Deep Purples
    ["#EDE7F6", "#D1C4E9", "#B39DDB", "#9575CD", "#7E57C2", "#673AB7", "#5E35B1", "#512DA8", "#4527A0", "#311B92"],
    // Indigos
    ["#E8EAF6", "#C5CAE9", "#9FA8DA", "#7986CB", "#5C6BC0", "#3F51B5", "#3949AB", "#303F9F", "#283593", "#1A237E"],
    // Blues
    ["#E3F2FD", "#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2", "#1565C0", "#0D47A1"],
    // Light Blues
    ["#E1F5FE", "#B3E5FC", "#81D4FA", "#4FC3F7", "#29B6F6", "#03A9F4", "#039BE5", "#0288D1", "#0277BD", "#01579B"],
    // Cyans
    ["#E0F7FA", "#B2EBF2", "#80DEEA", "#4DD0E1", "#26C6DA", "#00BCD4", "#00ACC1", "#0097A7", "#00838F", "#006064"],
    // Teals
    ["#E0F2F1", "#B2DFDB", "#80CBC4", "#4DB6AC", "#26A69A", "#009688", "#00897B", "#00796B", "#00695C", "#004D40"],
    // Greens
    ["#E8F5E9", "#C8E6C9", "#A5D6A7", "#81C784", "#66BB6A", "#4CAF50", "#43A047", "#388E3C", "#2E7D32", "#1B5E20"],
  ]

  const flatUIPalette = [
    "#1ABC9C",
    "#16A085",
    "#2ECC71",
    "#27AE60",
    "#3498DB",
    "#2980B9",
    "#9B59B6",
    "#8E44AD",
    "#34495E",
    "#2C3E50",
    "#F1C40F",
    "#F39C12",
    "#E67E22",
    "#D35400",
    "#E74C3C",
    "#C0392B",
    "#ECF0F1",
    "#BDC3C7",
    "#95A5A6",
    "#7F8C8D",
  ]

  const pastelPalette = [
    "#FADBD8",
    "#F5B7B1",
    "#F1948A",
    "#D7BDE2",
    "#BB8FCE",
    "#A569BD",
    "#D5F5E3",
    "#ABEBC6",
    "#82E0AA",
    "#D4E6F1",
    "#A9CCE3",
    "#7FB3D5",
    "#FAD7A0",
    "#F8C471",
    "#F5B041",
    "#E8DAEF",
    "#D2B4DE",
    "#A9DFBF",
    "#7DCEA0",
    "#F9E79F",
  ]

  const neonPalette = [
    "#39FF14",
    "#FF10F0",
    "#FFF01F",
    "#3B27BA",
    "#FF3131",
    "#0FF0FC",
    "#FB33DB",
    "#7CFC00",
    "#FF00FF",
    "#00FFFF",
    "#FF1493",
    "#CCFF00",
    "#FF4500",
    "#00FF00",
    "#FF00BF",
    "#00FFFF",
    "#FF3800",
    "#7DF9FF",
    "#FF5E00",
    "#FFFF33",
  ]

  return (
    <Tabs defaultValue="material" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="material">Material</TabsTrigger>
        <TabsTrigger value="flat">Flat UI</TabsTrigger>
        <TabsTrigger value="pastel">Pastel</TabsTrigger>
        <TabsTrigger value="neon">Neon</TabsTrigger>
      </TabsList>

      <TabsContent value="material" className="pt-4">
        <div className="space-y-4">
          {materialPalette.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-10 gap-1">
              {row.map((color, colIndex) => (
                <button
                  key={colIndex}
                  className="w-full aspect-square rounded-md shadow-sm hover:shadow-md transition-shadow"
                  style={{ backgroundColor: color }}
                  onClick={() => onSelectColor(color)}
                  title={color}
                />
              ))}
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="flat" className="pt-4">
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {flatUIPalette.map((color, index) => (
            <button
              key={index}
              className="w-full aspect-square rounded-md shadow-sm hover:shadow-md transition-shadow"
              style={{ backgroundColor: color }}
              onClick={() => onSelectColor(color)}
              title={color}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="pastel" className="pt-4">
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {pastelPalette.map((color, index) => (
            <button
              key={index}
              className="w-full aspect-square rounded-md shadow-sm hover:shadow-md transition-shadow"
              style={{ backgroundColor: color }}
              onClick={() => onSelectColor(color)}
              title={color}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="neon" className="pt-4">
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {neonPalette.map((color, index) => (
            <button
              key={index}
              className="w-full aspect-square rounded-md shadow-sm hover:shadow-md transition-shadow"
              style={{ backgroundColor: color }}
              onClick={() => onSelectColor(color)}
              title={color}
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
