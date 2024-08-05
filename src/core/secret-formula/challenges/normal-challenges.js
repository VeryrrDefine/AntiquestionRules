import { DC } from "../../constants.js";

// I tried to make it relatively simple to add more locks; the idea is that you give it a value here
// and then it's all handled in the backend
// If you need to lock a challenge, set lockedAt to a new Decimal variable reflective of a desired number of Infinities
// They will always be unlocked post-eternity

export const normalChallenges = [
  {
    id: 1,
    legacyId: 1,
    isQuickResettable: false,
    description() {
      return PlayerProgress.eternityUnlocked()
        ? "reach 无穷 for the first time outside of a 盘问."
        : "reach 无穷 for the first time.";
    },
    name: "1短吨 反问题尺寸 Autobuyer",
    reward: "Upgradeable 1短吨 反问题尺寸 Autobuyer",
    lockedAt: DC.D0,
  },
  {
    id: 2,
    legacyId: 2,
    isQuickResettable: false,
    description:
      () => "buying 反问题尺寸 or 嘀嗒速度 upgrades halts production of all 反问题尺寸. " +
      `Production gradually returns to normal over ${formatInt(3)} minutes.`,
    name: "2nd Antimatter Dimension Autobuyer",
    reward: "Upgradeable 2钕 反问题 尺寸 Autobuyer",
    lockedAt: DC.D0,
  },
  {
    id: 3,
    legacyId: 3,
    isQuickResettable: false,
    description:
      `the 1短吨 反问题尺寸 is heavily weakened, but gets an uncapped exponentially increasing multiplier.
        This multiplier resets after 方面促进 and 反问题银河系.`,
    name: "3rd Antimatter Dimension",
    reward: "Upgradeable 3农村邮递 反问题 尺寸 Autobuyer",
    lockedAt: DC.D0,
  },
  {
    id: 4,
    legacyId: 8,
    isQuickResettable: false,
    description: "buying an 反问题尺寸 automatically erases all lower tier 反问题尺寸, " +
      "like a sacrifice without the boost.",
    name: "4th Antimatter Dimension Autobuyer",
    reward: "Upgradeable 4钍 反问题尺寸 Dimension Autobuyer",
    lockedAt: DC.D0,
  },
  {
    id: 5,
    legacyId: 6,
    isQuickResettable: false,
    description:
      () => `the 嘀嗒速度 purchase multiplier starts at ${formatX(1.080, 0, 3)} instead of ${formatX(1.1245, 0, 3)}.`,
    name: "5th Antimatter Dimension Autobuyer",
    reward: "Upgradeable 5钍 反问题 尺寸 Autobuyer",
    lockedAt: DC.D0,
  },
  {
    id: 6,
    legacyId: 10,
    isQuickResettable: false,
    description: () => `upgrading each Antimatter Dimension costs the Antimatter Dimension ${formatInt(2)} tiers ` +
      "below it instead of antimatter. Antimatter Dimension prices are modified.",
    name: "6th Antimatter Dimension Autobuyer",
    reward: "Upgradeable 6钍 反问题尺寸 Autobuyer",
    lockedAt: DC.D0,
  },
  {
    id: 7,
    legacyId: 9,
    isQuickResettable: false,
    description: () =>
      `the multiplier from buying ${formatInt(10)} 反问题尺寸 is reduced to ${formatX(1)}. This increases by
        ${formatX(0.2, 1, 1)} per Dimension Boost, to a maximum of ${formatX(2)}, and is unaffected by any upgrades.`,
    name: "7th Antimatter Dimension Autobuyer",
    reward: "Upgradeable 7钍 反问题尺寸 Autobuyer",
    lockedAt: DC.D0,
  },
  {
    id: 8,
    legacyId: 11,
    isQuickResettable: false,
    description: `Dimension Boosts provide no multiplier and Antimatter Galaxies cannot be bought. Dimensional
      Sacrifice resets antimatter and all 反问题尺寸, but also gives a significantly stronger multiplier.`,
    name: "8th Antimatter Dimension Autobuyer",
    reward: "Upgradeable 8钍 反问题 尺寸 Autobuyer",
    lockedAt: DC.D0,
  },
  {
    id: 9,
    legacyId: 5,
    isQuickResettable: true,
    description: () => `whenever you buy 嘀嗒速度 upgrades or ${formatInt(10)} of an Antimatter Dimension, ` +
      "everything else of equal cost will increase to its next cost step.",
    name: "嘀嗒速度 Autobuyer",
    reward: "Upgradeable 嘀嗒速度 Autobuyer",
    lockedAt: DC.D0,
  },
  {
    id: 10,
    legacyId: 4,
    isQuickResettable: false,
    description: () => `there are only ${formatInt(6)} 反问题尺寸. Dimension Boost ` +
      "and 反问题 银河系 costs are modified.",
    name: "Automated 方面促进",
    reward: "方面促进 Autobuyer",
    lockedAt: DC.D16,
  },
  {
    id: 11,
    legacyId: 12,
    isQuickResettable: true,
    description: () => `there is normal 问题 which rises once you have at least ${formatInt(1)} 2nd 反问题 ` +
      "尺寸. If it exceeds your 反问题, it will Dimension Boost without giving the bonus.",
    name: "Automated 反问题 银河系",
    reward: "反问题 银河系 Autobuyer",
    lockedAt: DC.D16,
  },
  {
    id: 12,
    legacyId: 7,
    isQuickResettable: false,
    description: () => `each Antimatter Dimension produces the Dimension ${formatInt(2)} tiers below it
      instead of ${formatInt(1)}. Both 1st and 2nd Dimensions produce antimatter.
      The 2nd, 4th, and 6th Dimensions are made stronger to compensate.`,
    name: "Automated 大嘎吱嘎吱",
    reward: "大嘎吱嘎吱 Autobuyer",
    lockedAt: DC.D16,
  }
];
