// src/app/HomePageClient.tsx (Arama çubuğu eklenmiş hali)
"use client";

import { useState, useMemo } from 'react'; // useMemo'yu import ediyoruz
import ToolCard from "@/components/ToolCard";
import QuickViewModal from "@/components/QuickViewModal";
import type { Tool, Category } from './page';

type HomePageClientProps = {
  tools: Tool[];
  categories: Category[];
};

export default function HomePageClient({ tools, categories }: HomePageClientProps) {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState(''); // Arama metni için yeni state

  // Filtrelenmiş araçları hesaplamak için useMemo kullanıyoruz.
  // Bu, her tuşa basıldığında listeyi yeniden hesaplamak yerine,
  // sadece bağımlılıklar (searchQuery, activeCategory, tools) değiştiğinde hesaplama yapar.
  const filteredTools = useMemo(() => {
    let tempTools = tools;

    // 1. Kategoriye göre filtrele
    if (activeCategory) {
      tempTools = tempTools.filter(tool => tool.category_id === activeCategory);
    }

    // 2. Arama metnine göre filtrele
    if (searchQuery.trim() !== '') {
      tempTools = tempTools.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return tempTools;
  }, [tools, activeCategory, searchQuery]);

  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-4 text-center">AI Keşif Araçları</h1>
      <p className="text-center text-gray-600 mb-8">İhtiyacınız olan yapay zeka aracını keşfedin.</p>
      
      {/* Arama Çubuğu */}
      <div className="mb-8 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Araç adıyla ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Kategori Filtre Butonları */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button 
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-full font-semibold transition-colors ${!activeCategory ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Tümü
        </button>
        {categories.map(category => (
          <button 
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${activeCategory === category.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTools.map((tool) => (
          <ToolCard 
            key={tool.id} 
            tool={tool} 
            onPreviewClick={() => setSelectedTool(tool)}
          />
        ))}
      </div>

      {filteredTools.length === 0 && (
        <p className="text-center text-gray-500 mt-8 text-xl">Aradığınız kriterlere uygun araç bulunamadı.</p>
      )}

      {selectedTool && (
        <QuickViewModal 
          tool={selectedTool} 
          onClose={() => setSelectedTool(null)}
        />
      )}
    </main>
  );
}