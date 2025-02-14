﻿import EnterCelestialsRaPet from "./EnterCelestialsRaPet.js";
import ModalWrapperChoice from "../ModalWrapperChoice.js";

export default {
  name: "EnterCelestialsModal",
  components: {
    ModalWrapperChoice,
    EnterCelestialsRaPet,
  },
  props: {
    number: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      laitelaFastest: 3600,
      teresaBestAM: new Decimal(),
      teresaRunMult: 0,
      effarigDone: false,
      effarigLayer: "",
      enslavedDone: false,
      laitelaTime: "",
    };
  },
  computed: {
    effects() {
      return GameDatabase.celestials.descriptions[this.number].effects().split("\n");
    },
    description() {
      const description = GameDatabase.celestials.descriptions[this.number].description;
      return description ? description() : "";
    },
    topLabel() {
      return `${this.name} 实际`;
    },
    message() {
      return `Perform a 实际 reset and enter ${this.name} 实际, in which:`;
    },
    extraLine() {
      switch (this.number) {
        case 0:
          return this.teresaBestAM.eq(1)
            ? `You have not unlocked the reward for 有一个's 实际 yet. Unlocking the reward requires
              purchasing the 实际 study and completing the 实际 for the first time.`
            : `Your highest Teresa completion was for ${format(this.teresaBestAM, 2, 2)} antimatter,
              gaining you a ${formatX(this.teresaRunMult, 2)} multiplier to Glyph Sacrifice power.`;
        case 1: return this.effarigDone
          ? "Effarig is completed!"
          : `You are currently on the ${this.effarigLayer} Layer.`;
        case 2: return this.enslavedDone
          ? "Have... we... not helped enough..."
          : "We... can help... Let us... help...";
        case 3: return "";
        case 4: return `Within Ra's Reality, some resources will generate Memory Chunks
          for Celestial Memories based on their amounts:`;
        case 5: return this.laitelaFastest >= 300
          ? "You have not completed Lai'tela at this tier."
          : `Your fastest completion on this tier is ${this.laitelaTime}.`;
        case 6: return "";
        default: throw new Error(`Attempted to start an Unknown Celestial in Celestial Modal Confirmation.`);
      }
    }
  },
  methods: {
    update() {
      this.teresaBestAM.copyFrom(player.celestials.teresa.bestRunAM);
      this.teresaRunMult = Teresa.runRewardMultiplier;
      const effarigStage = Effarig.currentStage;
      this.effarigDone = effarigStage === EFFARIG_STAGES.COMPLETED;
      this.effarigLayer = [null, "Infinity", "Eternity", "Reality"][effarigStage];
      this.enslavedDone = Enslaved.isCompleted;
      this.laitelaFastest = player.celestials.laitela.fastestCompletion;
      this.laitelaTime = TimeSpan.fromSeconds(this.laitelaFastest).toStringShort();
    },
    handleYesClick() {
      beginProcessReality(getRealityProps(true));
      switch (this.number) {
        case 0: return Teresa.initializeRun();
        case 1: return Effarig.initializeRun();
        case 2: return Enslaved.initializeRun();
        case 3: return V.initializeRun();
        case 4: return Ra.initializeRun();
        case 5: return Laitela.initializeRun();
        case 6: throw new Error(`Attempted to start Pelle through EnterCelestialsModal instead of ArmageddonModal`);
        default: throw new Error(`Attempted to start an Unknown Celestial in Celestial Modal Confirmation.`);
      }
    },
  },
  template: `
  <ModalWrapperChoice @confirm="handleYesClick">
    <template #header>
      {{ topLabel }}
    </template>
    <div
      class="c-modal-message__text"
      data-v-enter-celestials-modal
    >
      {{ message }}
      <br>
      <br>
      <div
        class="c-modal-celestial__run-effects"
        data-v-enter-celestials-modal
      >
        <div
          v-for="(effect, i) in effects"
          :key="i"
          class="c-modal-celestial__run-effects__line"
          data-v-enter-celestials-modal
        >
          <b v-if="effect.trim()">&bull;</b>
          <b>&nbsp;</b>
          {{ effect }}
        </div>
      </div>
      <div
        v-if="description"
        class="reality-description"
        data-v-enter-celestials-modal
      >
        <br><br>
        {{ description }}
      </div>
      <br><br>
      <div>
        {{ extraLine }}
      </div>
      <span v-if="number === 4">
        <EnterCelestialsRaPet
          v-for="id in 4"
          :key="id"
          :pet-id="id - 1"
        />
      </span>
    </div>
    <template #confirm-text>
      Begin
    </template>
  </ModalWrapperChoice>
  `
};