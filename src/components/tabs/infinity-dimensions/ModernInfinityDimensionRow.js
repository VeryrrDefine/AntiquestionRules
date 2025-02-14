﻿import GenericDimensionRowText from "../../GenericDimensionRowText.js";
import PrimaryButton from "../../PrimaryButton.js";
import PrimaryToggleButton from "../../PrimaryToggleButton.js";

export default {
  name: "ModernInfinityDimensionRow",
  components: {
    GenericDimensionRowText,
    PrimaryButton,
    PrimaryToggleButton
  },
  props: {
    tier: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      hasPrevTier: false,
      isUnlocked: false,
      canUnlock: false,
      multiplier: new Decimal(0),
      baseAmount: 0,
      amount: new Decimal(0),
      purchases: 0,
      rateOfChange: new Decimal(0),
      isAutobuyerUnlocked: false,
      cost: new Decimal(0),
      isAvailableForPurchase: false,
      isCapped: false,
      capIP: new Decimal(0),
      isAutobuyerOn: false,
      isEC8Running: false,
      hardcap: InfinityDimensions.HARDCAP_PURCHASES,
      eternityReached: false,
      enslavedRunning: false,
    };
  },
  computed: {
    shiftDown() {
      return ui.view.shiftDown;
    },
    name() {
      return `${InfinityDimension(this.tier).shortDisplayName} 无穷提升`;
    },
    costDisplay() {
      if (this.isUnlocked || this.shiftDown) {
        if (this.isCapped) return "已达到帽";
        return this.showCostTitle ? `需要: ${format(this.cost)} 网络地址` : `${format(this.cost)} 网络地址`;
      }

      if (this.canUnlock) {
        return "Unlock";
      }

      return `Reach 上午 ${formatPostBreak(InfinityDimension(this.tier).amRequirement)}`;
    },
    hasLongText() {
      return this.costDisplay.length > 15;
    },
    capTooltip() {
      if (this.enslavedRunning) return `Nameless prevents the purchase of more than ${format(10)} 无穷提升`;
      if (this.isCapped) return `帽 reached at ${format(this.capIP)} 网络地址`;
      return `Purchased ${quantifyInt("time", this.purchases)}`;
    },
    showRow() {
      return this.eternityReached || this.isUnlocked || this.canUnlock || this.amount.gt(0) ||
        this.hasPrevTier;
    },
    showCostTitle() {
      return this.cost.exponent < 1e6;
    }
  },
  watch: {
    isAutobuyerOn(newValue) {
      Autobuyer.infinityDimension(this.tier).isActive = newValue;
    }
  },
  methods: {
    update() {
      const tier = this.tier;
      const dimension = InfinityDimension(tier);
      this.hasPrevTier = tier === 1 || InfinityDimension(tier - 1).isUnlocked;
      this.isUnlocked = dimension.isUnlocked;
      this.canUnlock = dimension.canUnlock;
      this.multiplier.copyFrom(dimension.multiplier);
      this.baseAmount = dimension.baseAmount;
      this.purchases = dimension.purchases;
      this.amount.copyFrom(dimension.amount);
      this.rateOfChange.copyFrom(dimension.rateOfChange);
      this.isAutobuyerUnlocked = Autobuyer.infinityDimension(tier).isUnlocked;
      this.cost.copyFrom(dimension.cost);
      this.isAvailableForPurchase = dimension.isAvailableForPurchase;
      this.isCapped = dimension.isCapped;
      if (this.isCapped) {
        this.capIP.copyFrom(dimension.hardcapIPAmount);
        this.hardcap = dimension.purchaseCap;
      }
      this.isEC8Running = EternityChallenge(8).isRunning;
      this.isAutobuyerOn = Autobuyer.infinityDimension(tier).isActive;
      this.eternityReached = PlayerProgress.eternityUnlocked();
      this.enslavedRunning = Enslaved.isRunning;
    },
    buySingleInfinityDimension() {
      InfinityDimension(this.tier).buySingle();
    },
    buyMaxInfinityDimension() {
      InfinityDimension(this.tier).buyMax(false);
    },
  },
  template: `
  <div
    v-show="showRow"
    class="c-dimension-row l-dimension-row-infinity-dim l-dimension-single-row"
    :class="{ 'c-dim-row--not-reached': !isUnlocked && !canUnlock }"
  >
    <GenericDimensionRowText
      :tier="tier"
      :name="name"
      :multiplier-text="formatX(multiplier, 2, 1)"
      :amount-text="format(amount, 2)"
      :rate="rateOfChange"
    />
    <div
      class="l-dim-row-multi-button-container c-modern-dim-tooltip-container"
      data-v-modern-infinity-dimension-row
    >
      <div
        class="c-modern-dim-purchase-count-tooltip"
        data-v-modern-infinity-dimension-row
      >
        {{ capTooltip }}
      </div>
      <PrimaryButton
        :enabled="isAvailableForPurchase || (!isUnlocked && canUnlock)"
        class="o-primary-btn--buy-id o-primary-btn o-primary-btn--new o-primary-btn--buy-dim"
        :class="{ 'l-dim-row-small-text': hasLongText }"
        @click="buySingleInfinityDimension"
      >
        {{ costDisplay }}
      </PrimaryButton>
      <PrimaryToggleButton
        v-if="isAutobuyerUnlocked && !isEC8Running"
        v-model="isAutobuyerOn"
        class="o-primary-btn--id-auto"
        label="Auto:"
      />
      <PrimaryButton
        v-else
        :enabled="isAvailableForPurchase"
        class="o-primary-btn--id-auto"
        @click="buyMaxInfinityDimension"
      >
        买 最大
      </PrimaryButton>
    </div>
  </div>
  `
};