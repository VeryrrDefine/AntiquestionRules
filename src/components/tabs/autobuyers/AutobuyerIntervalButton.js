export default {
  name: "AutobuyerIntervalButton",
  props: {
    autobuyer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      cost: 0,
      isMaxed: false,
      isUpgradeable: false,
      isAffordable: false
    };
  },
  computed: {
    classObject() {
      return {
        "o-autobuyer-btn": true,
        "l-autobuyer-box__button": true,
        "o-autobuyer-btn--unavailable": !this.isAffordable
      };
    }
  },
  methods: {
    update() {
      this.cost = this.autobuyer.cost;
      this.isMaxed = this.autobuyer.hasMaxedInterval;
      this.isUpgradeable = this.autobuyer.canBeUpgraded;
      this.isAffordable = Currency.infinityPoints.gte(this.cost);
    },
    upgradeInterval() {
      this.autobuyer.upgradeInterval();
    }
  },
  template: `
  <button
    v-if="!isMaxed && isUpgradeable"
    :class="classObject"
    @click="upgradeInterval"
  >
    {{ formatPercents(0.4) }} smaller 音程
    <br>
    需要: {{ format(cost, 2) }} 网络地址
  </button>
  <button
    v-else-if="!isMaxed"
    class="o-autobuyer-btn l-autobuyer-box__button o-autobuyer-btn--unavailable"
  >
    Complete the 盘问 to upgrade 音程
  </button>
  `
};