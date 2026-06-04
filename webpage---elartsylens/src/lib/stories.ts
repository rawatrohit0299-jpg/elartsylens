export type Story = {
  id: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  imageHint: string;
  location: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  body: string;
};

export const stories: Story[] = [
  {
    id: 'story-1',
    thumbnailUrl: 'https://lh3.googleusercontent.com/pw/AP1GczNDLxDYqpj4tWhfTWMF04eJ8o5Y58kbUr6fV20G1SIYF0s3hLbGNpdzm2f_Yf1v5jFW7lPkTmhrfDUFDOAkm4X0pT_xm5lblPZ_1MiWHiSl92scevgVX_S_dGdc1QU3Y3BicZe9OMP2Sc_YecpnzOGK7g=w1086-h1448-s-no-gm-rw?authuser=0',
    width: 1086,
    height: 1448,
    imageHint: 'mountain alpenglow',
    location: 'Munsiyari',
    year: '2024',
    title: 'Alpenglow over the Panchachuli Peaks',
    subtitle: 'A chapter written at dusk',
    description: "An exploration of solitude and the Himalayas. This series captures the quiet, golden moments of alpenglow on the Panchachuli peaks as seen from the edge of the world in Munsiyari.",
    body: "Standing at the edge of the world in Munsiyari, the air is crisp and carries the silent weight of the Himalayas. As the sun dips below the horizon, the valley below falls into a deep, velvety shadow, leaving only the jagged summits of the Panchachuli range to catch the day's final embers. The contrast is startling—a sea of dark indigo silhouettes crowned by a singular, glowing pyramid of gold and ivory.\n\nThere is a profound stillness in this moment. The wind whispers through the pine forests far below, but up here, the mountain seems to hold its breath. Watching the light transition from brilliant saffron to a soft rose-gold feels like witnessing a sacred ritual. It is a reminder of the raw, unyielding beauty of Uttarakhand, where the earth reaches up to touch the heavens in a display of quiet, monumental power.",
  },
  {
    id: 'story-2',
    thumbnailUrl: 'https://lh3.googleusercontent.com/pw/AP1GczOm_NtrUOZQz_XhwVdcPEHV_cizkwzDXeZU3fi4fHw62f0v4KRzb75w-dGUPxBAikoF9Vg10J_TZ2HUUP5ASq5_gGXOK1vD5HcPQJa5HfNcJx_fYglKBm2ZpJMXQC2nWgfz21miM027Us0umPcTzRGQ0Q=w2172-h1448-s-no-gm-rw?authuser=0',
    width: 2172,
    height: 1448,
    imageHint: 'abstract light',
    location: 'Visual Diary',
    year: '2024',
    title: 'The Coast Watchers',
    subtitle: 'An exploration of solitude and the sea.',
    description: "An exploration of solitude and the sea. This essay captures the quiet moments along the shoreline, focusing on the figures who watch the waves and the stories they might tell. A study in patience and perspective.",
    body: "An exploration of solitude and the sea. This essay captures the quiet moments along the shoreline, focusing on the figures who watch the waves and the stories they might tell. A study in patience and perspective. Each frame is a quiet contemplation, a story whispered by the ocean breeze. The figures, silhouetted against the vast expanse of water, become universal symbols of introspection and connection to the natural world. It's a visual diary of watching and being watched, of finding permanence in the ephemeral.",
  },
];
