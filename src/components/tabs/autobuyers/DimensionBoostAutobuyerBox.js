import AutobuyerBox from "./AutobuyerBox.js";
import AutobuyerInput from "./AutobuyerInput.js";
import AutobuyerIntervalButton from "./AutobuyerIntervalButton.js";

export default {
  name: "DimensionBoostAutobuyerBox",
  components: {
    AutobuyerBox,
    AutobuyerIntervalButton,
    AutobuyerInput
  },
  props: {
    isModal: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      hasMaxedInterval: false,
      limitDimBoosts: false,
      limitUntilGalaxies: false,
      isBuyMaxUnlocked: false
    };
  },
  computed: {
    autobuyer: () => Autobuyer.dimboost
  },
  watch: {
    limitDimBoosts(newValue) {
      this.autobuyer.limitDimBoosts = newValue;
    },
    limitUntilGalaxies(newValue) {
      this.autobuyer.limitUntilGalaxies = newValue;
    }
  },
  methods: {
    update() {
      const autobuyer = this.autobuyer;
      this.hasMaxedInterval = autobuyer.hasMaxedInterval;
      this.isBuyMaxUnlocked = autobuyer.isBuyMaxUnlocked;
      this.limitDimBoosts = autobuyer.limitDimBoosts;
      this.limitUntilGalaxies = autobuyer.limitUntilGalaxies;
    }
  },
  template: `
  <AutobuyerBox
    :autobuyer="autobuyer"
    :is-modal="isModal"
    :show-interval="!isBuyMaxUnlocked"
    name="Automatic Dimension Boosts"
  >
    <template
      v-if="!hasMaxedInterval"
      #intervalSlot
    >
      <AutobuyerIntervalButton :autobuyer="autobuyer" />
    </template>
    <template
      v-else-if="isBuyMaxUnlocked"
      #intervalSlot
    >
      <div
        class="c-autobuyer-box__small-text"
        data-v-dimension-boost-autobuyer-box
      >
        <br>
        主动 每 X 第二:
      </div>
      <AutobuyerInput
        :autobuyer="autobuyer"
        type="float"
        property="buyMaxInterval"
      />
    </template>
    <template
      v-if="!isBuyMaxUnlocked"
      #checkboxSlot
    >
      <label
        class="o-autobuyer-toggle-checkbox c-autobuyer-box__small-text l-top-margin o-clickable"
        data-v-dimension-boost-autobuyer-box
      >
        <input
          v-model="limitDimBoosts"
          type="checkbox"
          class="o-clickable"
          data-v-dimension-boost-autobuyer-box
        >
        限制 方面促进 to:
      </label>
      <AutobuyerInput
        :autobuyer="autobuyer"
        type="int"
        property="maxDimBoosts"
      />
    </template>
    <template #toggleSlot>
      <label
        class="o-autobuyer-toggle-checkbox c-autobuyer-box__small-text l-autobuyer-text-area o-clickable"
        data-v-dimension-boost-autobuyer-box
      >
        <input
          v-model="limitUntilGalaxies"
          type="checkbox"
          class="o-clickable"
          data-v-dimension-boost-autobuyer-box
        >
        <span v-if="isBuyMaxUnlocked">
          Only 方面促进 to unlock new<br>
          尺寸 until X 银河系:
        </span>
        <span v-else>
          银河系 required to always<br>
          方面促进, ignoring the limit:
        </span>
      </label>
      <AutobuyerInput
        :autobuyer="autobuyer"
        type="int"
        property="galaxies"
      />
    </template>
  </AutobuyerBox>
  `
};