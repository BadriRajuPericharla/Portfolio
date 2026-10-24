import { createClient } from '@supabase/supabase-js';

// Read from Vite environment variables or localStorage config
export const getSupabaseConfig = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (envUrl && envKey) {
    return { url: envUrl, key: envKey };
  }

  try {
    const saved = localStorage.getItem('badri_supabase_config');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // fallback
  }

  return { url: '', key: '' };
};

export const saveSupabaseConfig = (url, key) => {
  localStorage.setItem('badri_supabase_config', JSON.stringify({ url, key }));
};

let clientInstance = null;
let currentConfigKey = '';

export const getSupabaseClient = () => {
  const config = getSupabaseConfig();
  if (!config.url || !config.key) {
    return null;
  }

  const keyString = `${config.url}_${config.key}`;
  if (clientInstance && currentConfigKey === keyString) {
    return clientInstance;
  }

  try {
    clientInstance = createClient(config.url, config.key);
    currentConfigKey = keyString;
    return clientInstance;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
};
