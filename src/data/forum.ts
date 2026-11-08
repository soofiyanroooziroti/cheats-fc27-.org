export interface ForumComment {
  author: string;
  age: string;
  score: number;
  body: string;
  developer?: boolean;
  replies?: ForumComment[];
}

export interface ForumPost {
  slug: string;
  category: string;
  categoryTone: 'purple' | 'blue' | 'green' | 'orange';
  title: string;
  excerpt: string;
  /** Meta description. Cards keep the shorter excerpt. */
  description: string;
  author: string;
  age: string;
  date: string;
  commentsCount: number;
  upvotes: number;
  flair?: string;
  body: string[];
  comments: ForumComment[];
  sourceTitle?: string;
  sourcePath?: string;
  /** Answered threads that should show a closed badge. New patch threads stay open. */
  closed?: boolean;
}

export const FORUM_DEVELOPER = 'FC27Staff';

export const forumCategories = [
  { name: 'General', tone: 'purple', icon: 'users' },
  { name: 'Guides & Builds', tone: 'blue', icon: 'navBlog' },
  { name: 'Patch Talk', tone: 'orange', icon: 'refresh' },
  { name: 'Community', tone: 'green', icon: 'messageCircle' },
] as const;

/** Stable filter keys — always derived from English category names. */
export const FORUM_CATEGORY_KEYS: Record<string, string> = {
  General: 'general',
  'Guides & Builds': 'guidesbuilds',
  'Patch Talk': 'patchtalk',
  Community: 'community',
};

