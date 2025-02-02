import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Language } from './types/faq';
import { FAQList } from './components/FAQList';
import { FAQEditor } from './components/FAQEditor';
import { Globe, Plus } from 'lucide-react';

const queryClient = new QueryClient();

function App() {
  const [language, setLanguage] = React.useState<Language>('en');
  
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <Link to="/" className="flex items-center px-2 py-2 text-gray-900">
                    FAQ Management System
                  </Link>
                </div>
                <div className="flex items-center">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="ml-4 rounded-md border-gray-300"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="bn">Bengali</option>
                  </select>
                  <Link
                    to="/new"
                    className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New FAQ
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="px-4 py-6 sm:px-0">
                    <FAQList
                      faqs={[]} // TODO: Fetch FAQs from Supabase
                      language={language}
                      onEdit={() => {}}
                      onDelete={async () => {}}
                    />
                  </div>
                }
              />
              <Route
                path="/new"
                element={
                  <div className="px-4 py-6 sm:px-0">
                    <FAQEditor
                      onSubmit={async () => {}}
                      isLoading={false}
                    />
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;