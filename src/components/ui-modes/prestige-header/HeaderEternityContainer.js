import EternityButton from "./EternityButton.js";
import UnlockInfinityDimButton from "./UnlockInfinityDimButton.js";

export default {
  name: "HeaderEternityContainer",
  components: {
    EternityButton,
    UnlockInfinityDimButton,
  },
  data() {
    return {
      showContainer: false,
      showEP: false,
      showNextEP: false,
      eternityPoints: new Decimal(0),
      nextEP: new Decimal(0),
    };
  },
  methods: {
    update() {
      this.showContainer = player.break || PlayerProgress.eternityUnlocked();
      this.showEP = PlayerProgress.eternityUnlocked();
      this.eternityPoints.copyFrom(Currency.eternityPoints.value.floor());
      this.showNextEP = Player.canEternity && player.records.thisReality.maxEP.lt(100) &&
        gainedEternityPoints().lt(100);
      if (this.showNextEP) this.nextEP.copyFrom(requiredIPForEP(gainedEternityPoints().floor().toNumber() + 1));
    },
  },
  template: `
  <div
    v-if="showContainer"
    class="c-prestige-button-container"
  >
    <div
      v-if="showEP"
      class="c-eternity-points"
      data-v-header-eternity-container
    >
      You have
      <span class="c-game-header__ep-amount">{{ format(eternityPoints, 2) }}</span>
      {{ pluralize("永远指画", eternityPoints) }}.
      <span v-if="showNextEP">(Next 小型专辑 at {{ format(nextEP, 1) }} 网络地址)</span>
    </div>
    <UnlockInfinityDimButton />
    <EternityButton />
  </div>
  `
};