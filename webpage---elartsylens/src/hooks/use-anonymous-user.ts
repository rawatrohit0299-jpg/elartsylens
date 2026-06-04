'use client';
import { useState, useEffect } from 'react';

const ADJECTIVES = [
    'Quiet', 'Wandering', 'Lost', 'Found', 'Silent', 'Cosmic', 'Golden', 
    'Dreamy', 'Passing', 'Ancient', 'Forgotten', 'Midnight', 'Crimson'
];
const NOUNS = [
    'Wanderer', 'Mind', 'Soul', 'Voyager', 'Dreamer', 'Thinker', 'Echo', 
    'Pilgrim', 'Specter', 'Oracle', 'Rider', 'Poet'
];

const generateAlias = () => {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const num = Math.floor(Math.random() * 100);
  return `${adj}${noun}_${num}`;
};

export function useAnonymousUser() {
  const [alias, setAlias] = useState<string | null>(null);

  useEffect(() => {
    let userAlias = localStorage.getItem('anonymous-user-alias');
    if (!userAlias) {
      userAlias = generateAlias();
      localStorage.setItem('anonymous-user-alias', userAlias);
    }
    setAlias(userAlias);
  }, []);

  return { alias };
}
