// src/app/page.tsx (Filtreleme için güncellenmiş hali)
import { supabase } from "@/lib/supabaseClient";
import HomePageClient from "./HomePageClient";

// Veri tiplerini tanımlayarak kodumuzu daha okunaklı hale getirelim
export type Tool = {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  website_url: string | null;
  category_id: number | null;
};

export type Category = {
  id: number;
  name: string;
};

export default async function Page() {
  // Promise.all ile iki veri çekme işlemini aynı anda başlatıyoruz
  const [toolsResponse, categoriesResponse] = await Promise.all([
    supabase.from('tools').select('*'),
    supabase.from('categories').select('*')
  ]);

  if (toolsResponse.error || categoriesResponse.error || !toolsResponse.data || !categoriesResponse.data) {
    console.error("Veri çekme hatası:", toolsResponse.error || categoriesResponse.error);
    return <p>Veriler yüklenemedi.</p>;
  }

  return <HomePageClient tools={toolsResponse.data} categories={categoriesResponse.data} />;
}