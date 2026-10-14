'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { thoughts as initialThoughts, type Thought, type Comment } from '@/lib/thoughts';
import { useAnonymousUser } from '@/hooks/use-anonymous-user';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CommentItem } from './_components/comment-item';
import { CommentForm } from './_components/comment-form';
import { cn } from '@/lib/utils';

export default function ThoughtsPage() {
  const [thoughts, setThoughts] = useState<Thought[]>(initialThoughts);
  const [expandedThreads, setExpandedThreads] = useState<Record<string, boolean>>({});
  const { alias } = useAnonymousUser();

  const toggleThread = (thoughtId: string) => {
    setExpandedThreads(prev => ({ ...prev, [thoughtId]: !prev[thoughtId] }));
  };

  const addComment = (thoughtId: string, text: string, name?: string) => {
    const finalAlias = name || alias;
    if (!finalAlias) return;

    const newComment: Comment = {
      id: `comment-${thoughtId}-${Date.now()}`,
      alias: finalAlias,
      text,
      timestamp: new Date().toISOString(),
      votes: 0,
      replies: [],
    };

    setThoughts(prevThoughts =>
      prevThoughts.map(thought => {
        if (thought.id === thoughtId) {
          return { ...thought, comments: [newComment, ...thought.comments] };
        }
        return thought;
      })
    );
  };
  
  const addReply = (commentId: string, text: string) => {
    if (!alias) return;

    const newReply: Comment = {
      id: `reply-${commentId}-${Date.now()}`,
      alias,
      text,
      timestamp: new Date().toISOString(),
      votes: 0,
      replies: [],
    };
    
    const findAndAddReply = (comments: Comment[]): Comment[] => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          // Add the new reply to the top of the replies array
          return { ...comment, replies: [newReply, ...comment.replies] };
        }
        if (comment.replies && comment.replies.length > 0) {
          return { ...comment, replies: findAndAddReply(comment.replies) };
        }
        return comment;
      });
    };

    setThoughts(prevThoughts =>
      prevThoughts.map(thought => ({
        ...thought,
        comments: findAndAddReply(thought.comments),
      }))
    );
  };

  return (
    <div className="bg-background font-body">
      <section className="py-12 md:py-24">
        <div className="container mx-auto max-w-3xl px-4 md:px-6">
          <div className="mb-24 text-center">
            <h1 className="font-headline text-4xl font-bold uppercase tracking-tight md:text-5xl">Thoughts</h1>
            <p className="mt-2 text-lg text-muted-foreground">A space for deeper musings and reflections.</p>
          </div>

          <div className="space-y-32">
            {thoughts.map(thought => (
              <div key={thought.id}>
                <div className="relative mx-auto max-w-2xl text-center group">
                  <p className="text-2xl md:text-3xl font-headline leading-relaxed text-foreground/90">
                    {thought.text}
                  </p>
                  <Button variant="ghost" size="icon" onClick={() => toggleThread(thought.id)} className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full sm:-right-12">
                    <MessageSquare className={cn("h-5 w-5 text-muted-foreground transition-colors", expandedThreads[thought.id] && 'text-primary fill-primary/10')} />
                    <span className="sr-only">Toggle comments</span>
                  </Button>
                </div>
                
                {expandedThreads[thought.id] && (
                  <div className="mt-12 animate-in fade-in-0 duration-500">
                      <div className="max-w-2xl mx-auto space-y-8">
                        <CommentForm
                            onSubmit={({ text }) => addComment(thought.id, text)}
                            placeholder="Share your reflection..."
                            buttonLabel="Comment"
                        />
                        {thought.comments.length > 0 && <Separator />}
                        <div className="space-y-8">
                            {thought.comments.map(comment => (
                                <CommentItem key={comment.id} comment={comment} onAddReply={addReply} />
                            ))}
                        </div>
                      </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <Separator className="my-24" />

          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Thoughts?</h2>
            <p className="mt-2 text-muted-foreground">What does this make you think?</p>
            <div className="mx-auto mt-12 max-w-md">
                 <CommentForm 
                    onSubmit={({ text, name }) => {
                        const openThreadIds = Object.keys(expandedThreads).filter(k => expandedThreads[k]);
                        const targetThreadId = openThreadIds.length > 0 ? openThreadIds[openThreadIds.length - 1] : thoughts[0].id;
                        addComment(targetThreadId, text, name);
                        if (!expandedThreads[targetThreadId]) {
                            toggleThread(targetThreadId);
                        }
                    }} 
                    placeholder=""
                    buttonLabel="Share"
                    showNameInput={true}
                />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
