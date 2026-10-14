'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

type CommentFormProps = {
  onSubmit: (data: { text: string; name?: string }) => void;
  initialText?: string;
  placeholder?: string;
  buttonLabel?: string;
  onCancel?: () => void;
  showNameInput?: boolean;
};

export function CommentForm({
  onSubmit,
  initialText = '',
  placeholder = "Join the discussion...",
  buttonLabel = "Comment",
  onCancel,
  showNameInput = false,
}: CommentFormProps) {
  const [text, setText] = useState(initialText);
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      if (showNameInput) {
        if (name.trim()) {
          onSubmit({ text: text.trim(), name: name.trim() });
          setText('');
          setName('');
        }
      } else {
        onSubmit({ text: text.trim() });
        setText('');
      }
      
      if (onCancel) {
        onCancel();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      {showNameInput && (
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full bg-transparent border-border/50 focus:bg-background/50 text-center"
        />
      )}
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-border/50 focus:bg-background/50"
        rows={3}
      />
      <div className="flex items-center gap-2 justify-end">
        {onCancel && <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>}
        <Button type="submit" disabled={!text.trim() || (showNameInput && !name.trim())}>{buttonLabel}</Button>
      </div>
    </form>
  );
}
