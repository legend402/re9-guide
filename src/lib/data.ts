import gameData from '@/data/生化危机9_安魂曲_完整数据.json';
import weaponData from '@/data/生化危机9_武器数据.json';
import enemyData from '@/data/生化危机9_敌人数据.json';
import collectibleData from '@/data/生化危机9_收藏品数据.json';
import walkthroughData from '@/data/生化危机9_流程攻略.json';
import itemData from '@/data/生化危机9_道具数据.json';
import type { CollectibleData, WeaponData, EnemyData, WalkthroughData, ItemData, GameData } from '@/types';

export function getGameData(): GameData {
  return gameData as unknown as GameData;
}

export function getWeaponData(): WeaponData {
  return weaponData as unknown as WeaponData;
}

export function getEnemyData(): EnemyData {
  return enemyData as unknown as EnemyData;
}

export function getCollectibleData(): CollectibleData {
  return collectibleData as unknown as CollectibleData;
}

export function getWalkthroughData(): WalkthroughData {
  return walkthroughData as unknown as WalkthroughData;
}

export function getItemData(): ItemData {
  return itemData as unknown as ItemData;
}