export function forumCategoryFilterKey(category: string): string {
  return FORUM_CATEGORY_KEYS[category] ?? category.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function countComments(comments: ForumComment[]): number {
  return comments.reduce(
    (total, comment) => total + 1 + (comment.replies ? countComments(comment.replies) : 0),
    0,
  );
}

function withCounts(post: Omit<ForumPost, 'commentsCount'>): ForumPost {
  return { ...post, commentsCount: countComments(post.comments) };
}

export function forumLastReply(comments: ForumComment[]): { author: string; age: string } | null {
  let last: ForumComment | null = null;
  const walk = (list: ForumComment[]) => {
    for (const comment of list) {
      last = comment;
      if (comment.replies?.length) walk(comment.replies);
    }
  };
  walk(comments);
  return last ? { author: last.author, age: last.age } : null;
}

/** Seeded discussions — FC 27 + EA Javelin framing (neutral risk copy). */
const rawPosts: Array<Omit<ForumPost, 'commentsCount'>> = [
  {
    slug: 'ricochet-status-before-queue',
    category: 'Patch Talk',
    categoryTone: 'orange',
    title: 'After a client patch, when is it safe to open the loader?',
    excerpt:
      'Title Update v1.1.0 (October 27, 2026) is installed. My preset is older and the status page says Updated.',
    description:
      'Read cheatsfc27.org after each client or EA Javelin update. The current note is Title Update v1.1.0. Updated is not an undetected claim.',
    author: 'QueueHold',
    age: '6h ago',
    date: 'Oct 27, 2026',
    upvotes: 54,
    flair: '❓ Question',
    body: [
      'Windows 11, EA App. Title Update v1.1.0 (October 27, 2026) is on the client and my preset is from before that build.',
      'Do I trust an older green banner, or wait until the status note names v1.1.0 before I open the loader?',
    ],
    comments: [
      {
        author: FORUM_DEVELOPER,
        age: '5h ago',
        score: 38,
        developer: true,
        body: 'Wait until this site’s status note names the build you installed. Right now that note is Title Update v1.1.0 (October 27, 2026). A banner from an older client is not a current check. EA Javelin and the game client do not always ship the same hour. Nothing here promises a clean lobby. If the note is not for your build, leave the loader closed.',
      },
    ],
    sourceTitle: 'Status page',
    sourcePath: '/status/',
  },
  {
    slug: 'ban-risk-ricochet',
    category: 'General',
    categoryTone: 'purple',
    title: 'Can EA Javelin still flag an account if the status page is green?',
    excerpt: 'I see people talking about waves. I want the honest read from this store, not hype.',
    description:
      'EA Javelin can still act on an account. Updated on the status page is not a guarantee of a clean match.',
    author: 'RiskRead',
    age: '1d ago',
    date: 'Nov 6, 2026',
    upvotes: 71,
    flair: '💬 Discussion',
    body: [
      'Public notes say anti-cheat keeps evolving. I am not asking for bypass steps.',
      'What will this site actually claim when someone asks if they are “safe”?',
    ],
    comments: [
      {
        author: FORUM_DEVELOPER,
        age: '1d ago',
        score: 45,
        developer: true,
        body: 'We do not claim undetected runs or clean lobbies. EA Javelin can still take action on an account. The status line is a patch-day reminder to read before you launch, not proof that a session will stay clean.',
      },
    ],
    sourceTitle: 'FAQ',
    sourcePath: '/faq/',
  },
  {
    slug: 'lifetime-separate-spoofer',
    category: 'General',
    categoryTone: 'purple',
    title: 'Does the $150 lifetime cheat key include the HWID spoofer?',
    excerpt: 'Two cards at checkout. I want to be sure lifetime on one is not both.',
    description:
      'The cheat is $35 for 31 days or $150 lifetime; the HWID spoofer is $50 for 31 days or $150 lifetime. Separate keys.',
    author: 'PlanMath',
    age: '3d ago',
    date: 'Nov 4, 2026',
    upvotes: 62,
    closed: true,
    flair: '❓ Question',
    body: [
      'I am looking at the loader card and the spoofer card. Lifetime is $150 on each.',
      'If I buy lifetime on FC27 Cheats, does the spoofer unlock too?',
    ],
    comments: [
      {
        author: FORUM_DEVELOPER,
        age: '3d ago',
        score: 40,
        developer: true,
        body: 'No. Lifetime on FC27 Cheats is only that product. The HWID spoofer is a separate checkout with its own key. Monthly pricing differs ($35 vs $50); lifetime is $150 per product when offered on the card.',
      },
    ],
    sourceTitle: 'Pricing FAQ',
    sourcePath: '/blog/best-fc-27-cheats-review-2026/',
  },
  {
    slug: 'hardware-flag-which-product',
    category: 'Community',
    categoryTone: 'green',
    title: 'New account fails on this PC but works on a laptop — which product?',
    excerpt: 'Desktop blocks new profiles; laptop does not. I already have the cheat month.',
    description:
      'A hardware-flag pattern matches the HWID spoofer. The cheat key does not include it.',
    author: 'SecondRig',
    age: '4d ago',
    date: 'Nov 3, 2026',
    upvotes: 48,
    flair: '❓ Question',
    body: [
      'Same region, same Battle.net. Fresh accounts die on the desktop and play fine on the laptop.',
      'Do I buy the spoofer?',
    ],
    comments: [
      {
        author: FORUM_DEVELOPER,
        age: '4d ago',
        score: 33,
        developer: true,
        body: 'When a new profile fails on one machine and works on another, that is the hardware-ID pattern the spoofer addresses. The cheat key does not include the spoofer.',
      },
    ],
    sourceTitle: 'What an HWID spoofer is',
    sourcePath: '/blog/fc-27-ban-fix-hwid-spoofer/',
  },
  {
    slug: 'feature-list-source',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'Where is the full loader feature list?',
    excerpt: 'Older guides use different names. I want the same labels as the loader menu.',
    description:
      'Use the FC27 Cheats product page as the source of truth for menu group names before checkout.',
    author: 'MenuMatch',
    age: '5d ago',
    date: 'Nov 2, 2026',
    upvotes: 36,
    flair: '💬 Discussion',
    body: [
      'Some older guides use different wording; the product page lists the loader tabs.',
      'Which page should I trust when I compare to the loader?',
    ],
    comments: [
      {
        author: FORUM_DEVELOPER,
        age: '5d ago',
        score: 22,
        developer: true,
        body: 'The FC27 Cheats product page lists the loader groups as they appear in the menu. Blog posts explain workflows; if a label drifts after a patch, the product page and status note are what you re-check first.',
      },
    ],
    sourceTitle: 'FC27 Cheats feature list',
    sourcePath: '/products/fc27-cheats/loader/#features',
  },
  {
    slug: 'noloss-vs-division-spoofer',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'NoLoss stayed on and my division still moved. Which Ultimate Team toggle is which?',
    excerpt: 'I left NoLoss on in Rivals and the division number still changed. Division Spoofer was off.',
    description:
      'NoLoss and Division Spoofer are separate Ultimate Team Options. One does not turn the other on.',
    author: 'RivalsTab',
    age: '8h ago',
    date: 'Nov 7, 2026',
    upvotes: 44,
    closed: true,
    flair: '✅ Solved',
    body: [
      'EA App, Windows 11, Ultimate Team Rivals. Ultimate Team Options shows NoLoss, Division Spoofer, and the Champions rows.',
      'NoLoss was on. Division Spoofer was off. After two matches the division still moved. Did I use the wrong row?',
    ],
    comments: [
      {
        author: 'WeekendRivals',
        age: '7h ago',
        score: 11,
        body: 'Same mix-up. I had NoLoss on and expected the division label to freeze.',
      },
      {
        author: FORUM_DEVELOPER,
        age: '6h ago',
        score: 29,
        developer: true,
        body: 'They are separate rows in Ultimate Team Options. NoLoss does not enable Division Spoofer, and Division Spoofer does not enable the Champions Win/Loss or Champions Round rows. Turn on only the row that matches the mode you are in, then leave the match and confirm that row is still on. This is not a claim that EA Javelin ignores the account.',
        replies: [
          {
            author: 'RivalsTab',
            age: '5h ago',
            score: 8,
            body: 'Solved. Division Spoofer was the row I actually needed. NoLoss stayed off for that test.',
          },
        ],
      },
    ],
    sourceTitle: 'Ultimate Team options',
    sourcePath: '/products/fc27-cheats/loader/#features',
  },
  {
    slug: 'alt-tab-vs-desync',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'The menu dies when I alt-tab back from Discord. Desync or ALT-TAB?',
    excerpt: 'Utilities has two bypass rows. I enabled Desync Bypass and the menu still drops after alt-tab.',
    description:
      'ALT-TAB Bypass and Desync Bypass are separate Utilities toggles. Alt-tab loss is the ALT-TAB row.',
    author: 'SecondMonitor',
    age: '11h ago',
    date: 'Nov 7, 2026',
    upvotes: 39,
    closed: true,
    flair: '✅ Solved',
    body: [
      'Windows 11, two monitors. I alt-tab to Discord during a pause and the menu is gone when I come back.',
      'Utilities lists Desync Bypass and ALT-TAB Bypass. I only turned Desync on. Is that the wrong one?',
    ],
    comments: [
      {
        author: FORUM_DEVELOPER,
        age: '10h ago',
        score: 27,
        developer: true,
        body: 'Use ALT-TAB Bypass for the alt-tab case. Desync Bypass is a different Utilities row and does not replace it. Enable one, reproduce the alt-tab, then enable the other only if you still need that second case. Neither row is an EA Javelin bypass, and neither one means a match stays clean.',
        replies: [
          {
            author: 'SecondMonitor',
            age: '9h ago',
            score: 6,
            body: 'Solved. ALT-TAB Bypass was the row. Desync stayed off.',
          },
        ],
      },
    ],
    sourceTitle: 'Utilities',
    sourcePath: '/products/fc27-cheats/loader/#features',
  },
  {
    slug: 'anti-ban-after-title-update',
    category: 'Patch Talk',
    categoryTone: 'orange',
    title: 'Anti-Ban Protection is on. Does Title Update v1.1.0 still need a status check?',
    excerpt: 'Safety has one toggle. I want to know if that replaces reading the status note.',
    description:
      'Anti-Ban Protection is a Safety toggle. It does not replace the status note for Title Update v1.1.0 and it is not an undetected claim.',
    author: 'SafetyRow',
    age: '14h ago',
    date: 'Nov 7, 2026',
    upvotes: 58,
    flair: '❓ Question',
    body: [
      'The Safety group only lists Anti-Ban Protection. Title Update v1.1.0 (October 27, 2026) is installed.',
      'If that toggle is on, do I still wait for the status note before I open the loader?',
    ],
    comments: [
      {
        author: FORUM_DEVELOPER,
        age: '13h ago',
        score: 34,
        developer: true,
        body: 'Yes, still read the status page. Anti-Ban Protection is a menu toggle in Safety. It does not replace the Title Update v1.1.0 note, and it does not mean EA Javelin will leave the account alone. If the status note is not for the build you installed, leave the loader closed.',
      },
      {
        author: 'PatchClock',
        age: '12h ago',
        score: 9,
        body: 'I treated the toggle as a green light and almost queued. Holding for the status line instead.',
      },
    ],
    sourceTitle: 'Status page',
    sourcePath: '/status/',
  },
  {
    slug: 'loader-before-ea-app',
    category: 'Community',
    categoryTone: 'green',
    title: 'Loader says it cannot see FC 27. The game is installed through EA App.',
    excerpt: 'I opened the loader from the desktop before EA App. The client was not running yet.',
    description:
      'Open EA App and the FC 27 client before the loader. A store install that is not the EA App copy is a different setup.',
    author: 'BootOrder',
    age: '1d ago',
    date: 'Nov 6, 2026',
    upvotes: 41,
    closed: true,
    flair: '✅ Solved',
    body: [
      'Windows 11. FC 27 is installed in EA App. I started the loader first, from the desktop, and it reported that it could not see the game.',
      'I have not changed Windows security settings. Is the start order wrong?',
    ],
    comments: [
      {
        author: 'SameBoot',
        age: '1d ago',
        score: 7,
        body: 'I had the loader open on the login screen and got the same line.',
      },
      {
        author: FORUM_DEVELOPER,
        age: '22h ago',
        score: 24,
        developer: true,
        body: 'Start EA App, open the FC 27 client, and only then open the loader. This build is for that Windows client. Leave Windows security settings as they are. If the client is already running and the loader text is still the same, send the order email and the exact line through support.',
        replies: [
          {
            author: 'BootOrder',
            age: '20h ago',
            score: 5,
            body: 'Solved. EA App and the client first, loader second. The message is gone.',
          },
        ],
      },
    ],
    sourceTitle: 'Support',
    sourcePath: '/support/',
  },
  {
    slug: 'playstyles-plus-clubs',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'PlayStyles is on in Clubs and PlayStyles+ still looks unchanged.',
    excerpt: 'Pro Clubs Options lists both. I enabled the first one and expected the plus row to follow.',
    description:
      'PlayStyles and PlayStyles+ are separate Pro Clubs Options. Virtual Pro Attribute Editor does not switch them on.',
    author: 'ClubSheet',
    age: '2d ago',
    date: 'Nov 5, 2026',
    upvotes: 33,
    closed: true,
    flair: '✅ Solved',
    body: [
      'Pro Clubs, not Ultimate Team. Pro Clubs Options has Virtual Pro Attribute Editor, VPRO Sliders, PlayStyles, PlayStyles+, Hidden Stats 99, and XP Boost.',
      'PlayStyles is on. PlayStyles+ still looks like the default. Does the first row include the plus row?',
    ],
    comments: [
      {
        author: FORUM_DEVELOPER,
        age: '2d ago',
        score: 21,
        developer: true,
        body: 'No. PlayStyles and PlayStyles+ are separate rows. Virtual Pro Attribute Editor and VPRO Sliders do not turn either one on. Hidden Stats 99 and XP Boost are separate as well. Change one row, check the Clubs session, then change the next.',
        replies: [
          {
            author: 'ClubSheet',
            age: '2d ago',
            score: 4,
            body: 'Solved. PlayStyles+ had to be its own toggle. The first row was already doing what it says.',
          },
        ],
      },
    ],
    sourceTitle: 'Pro Clubs options',
    sourcePath: '/products/fc27-cheats/loader/#features',
  },
  {
    slug: 'champions-rows-in-kickoff',
    category: 'Community',
    categoryTone: 'green',
    title: 'Champions Win/Loss Spoofer does nothing in Kick Off.',
    excerpt: 'Both Champions rows are on. This match is a local Kick Off, not Champions.',
    description:
      'Champions Win/Loss Spoofer and Champions Round Spoofer belong to Champions. Kick Off does not use those Ultimate Team rows.',
    author: 'KickOffTest',
    age: '2d ago',
    date: 'Nov 5, 2026',
    upvotes: 29,
    closed: true,
    flair: '✅ Solved',
    body: [
      'I wanted a quick test, so I loaded Kick Off with a friend on the same PC session.',
      'Champions Win/Loss Spoofer and Champions Round Spoofer are both on. The scoreboard does not reflect either row.',
    ],
    comments: [
      {
        author: FORUM_DEVELOPER,
        age: '2d ago',
        score: 19,
        developer: true,
        body: 'Those two rows are for Champions, not Kick Off. Ultimate Team Options also keeps Draft Round Modifier, Skip Pack Animation, and Instant Moment on their own rows. Test each one in the mode named on the row. A Kick Off match will not show a Champions result.',
        replies: [
          {
            author: 'KickOffTest',
            age: '2d ago',
            score: 3,
            body: 'Solved. I was in the wrong mode. Champions is the only place I will check those two rows.',
          },
        ],
      },
    ],
    sourceTitle: 'Ultimate Team options',
    sourcePath: '/products/fc27-cheats/loader/#features',
  },
  {
    slug: 'sliders-with-auto-play',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'AI Auto Play is on and my Player Sliders look like they are ignored.',
    excerpt: 'Gameplay Options has both. The AI is taking the match and the slider values never show up.',
    description:
      'AI Auto Play and Player Sliders are separate Gameplay Options. Test sliders with AI Auto Play off.',
    author: 'SliderStack',
    age: '3d ago',
    date: 'Nov 4, 2026',
    upvotes: 37,
    flair: '💬 Discussion',
    body: [
      'Gameplay Options: AI Auto Play, Player Sliders, Opponent Sliders, 5-Star Skill Moves, 5-Star Weak Foot, Stamina Control, and Custom Tactics.',
      'AI Auto Play is on. I set Player Sliders and the controlled player still plays the AI pattern. Should the sliders win?',
    ],
    comments: [
      {
        author: 'CareerNight',
        age: '3d ago',
        score: 8,
        body: 'I turned AI Auto Play off and the slider values showed up on the next match. Opponent Sliders stayed separate.',
      },
      {
        author: FORUM_DEVELOPER,
        age: '3d ago',
        score: 18,
        developer: true,
        body: 'Test Player Sliders with AI Auto Play off. They are different rows, and Opponent Sliders is a third row. 5-Star Skill Moves, 5-Star Weak Foot, Stamina Control, and Custom Tactics do not switch the sliders on. Change one row at a time so you can see which one actually moved.',
        replies: [
          {
            author: 'SliderStack',
            age: '3d ago',
            score: 4,
            body: 'That was it. Sliders with auto play off. I can see the values now.',
          },
        ],
      },
    ],
    sourceTitle: 'Gameplay options',
    sourcePath: '/products/fc27-cheats/loader/#features',
  },
  {
    slug: 'pack-skip-still-animates',
    category: 'Community',
    categoryTone: 'green',
    title: 'Skip Pack Animation is on and the pack still plays the full animation.',
    excerpt: 'The toggle was enabled in a match. I opened the store after, without checking the row again.',
    description:
      'Skip Pack Animation is its own Ultimate Team Options row. Confirm it is on in the store session, not only from a match earlier.',
    author: 'PackQueue',
    age: '4d ago',
    date: 'Nov 3, 2026',
    upvotes: 26,
    closed: true,
    flair: '✅ Solved',
    body: [
      'I enabled Skip Pack Animation during a Rivals match, backed out, and opened packs.',
      'The full animation still played. Instant Moment was also on. I assumed they were the same switch.',
    ],
    comments: [
      {
        author: FORUM_DEVELOPER,
        age: '4d ago',
        score: 16,
        developer: true,
        body: 'Skip Pack Animation and Instant Moment are separate Ultimate Team Options. Turn Skip Pack Animation on in the session where you open the pack, and confirm the row is still enabled after you leave the match. Instant Moment does not replace it.',
        replies: [
          {
            author: 'PackQueue',
            age: '4d ago',
            score: 3,
            body: 'Solved. The row had dropped off after I left Rivals. Turned it on again in the store and the animation skipped.',
          },
        ],
      },
    ],
    sourceTitle: 'Ultimate Team options',
    sourcePath: '/products/fc27-cheats/loader/#features',
  },
];

export const forumPosts: ForumPost[] = rawPosts.map(withCounts);

export function getForumPost(slug: string) {
  return forumPosts.find((post) => post.slug === slug);
}
