import AutobuyerBox from "./AutobuyerBox.js";
import AutobuyerInput from "./AutobuyerInput.js";
import AutobuyerIntervalButton from "./AutobuyerIntervalButton.js";

export default {
  name: "GalaxyAutobuyerBox",
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
      limitGalaxies: false,
      isBuyMaxUnlocked: false,
      buyMax: false
    };
  },
  computed: {
    autobuyer: () => Autobuyer.galaxy,
    limitGalaxiesSlot() {
      return this.hasMaxedInterval && !this.isBuyMaxUnlocked ? "intervalSlot" : "toggleSlot";
    }
  },
  watch: {
    limitGalaxies(newValue) {
      this.autobuyer.limitGalaxies = newValue;
    }
  },
  methods: {
    update() {
      this.hasMaxedInterval = this.autobuyer.hasMaxedInterval;
      this.isBuyMaxUnlocked = this.autobuyer.isBuyMaxUnlocked;
      this.limitGalaxies = this.autobuyer.limitGalaxies;
    }
  },
  template: `
  <AutobuyerBox
    :autobuyer="autobuyer"
    :is-modal="isModal"
    name="Automatic Antimatter Galaxies"
    :show-interval="!isBuyMaxUnlocked"
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
      <div class="c-autobuyer-box__small-text">
        Activates every X seconds:
      </div>
      <AutobuyerInput
        :autobuyer="autobuyer"
        type="float"
        property="buyMaxInterval"
      />
    </template>
    <template #[limitGalaxiesSlot]>
      <label
        class="o-autobuyer-toggle-checkbox c-autobuyer-box__small-text o-clickable"
        data-v-galaxy-autobuyer-box
      >
        <input
          v-model="limitGalaxies"
          type="checkbox"
          class="o-clickable"
          data-v-galaxy-autobuyer-box
        >
        Limit 反问题 银河系 to:
      </label>
      <AutobuyerInput
        :autobuyer="autobuyer"
        type="int"
        property="maxGalaxies"
      />
    </template>
  </AutobuyerBox>
  `
};