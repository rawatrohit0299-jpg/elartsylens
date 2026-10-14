
export type Comment = {
  id: string;
  alias: string;
  text: string;
  timestamp: string; // ISO string
  votes: number;
  replies: Comment[];
};

export type Thought = {
  id: string;
  text: string;
  comments: Comment[];
};

// Mock ISO timestamps for past dates
const now = new Date();
const time = (h: number, m: number = 0) => new Date(now.getTime() - (h * 60 + m) * 60 * 1000).toISOString();

export const thoughts: Thought[] = [
  {
    id: 'thought-1',
    text: 'Too many things to do end up doing nothing',
    comments: [
      {
        id: 'comment-1-1',
        alias: 'QuietMind_88',
        text: 'This really hits home. I feel paralyzed by my to-do list sometimes.',
        timestamp: time(2),
        votes: 13,
        replies: [
          {
            id: 'comment-1-1-1',
            alias: 'Wanderer_27',
            text: "Same here. I've heard it called 'analysis paralysis'. The sheer volume of tasks makes it impossible to start just one.",
            timestamp: time(1),
            votes: 5,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 'thought-2',
    text: 'Sometimes we seek too much perfection that we forget what we already have',
    comments: [
      {
        id: 'comment-2-1',
        alias: 'GoldenEcho_15',
        text: 'reminder to enjoy the present',
        timestamp: time(25),
        votes: 18,
        replies: [],
      },
      {
        id: 'comment-2-2',
        alias: 'SilentPilgrim_42',
        text: 'perfect is the enemy of good',
        timestamp: time(4),
        votes: 9,
        replies: [],
      },
    ],
  },
  {
    id: 'thought-3',
    text: 'The one who loves always shares',
    comments: [],
  },
  {
    id: 'thought-4',
    text: 'As we grow up we transition from “I need it” to “for how long I need it”',
    comments: [
        {
            id: 'comment-4-1',
            alias: 'DreamyVoyager_7',
            text: "The shift from materialism to experimentalism",
            timestamp: time(49),
            votes: 22,
            replies: []
        }
    ],
  },
  {
    id: 'thought-5',
    text: 'Sometimes we know certain things are wrong but still we do it',
    comments: [],
  },
  {
    id: 'thought-6',
    text: 'Emotions and depth depend on how long we choose to stay attached',
    comments: [],
  },
];
