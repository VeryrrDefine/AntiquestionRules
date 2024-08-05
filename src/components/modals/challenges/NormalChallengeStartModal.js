import ModalWrapperChoice from "../ModalWrapperChoice.js";

export default {
  name: "NormalChallengeStartModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    challenge() {
      return NormalChallenge(this.id);
    },
    challengeIsCompleted() {
      return this.challenge.isCompleted;
    },
    message() {
      return `You will 大嘎吱嘎吱 (if possible) and start a new 无穷 within the 盘问 with all the
        盘问-specific 管制 and 修改 主动.
        To 通过 the 盘问${this.challengeIsCompleted ? "" : " 得到奖励♂"},
        you must reach 无穷 again.
        You do not start with any 方面促进 和 银河系, regardless of 提升.`;
    },
    entranceLabel() {
      return `You are about to enter 盘问 ${this.id}`;
    },
    reward() {
      return `The 奖励♂ for completing this 盘问 is: ${this.challenge._config.reward}`;
    },
    condition() {
      let conditionOfChallenge = this.challenge._config.description;
      if (typeof conditionOfChallenge === "function") {
        conditionOfChallenge = conditionOfChallenge();
      }
      return `Inside this Challenge, ${conditionOfChallenge}`;
    }
  },
  created() {
    this.on$(GAME_EVENT.ETERNITY_RESET_AFTER, this.emitClose);
    this.on$(GAME_EVENT.REALITY_RESET_AFTER, this.emitClose);
  },
  methods: {
    handleYesClick() {
      this.challenge.start();
    },
  },
  template: `
  <ModalWrapperChoice
    option="challenges"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ entranceLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
      <br><br>
      {{ condition }}
    </div>
    <div
      v-if="!challengeIsCompleted"
      class="c-modal-message__text"
    >
      <br>
      {{ reward }}
    </div>
    <template #confirm-text>
      Begin
    </template>
  </ModalWrapperChoice>
  `
};