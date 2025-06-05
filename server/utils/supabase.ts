// server/utils/supabase.ts
import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

// Принудительно загружаем переменные окружения
dotenv.config();

// Явно получаем переменные из process.env
const supabaseUrl = process.env.NUXT_SUPABASE_URL;
const supabaseKey = process.env.NUXT_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('ОШИБКА: NUXT_SUPABASE_URL и NUXT_SUPABASE_KEY должны быть указаны в .env файле');
    console.error('Текущие значения:', { supabaseUrl, supabaseKey });
}

export const getSupabaseClient = () => {
    return createClient(supabaseUrl!, supabaseKey!);
};