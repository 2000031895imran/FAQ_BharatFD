import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FAQ, FAQFormData } from '../types/faq';
import { Save } from 'lucide-react';

interface FAQEditorProps {
  initialData?: FAQ;
  onSubmit: (data: FAQFormData) => Promise<void>;
  isLoading: boolean;
}

export function FAQEditor({ initialData, onSubmit, isLoading }: FAQEditorProps) {
  const [formData, setFormData] = React.useState<FAQFormData>({
    question: initialData?.question || '',
    answer: initialData?.answer || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="question" className="block text-sm font-medium text-gray-700">
          Question
        </label>
        <input
          type="text"
          id="question"
          value={formData.question}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
          Answer
        </label>
        <ReactQuill
          value={formData.answer}
          onChange={(value) => setFormData({ ...formData, answer: value })}
          className="h-64 bg-white"
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'],
              ['clean'],
            ],
          }}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Save className="w-4 h-4 mr-2" />
        {isLoading ? 'Saving...' : 'Save FAQ'}
      </button>
    </form>
  );
}