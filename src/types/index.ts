export interface GameInfo {
  title: string;
  english_title: string;
  release_date: string;
  developer: string;
  publisher: string;
  platforms: string[];
  genre: string;
  price: {
    digital_standard: string;
    currency: string;
  };
  director: string;
  producer: string;
  series_producer: string;
  engine: string;
  timeline: string;
  description: string;
  game_features: string[];
}

export interface Character {
  name: string;
  role: string;
  playstyle: string;
  default_view: string;
  description: string;
  icon?: string;
}

export interface Story {
  setting: string;
  plot_summary: string;
  main_characters: Character[];
}

export interface Weapon {
  id: string;
  name_cn: string;
  name_en: string;
  type: string;
  character: string;
  obtain_method: string;
  stats?: {
    power?: number | string;
    stability?: number | string;
    precision?: number | string;
    rate_of_fire?: number | string;
    reload_speed?: number | string;
    ammo_capacity?: number | string;
    spread?: string;
    durability?: number | string;
    type?: string;
    grouping?: string;
    description?: string;
  };
  ammo_type: string;
  description?: string;
  upgrades?: Array<{
    name: string;
    stats: string;
    cost: string;
  }>;
  special?: string;
  note?: string;
  recommendation?: string;
  mechanics?: string[];
  infinite_ammo?: string;
}

export interface Enemy {
  id: string;
  name_cn: string;
  name_en: string;
  type: string;
  weakness: string;
  health: string;
  damage: string;
  strategy: string;
  threat_level: string;
  note?: string;
  description?: string;
  spawn_condition?: string;
  danger?: string;
  special?: string;
  location?: string;
  warning?: string;
}

export interface Boss {
  id: string;
  name_cn: string;
  name_en: string;
  type: string;
  character?: string;
  location?: string;
  health?: string;
  damage?: string;
  weakness?: string;
  threat_level?: string;
  description?: string;
  abilities?: string[];
  fear?: string;
  phases?: Array<{
    phase?: number;
    name?: string;
    location?: string;
    mechanic?: string;
    strategy?: string | string[];
    weakness?: string;
    abilities?: string[];
    appearance?: string;
  }>;
  strategy?: string | string[];
  encounters?: Array<{
    character: string;
    location: string;
    optional?: boolean;
    strategy?: string[];
  }>;
  reward?: string;
  difficulty?: string;
  prerequisite?: string;
  final_action?: string;
  recommendation?: string;
  tips?: string[];
  critical_choice?: {
    true_ending: string;
    bad_ending: string;
  };
  restriction?: string;
}

export interface Chapter {
  chapter_number?: number;
  title?: string;
  chapter?: string;
  location?: string;
  areas?: string[];
  playable_character?: string;
  character?: string;
  characters?: string;
  description?: string;
  key_items?: Array<{
    name?: string;
    item?: string;
    location?: string;
    usage?: string;
    type?: string;
    obtain_method?: string;
    prerequisite?: string;
    character?: string;
    importance?: string;
  }>;
  gameplay?: string[];
  objectives?: string[];
  enemies?: Array<{
    name: string;
    strategy?: string;
  }> | string[];
  boss_encounters?: Array<{
    name: string;
    type?: string;
    description?: string;
    strategy?: string[];
    weakness?: string;
    phases?: Array<{
      phase: number;
      name?: string;
      strategy: string[];
      weakness?: string;
    }>;
    location?: string;
    difficulty?: string;
  }>;
  boss?: {
    name: string;
    type?: string;
    difficulty?: string;
    character?: string;
    weakness?: string;
    strategy?: string[];
    phases?: Array<{
      phase?: number;
      name?: string;
      strategy?: string[];
      weakness?: string;
    }>;
  };
  tips?: string[];
  puzzles?: Array<{
    name: string;
    location?: string;
    solution?: string;
  }>;
  files?: string[];
  antique_coins?: Array<{
    coin: string;
    location: string;
  }>;
  mr_raccoon?: Array<{
    number: string;
    location: string;
    character?: string;
  }>;
  safe?: {
    location: string;
    code: string;
    insanity_code?: string;
  };
  weapons_available?: Array<{
    weapon: string;
    method?: string;
    location?: string;
  }>;
  weapons_found?: Array<{
    weapon: string;
    location: string;
  }>;
  starting_weapons?: string[];
  combat_tips?: string[];
}

export interface Consumable {
  id: string;
  name_cn: string;
  name_en: string;
  type: string;
  effect: string;
  description: string;
  rarity: string;
  recipe?: string;
}

export interface KeyItem {
  id: string;
  name_cn: string;
  location?: string;
  usage?: string;
  prerequisite?: string;
  special?: string;
}

