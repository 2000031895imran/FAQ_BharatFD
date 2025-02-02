import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FAQEditor } from '../components/FAQEditor';

describe('FAQEditor', () => {
  it('renders with initial data', () => {
    const initialData = {
      id: '1',
      question: 'Test Question',
      answer: 'Test Answer',
      translations: {},
      created_at: '',
      updated_at: '',
    };

    render(
      <FAQEditor
        initialData={initialData}
        onSubmit={async () => {}}
        isLoading={false}
      />
    );

    expect(screen.getByDisplayValue('Test Question')).toBeInTheDocument();
  });

  it('calls onSubmit with form data', async () => {
    const onSubmit = vi.fn();
    
    render(
      <FAQEditor
        onSubmit={onSubmit}
        isLoading={false}
      />
    );

    const questionInput = screen.getByLabelText('Question');
    fireEvent.change(questionInput, { target: { value: 'New Question' } });

    const submitButton = screen.getByText('Save FAQ');
    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      question: 'New Question',
    }));
  });
});