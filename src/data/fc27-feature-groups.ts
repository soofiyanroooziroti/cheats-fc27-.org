import type { ProductFeatureGroup } from './product-types';

/** Loader menu groups — names match the FC 27 product UI tabs. */
function item(name: string, desc?: string) {
  return { name, desc: desc ?? 'Toggle or slider in this menu group.' };
}

export const fc27LoaderFeatureGroups: ProductFeatureGroup[] = [
  {
    name: 'Ultimate Team Options',
    items: [
      item('NoLoss'),
      item('Division Spoofer'),
      item('Champions Win/Loss Spoofer'),
      item('Champions Round Spoofer'),
      item('Opponent Name / Platform'),
      item('Draft Round Modifier'),
      item('Skip Pack Animation'),
      item('Instant Moment'),
    ],
  },
  {
    name: 'Utilities',
    items: [item('Desync Bypass'), item('ALT-TAB Bypass')],
  },
  {
    name: 'Gameplay Options',
    items: [
      item('AI Auto Play'),
      item('Player Sliders'),
      item('Opponent Sliders'),
      item('5-Star Skill Moves'),
      item('5-Star Weak Foot'),
      item('Stamina Control'),
      item('Custom Tactics'),
    ],
  },
  {
    name: 'Pro Clubs Options',
    items: [
      item('Virtual Pro Attribute Editor'),
      item('VPRO Sliders'),
      item('PlayStyles'),
      item('PlayStyles+'),
      item('Hidden Stats 99'),
      item('XP Boost'),
    ],
  },
  {
    name: 'Safety',
    items: [item('Anti-Ban Protection')],
  },
];