export interface CollectibleData {
  overview: {
    total_collectible_types: number;
    total_count: string;
    carry_over: string;
    missable_warning: string;
    tracking: string;
  };
  mr_raccoon: {
    name_cn: string;
    name_en: string;
    total: number;
    trophy: string;
    description: string;
    destruction_method: string;
    unlock_map: string;
    reward: string;
    locations_by_area: Array<{
      area: string;
      count: number;
      number?: string;
      method?: string;
      character?: string;
      details?: Array<{
        number: string;
        location: string;
        note?: string;
      }>;
    }>;
  };
  files: {
    name_cn: string;
    name_en: string;
    total: number;
    trophy: string;
    description: string;
    tracking: string;
    carry_over: string;
    categories: string[];
    key_files: Array<{
      id: number;
      name: string;
      location: string;
    }>;
    note: string;
  };
  antique_coins: {
    name_cn: string;
    name_en: string;
    total: number;
    character: string;
    location: string;
    usage: string;
    carry_over: string;
    insanity_note: string;
    upgrades: Array<{
      item: string;
      cost: string;
      effect: string;
      recommendation?: string;
    }>;
    total_cost: string;
    key_locations: Array<{
      coin: string;
      location: string;
    }>;
  };
  safes: {
    name_cn: string;
    name_en: string;
    total: number;
    trophy: string;
    character: string;
    insanity_change: string;
    list: Array<{
      id: number;
      location: string;
      normal_code?: string;
      insanity_code?: string;
      reward?: string;
      special?: string;
    }>;
    password_sources: string;
  };
  bsaa_containers: {
    name_cn: string;
    name_en: string;
    total: number;
    trophy: string;
    key_location: string;
    contents: Array<{
      container: string;
      location: string;
      content: string;
    }>;
  };
  plant_seedlings: {
    name_cn: string;
    name_en: string;
    total: number;
    trophy: string;
    description: string;
    locations: string;
  };
  charms: {
    name_cn: string;
    name_en: string;
    description: string;
    equip_slot: string;
    examples: Array<{
      name: string;
      effect: string;
      location?: string;
      usage?: string;
    }>;
  };
  hip_pouches: {
    name_cn: string;
    name_en: string;
    description: string;
    locations: string[];
  };
  weapon_attachments: {
    name_cn: string;
    description: string;
    list: Array<{
      name: string;
      location: string;
      effect: string;
    }>;
  };
  tracking_tips: {
    in_game: string;
    cross_playthrough: string;
    manual_save: string;
    new_game_plus: string;
    maps: string;
  };
}

export interface WalkthroughData {
  walkthrough: Chapter[];
  chapter_summaries: {
    总章节数: number;
    主要地点: string[];
    双主角章节: string[];
    纯格蕾丝章节: string[];
    纯里昂章节: string[];
  };
  missable_warnings: string[];
}

export interface EnemyData {
  common_enemies: Enemy[];
  bosses: Boss[];
  enemy_behavior: {
    dynamic_difficulty: {
      description: string;
      downgrade: string;
      upgrade: string;
      note: string;
    };
    mutation: {
      description: string;
      trigger: string;
      prevention: string[];
    };
  };
}

export interface WeaponData {
  weapons: Weapon[];
  upgrade_system: {
    description: string;
    tier_1_2: string;
    tier_3: string;
    attachments: Array<{
      name: string;
      location: string;
      effect: string;
    }>;
  };
  recommended_loadouts: {
    leon_early: {
      primary: string;
      secondary: string;
      heavy: string;
      melee: string;
    };
    leon_mid: {
      primary: string;
      secondary: string;
      long_range: string;
      heavy: string;
    };
    grace: {
      primary: string;
      emergency: string;
      special: string;
      note: string;
    };
    speedrun: {
      charm: string;
      scope: string;
      boss: string;
      accessory: string;
    };
  };
}

export interface ItemData {
  consumables: Consumable[];
  key_items: KeyItem[];
  crafting_materials: Array<{
    id: string;
    name_cn: string;
    description: string;
    importance?: string;
    tip?: string;
    recipe_usage?: string;
    obtain_method?: string;
  }>;
  throwables: Array<{
    id: string;
    name_cn: string;
    recipe?: string;
    effect: string;
    location?: string;
    usage?: string;
    damage?: string;
    special?: string;
    obtain_method?: string;
  }>;
  special_items: Array<{
    id: string;
    name_cn: string;
    character?: string;
    location?: string;
    effect: string;
    description?: string;
    usage?: string;
    limitation?: string;
    recommendation?: string;
  }>;
  inventory_upgrades: Array<{
    name: string;
    effect: string;
    obtain_method?: string;
    location?: string;
  }>;
}

export interface GameData {
  game_info: GameInfo;
  story: Story;
  chapters: Chapter[];
  items: ItemData;
}
