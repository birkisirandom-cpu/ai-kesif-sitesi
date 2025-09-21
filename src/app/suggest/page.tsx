// src/app/suggest/page.tsx
"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function SuggestPage() {
  const [toolName, setToolName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    // `suggestions` tablosuna yeni bir satır ekliyoruz.
    // Henüz bu tabloyu oluşturmadık, bir sonraki adımda oluşturacağız.
    const { error } = await supabase
      .from('suggestions')
      .insert([
        { 
          name: toolName, 
          website_url: websiteUrl, 
          description: description 
        }
      ]);

    if (error) {
      setMessage(`Bir hata oluştu: ${error.message}`);
    } else {
      setMessage('Öneriniz için teşekkürler! İncelenmek üzere gönderildi.');
      // Formu temizle
      setToolName('');
      setWebsiteUrl('');
      setDescription('');
    }
    setIsSubmitting(false);
  };

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Yeni Araç Öner</h1>
        <p className="text-center text-gray-600 mb-8">
          Listede olmayan bir AI aracı keşfettiyseniz, bizimle paylaşın!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="toolName" className="block text-lg font-medium text-gray-700">Araç Adı</label>
            <input
              id="toolName"
              type="text"
              value={toolName}
              onChange={(e) => setToolName(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="websiteUrl" className="block text-lg font-medium text-gray-700">Website Adresi</label>
            <input
              id="websiteUrl"
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-lg font-medium text-gray-700">Açıklama</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
            >
              {isSubmitting ? 'Gönderiliyor...' : 'Öneriyi Gönder'}
            </button>
          </div>
        </form>
        
        {message && <p className="mt-6 text-center text-lg">{message}</p>}
      </div>
    </main>
  );
}