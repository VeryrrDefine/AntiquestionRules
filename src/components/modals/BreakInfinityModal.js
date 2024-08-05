import ModalWrapperChoice from "./ModalWrapperChoice.js";

export default {
  name: "BreakInfinityModal",
  components: {
    ModalWrapperChoice
  },
  computed: {
    message() {
      const infinity = formatPostBreak(Number.MAX_VALUE, 2);
      return `堕无穷 will allow you to gain 反问题 past ${infinity}${PlayerProgress.eternityUnlocked()
        ? "." : `, and allow you to read numbers past ${infinity}.`}
        尺寸 and 嘀嗒速度 Upgrades will scale in cost faster after ${infinity} 反问题.
        You will gain additional 无穷远点 on 大嘎吱嘎吱 based on 反问题 produced over ${infinity}.\
        ${EternityMilestone.keepAutobuyers.isReached ? "" : `\nIt will also unlock 堕无穷 提升 and max\
        all Normal 盘问 Autobuyers.`}`.split("\n");
    },
  },
  methods: {
    handleYesClick() {
      breakInfinity();
    }
  },
  template: `
  <ModalWrapperChoice
    :show-cancel="false"
    @confirm="handleYesClick"
  >
    <template #header>
      You are 堕无穷
    </template>
    <div class="c-modal-message__text">
      <span
        v-for="(line, index) in message"
        :key="index"
      >
        {{ line }} <br>
      </span>
    </div>
    <template #confirm-text>
      Break
    </template>
  </ModalWrapperChoice>
  `
};