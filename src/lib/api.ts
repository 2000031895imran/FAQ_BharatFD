import { supabase } from './supabase';
import { FAQ, FAQFormData, Language } from '../types/faq';
import axios from 'axios';

const GOOGLE_TRANSLATE_API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;

export async function translateText(text: string, targetLang: Language): Promise<string> {
  if (!GOOGLE_TRANSLATE_API_KEY) {
    console.warn('Google Translate API key not found, returning original text');
    return text;
  }

  try {
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
      {
        q: text,
        target: targetLang,
        source: 'en',
      }
    );

    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation failed:', error);
    return text;
  }
}

export async function createFAQ(data: FAQFormData): Promise<FAQ> {
  // Generate translations
  const translations = {
    hi: {
      question: await translateText(data.question, 'hi'),
      answer: await translateText(data.answer, 'hi'),
    },
    bn: {
      question: await translateText(data.question, 'bn'),
      answer: await translateText(data.answer, 'bn'),
    },
  };

  const { data: faq, error } = await supabase
    .from('faqs')
    .insert([
      {
        question: data.question,
        answer: data.answer,
        translations,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return faq;
}

export async function updateFAQ(id: string, data: FAQFormData): Promise<FAQ> {
  const translations = {
    hi: {
      question: await translateText(data.question, 'hi'),
      answer: await translateText(data.answer, 'hi'),
    },
    bn: {
      question: await translateText(data.question, 'bn'),
      answer: await translateText(data.answer, 'bn'),
    },
  };

  const { data: faq, error } = await supabase
    .from('faqs')
    .update({
      question: data.question,
      answer: data.answer,
      translations,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return faq;
}

export async function deleteFAQ(id: string): Promise<void> {
  const { error } = await supabase
    .from('faqs')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function getFAQs(): Promise<FAQ[]> {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}