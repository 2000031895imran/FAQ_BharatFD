import React from 'react';
import { FAQ, Language } from '../types/faq';
import { Edit2, Trash2 } from 'lucide-react';

interface FAQListProps {
  faqs: FAQ[];
  language: Language;
  onEdit: (faq: FAQ) => void;
  onDelete: (id: string) => Promise<void>;
}

export function FAQList({ faqs, language, onEdit, onDelete }: FAQListProps) {
  const getLocalizedContent = (faq: FAQ, field: 'question' | 'answer') => {
    if (language === 'en') return faq[field];
    return faq.translations[language]?.[field] || faq[field];
  };

  return (
    <div className="space-y-6">
      {faqs.map((faq) => (
        <div key={faq.id} className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-gray-900">
              {getLocalizedContent(faq, 'question')}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(faq)}
                className="text-gray-400 hover:text-gray-500"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(faq.id)}
                className="text-red-400 hover:text-red-500"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div
            className="mt-2 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: getLocalizedContent(faq, 'answer') }}
          />
        </div>
      ))}
    </div>
  );
}