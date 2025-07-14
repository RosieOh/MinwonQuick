import { supabase } from './supabaseClient';

// Mock 모드 체크
const isMockMode = !process.env.NEXT_PUBLIC_SUPABASE_URL;

// Mock 모드용 로컬 스토리지 키
const MOCK_FAVORITES_KEY = 'minwonquick_favorites';

export async function addFavorite(userId: string, officeId: number) {
  if (isMockMode) {
    const favorites = JSON.parse(localStorage.getItem(MOCK_FAVORITES_KEY) || '[]');
    if (!favorites.some((fav: any) => fav.userId === userId && fav.officeId === officeId)) {
      favorites.push({ userId, officeId, createdAt: new Date().toISOString() });
      localStorage.setItem(MOCK_FAVORITES_KEY, JSON.stringify(favorites));
    }
    return { data: null, error: null };
  }
  return supabase.from("favorites").insert({ user_id: userId, office_id: officeId });
}

export async function removeFavorite(userId: string, officeId: number) {
  if (isMockMode) {
    const favorites = JSON.parse(localStorage.getItem(MOCK_FAVORITES_KEY) || '[]');
    const filtered = favorites.filter((fav: any) => !(fav.userId === userId && fav.officeId === officeId));
    localStorage.setItem(MOCK_FAVORITES_KEY, JSON.stringify(filtered));
    return { data: null, error: null };
  }
  return supabase.from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("office_id", officeId);
}

export async function isFavorite(userId: string, officeId: number) {
  if (isMockMode) {
    const favorites = JSON.parse(localStorage.getItem(MOCK_FAVORITES_KEY) || '[]');
    return favorites.some((fav: any) => fav.userId === userId && fav.officeId === officeId);
  }
  const { data } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", userId)
    .eq("office_id", officeId)
    .maybeSingle();
  return !!data;
} 