import { DC } from "../../constants.js";

export const infinityChallenges = [
  {
    id: 1,
    description: `all Normal 盘问 restrictions are active at once, with the exception of the
      嘀嗒速度 (C9) and 大嘎吱嘎吱 (C12) 盘问.`,
    goal: DC.E650,
    isQuickResettable: true,
    reward: {
      description: () => `${formatX(1.3, 1, 1)} on all 无穷提升 for each 无穷盘问 completed`,
      effect: () => Math.pow(1.3, InfinityChallenges.completed.length),
      formatEffect: value => formatX(value, 1, 1)
    },
    unlockAM: DC.E2000,
  },
  {
    id: 2,
    description: () => `尺寸牺牲 happens automatically every ${formatInt(400)} milliseconds once you have
      an 8th 反问题尺寸.`,
    goal: DC.E10500,
    isQuickResettable: false,
    reward: {
      description: () => `尺寸牺牲 autobuyer and stronger 尺寸牺牲
        ${Sacrifice.getSacrificeDescription({ "InfinityChallenge2isCompleted": false })} ➜
        ${Sacrifice.getSacrificeDescription({ "InfinityChallenge2isCompleted": true })}`,
    },
    unlockAM: DC.E11000,
  },
  {
    id: 3,
    description: () =>
      `嘀嗒速度 upgrades are always ${formatX(1)}. For every 嘀嗒速度 upgrade purchase, you instead get a static
      multiplier on all 反问题 尺寸 which increases based on 反问题银河系.`,
    goal: DC.E5000,
    isQuickResettable: false,
    effect: () => Decimal.pow(1.05 + (player.galaxies * 0.005), player.totalTickBought),
    formatEffect: value => formatX(value, 2, 2),
    reward: {
      description: `反问题尺寸 multiplier based on 反问题银河系 and 嘀嗒速度 purchases`,
      effect: () => (Laitela.continuumActive
        ? Decimal.pow(1.05 + (player.galaxies * 0.005), Tickspeed.continuumValue)
        : Decimal.pow(1.05 + (player.galaxies * 0.005), player.totalTickBought)),
      formatEffect: value => formatX(value, 2, 2),
    },
    unlockAM: DC.E12000,
  },
  {
    id: 4,
    description: () =>
      `only the latest bought 反问题 尺寸's production is normal. All other 反问题 尺寸
      produce less (${formatPow(0.25, 2, 2)}).`,
    goal: DC.E13000,
    isQuickResettable: true,
    effect: 0.25,
    reward: {
      description: () => `All 反问题 尺寸 multipliers become multiplier${formatPow(1.05, 2, 2)}`,
      effect: 1.05
    },
    unlockAM: DC.E14000,
  },
  {
    id: 5,
    description:
      `buying 反问题 尺寸 1-4 causes all cheaper 反尺 costs to increase.
      Buying 反问题 尺寸 5-8 causes all more expensive 反尺 costs to increase.`,
    goal: DC.E16500,
    isQuickResettable: true,
    reward: {
      description: () =>
        `All 银河系 are ${formatPercents(0.1)} stronger and reduce the requirements for them
        and 方面促进 by ${formatInt(1)}`,
      effect: 1.1
    },
    unlockAM: DC.E18000,
  },
  {
    id: 6,
    description: () =>
      `exponentially rising 问题 divides the multiplier on all of your 反问题 尺寸
      once you have at least ${formatInt(1)} 2钕 反问题 尺寸.`,
    goal: DC.D2E22222,
    isQuickResettable: true,
    effect: () => Currency.matter.value.clampMin(1),
    formatEffect: value => `/${format(value, 1, 2)}`,
    reward: {
      description: "无穷提升 multiplier based on 嘀嗒速度",
      effect: () => Tickspeed.perSecond.pow(0.0005),
      formatEffect: value => formatX(value, 2, 2)
    },
    unlockAM: DC.E22500,
  },
  {
    id: 7,
    description: () => {
      // Copied from DimBoost.power; this is the base amount before any multipliers. Post-eternity this isn't
      // necessarily 2.5x by the time the player sees this challenge; it's probably most accurate to say what it
      // currently is, and this phrasing avoids 10x ➜ 10x with the old description.
      const mult = Effects.max(
        2,
        InfinityUpgrade.dimboostMult,
        InfinityChallenge(7).reward,
        TimeStudy(81)
      );
      return `you cannot buy 反问题银河系. Base 方面促进 multiplier is increased to a maximum
        of ${formatX(10)}. (Current base multiplier: ${formatX(mult, 2, 1)})`;
    },
    goal: DC.E10000,
    isQuickResettable: false,
    effect: 10,
    reward: {
      description: () => `方面促进 multiplier is increased to a minimum of ${formatX(4)}`,
      effect: 4
    },
    unlockAM: DC.E23000,
  },
  {
    id: 8,
    description: () =>
      `AD production rapidly and continually drops over time. Purchasing 反问题尺寸 or 嘀嗒速度
        upgrades sets production back to ${formatPercents(1)} before it starts dropping again.`,
    goal: DC.E27000,
    isQuickResettable: true,
    effect: () => DC.D0_8446303389034288.pow(
      Math.max(0, player.records.thisInfinity.time - player.records.thisInfinity.lastBuyTime)),
    reward: {
      description:
        "You get a multiplier to 反尺 2-7 based on 1st and 8th AD multipliers.",
      effect: () => AntimatterDimension(1).multiplier.times(AntimatterDimension(8).multiplier).pow(0.02),
      formatEffect: value => formatX(value, 2, 2)
    },
    unlockAM: DC.E28000,
  },
];
