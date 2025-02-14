﻿import ModalWrapperChoice from "../ModalWrapperChoice.js";

export default {
  name: "DimensionBoostModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    bulk: {
      type: Boolean,
      required: true,
    }
  },
  computed: {
    topLabel() {
      return `You are about to do a 方面促进 Reset`;
    },
    message() {
      const keepDimensions = Perk.antimatterNoReset.canBeApplied || Achievement(111).canBeApplied ||
        PelleUpgrade.dimBoostResetsNothing.isBought
        ? `not actually reset anything due to an upgrade you have which prevents 反问题 and 反问题尺寸
          from being reset in this situation. You will still gain the multiplier from the Boost, as usual.`
        : `reset your 反问题 and 反问题尺寸. Are you sure you want to do this?`;

      return `This will ${keepDimensions}`;
    },
  },
  methods: {
    handleYesClick() {
      requestDimensionBoost(this.bulk);
      EventHub.ui.offAll(this);
    }
  },
  template: `
  <ModalWrapperChoice
    option="dimensionBoost"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
    </div>
  </ModalWrapperChoice>
  `
};