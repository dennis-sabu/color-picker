import ColorPicker from "@/components/color-picker"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2 text-center">
          Modern Color Picker
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          Select, customize, and export colors in multiple formats
        </p>
        <ColorPicker />
      </div>
    </main>
  )
}
