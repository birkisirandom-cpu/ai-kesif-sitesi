// src/components/QuickViewModal.tsx
import Image from 'next/image';

type Tool = {
  name: string;
  description: string | null;
  image_url: string | null;
  website_url: string | null;
};

type ModalProps = {
  tool: Tool;
  onClose: () => void;
};

export default function QuickViewModal({ tool, onClose }: ModalProps) {
  return (
    // Arka planı karartan overlay
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose} // Dışarıya tıklayınca kapat
    >
      {/* Modal içeriği - Dışarıya tıklanmasını engellemek için e.stopPropagation() */}
      <div 
        className="bg-white rounded-xl p-6 md:p-8 w-11/12 md:w-2/3 lg:w-1/2 max-w-4xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Kapatma Butonu */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        
        <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
                 <Image
                    src={tool.image_url || 'https://placehold.co/400x300/gray/white?text=Resim+Yok'}
                    alt={`${tool.name} logosu`}
                    width={400}
                    height={300}
                    className="rounded-lg object-cover"
                />
            </div>
            <div className="md:w-2/3">
                <h2 className="text-3xl font-bold mb-2">{tool.name}</h2>
                <p className="text-gray-700 mb-6">{tool.description}</p>
                <a
                  href={tool.website_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Siteyi Ziyaret Et
                </a>
            </div>
        </div>
      </div>
    </div>
  );
}