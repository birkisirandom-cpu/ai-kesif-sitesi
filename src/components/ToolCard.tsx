// src/components/ToolCard.tsx (Yeni Hover Efektli Hali)
import Image from 'next/image';

type Tool = {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  website_url: string | null;
}

type ToolCardProps = {
  tool: Tool;
  onPreviewClick: () => void;
}

export default function ToolCard({ tool, onPreviewClick }: ToolCardProps) {
  return (
    // 'group' class'ı, iç elementlerin bu kartın hover durumunu algılamasını sağlar.
    // 'transition-all' ve 'duration-300' efektlerin yumuşak olmasını sağlar.
    <div className="group border rounded-lg shadow-md flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="relative w-full h-48 bg-gray-200">
        <Image
          src={tool.image_url || 'https://placehold.co/400x300/gray/white?text=Resim+Yok'}
          alt={`${tool.name} logosu`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold">{tool.name}</h3>
        <p className="mt-2 text-gray-600 flex-grow line-clamp-3">
          {tool.description}
        </p>
        
        {/* Butonları bir arada tutan konteyner */}
        <div className="mt-4 flex items-center gap-x-3">
          <a
            href={tool.website_url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white text-center font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Siteye Git
          </a>
          <button
            onClick={onPreviewClick}
            // Başlangıçta görünmez (opacity-0) ve fare üzerine gelince görünür olur (group-hover:opacity-100).
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300"
          >
            Hızlı Bakış
          </button>
        </div>
      </div>
    </div>
  )
}