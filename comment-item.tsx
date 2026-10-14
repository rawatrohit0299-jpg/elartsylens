'use client';

import { useState } from 'react';
import { type Comment } from '@/lib/thoughts';
import { Button } from '@/components/ui/button';
import { CommentForm } from './comment-form';

interface CommentItemProps {
  comment: Comment;
  onAddReply: (commentId: string, text: string) => void;
}

export function CommentItem({ comment, onAddReply }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);

  const handleReplySubmit = ({ text }: { text: string }) => {
    onAddReply(comment.id, text);
    setIsReplying(false);
  };
  
  const handleToggleReply = () => {
    setIsReplying(prev => !prev);
  }

  return (
    <div className="w-full">
      <div className="flex-1 space-y-2">
        <p className="text-foreground/90">{comment.text}</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <Button variant="ghost" className="h-auto p-0 text-xs" onClick={handleToggleReply}>
            Reply
          </Button>
        </div>

        {isReplying && (
          <div className="pt-4">
            <CommentForm
              onSubmit={handleReplySubmit}
              placeholder="Write a reply..."
              buttonLabel="Reply"
              onCancel={() => setIsReplying(false)}
            />
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="pt-6 space-y-6 border-l-2 border-border/50 ml-4 pl-4 md:ml-6 md:pl-6">
            {comment.replies.map(reply => (
              <CommentItem key={reply.id} comment={reply} onAddReply={onAddReply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
