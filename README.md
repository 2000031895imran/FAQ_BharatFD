# FAQ Management System

A modern, multilingual FAQ management system built with React, TypeScript, and Supabase.

## Features

- ✨ Rich text editor for FAQ content
- 🌐 Multi-language support (English, Hindi, Bengali)
- 🚀 Automatic translation using Google Translate API
- 💾 Efficient caching with Supabase
- 🔒 Secure authentication and authorization
- 📱 Responsive admin interface
- ✅ Comprehensive test coverage

## Tech Stack

- React with TypeScript
- Supabase for database and authentication
- React Query for data fetching
- React Quill for rich text editing
- Tailwind CSS for styling
- Vitest for testing

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Database Schema

The system uses a single `faqs` table with the following structure:

- `id`: UUID (Primary Key)
- `question`: Text
- `answer`: Text (Rich Text)
- `translations`: JSONB (Stores translations for different languages)
- `created_at`: Timestamp
- `updated_at`: Timestamp

## Testing

Run the test suite:

```bash
npm run test
```

## API Documentation

### Endpoints

- `GET /api/faqs`: Get all FAQs
  - Query params:
    - `lang`: Language code (en, hi, bn)

- `POST /api/faqs`: Create a new FAQ
  - Body:
    ```json
    {
      "question": "string",
      "answer": "string"
    }
    ```

- `PUT /api/faqs/:id`: Update an FAQ
  - Body: Same as POST

- `DELETE /api/faqs/:id`: Delete an FAQ

## Security

- Row Level Security (RLS) enabled
- Authentication required for all write operations
- XSS protection in rich text editor

## Performance

- Automatic caching with Supabase
- Optimized translations storage
- Efficient React Query caching

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT# FAQ_BharatFD|

THE OUT PUTS OF THE ABOVE PROJECT 

![Screenshot (435)](https://github.com/user-attachments/assets/2f5be573-ab57-4164-a4b7-f8d2843a9af5)

![Screenshot (436)](https://github.com/user-attachments/assets/a612b501-360f-4df5-a4dd-1cfdf0181b33)

![Screenshot (437)](https://github.com/user-attachments/assets/7d14ae12-0d85-4c1c-ae44-40ece359fb16)


