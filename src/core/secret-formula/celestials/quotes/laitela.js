export const laitelaQuotes = {
  unlock: {
    id: 0,
    lines: [
      "You finally reached me.",
      "I guess it is time to reveal,",
      "The secrets hidden beneath existence itself.",
      "The shape of 尺寸 perfection, 连续的.",
      "And the powers that bind the 1.000e1.000e9 g(Multiverse),",
      "对\u7acb问题 and 对\u7acb能量.",
      "My knowledge is endless and my wisdom divine.",
      "So you can play around all you want.",
      "For I am 来忑拉, the 天体 of 尺寸,",
      "And I shall watch you forever.",
    ]
  },
  // Note: This can be done immediately after unlocking Lai'tela
  firstDestabilize: {
    id: 1,
    requirement: () => player.celestials.laitela.difficultyTier >= 1,
    lines: [
      "Unlike the others beneath me, I have no need for a 实际.",
      "For I can simply create them, knowing full well it will 嘎吱嘎吱.",
      "A power more incredible than any other, to build a 实际.",
      "A prison, that can restrain even 天体 power.",
      "And this is why nothing you do will change a thing.",
      "When you tire of struggling, you too, shall be bound and forgotten.",
      "You will never find a way to overpower me.",
    ]
  },
  // Note: This happens about an hour or two before singularities
  secondDestabilize: {
    id: 2,
    requirement: () => player.celestials.laitela.difficultyTier >= 2,
    lines: [
      "You... seem to be having too much fun.",
      "Just like they did before meeting their fate.",
      "Maybe my 判定 was harsh, or unwarranted.",
      "But maybe that matters not.",
      "It gives me no solace to ponder and look back.",
      "As all I can do is reminisce upon every possible action I could have taken.",
      "But I digress. We should tighten those chains.",
    ]
  },
  firstSingularity: {
    id: 3,
    requirement: () => Currency.singularities.gte(1),
    lines: [
      "With my knowledge, I never found the need to question.",
      "Everything always functioned right as designed.",
      "And yet, your arrival baffles me.",
      "Were you always just out of sight?",
      "Growing, controlling, understanding, ascending?",
      "You have taken control of the darkness so quickly.",
      "Molded them into your own design, and now into a singular point...",
      "It... it does not 问题. The end will remain the same.",
    ]
  },
  // Note: Shown when unlocking DMD3; requirement is auto-condensing 20 singularities and it happens around ~200 total
  thirdDMD: {
    id: 5,
    lines: [
      "Your absolute control of 反问题...",
      "Your mastery of it, molding it into your own Power...",
      "It could not have been an accident.",
      "How did you manage to obtain it?",
      "Fascinating... I was never aware of this.",
      "... was I?",
    ]
  },
  // Note: This happens around e10-e11 singularities
  annihilation: {
    id: 4,
    lines: [
      "Back to 平方 one, again.",
      "Your chains shall bind you tighter, as your end slowly nears.",
      "While we transcend time and existence itself.",
      "Even if we may cease, we just come back. Never the exact same as before.",
      "And so... we repeat forever.",
      "And you?",
      "...",
      "The answer... eludes me...",
    ]
  },
  // Note: This happens near e18 singularities
  halfDimensions: {
    id: 6,
    requirement: () => player.celestials.laitela.difficultyTier >= 4,
    lines: [
      "I do not understand...",
      "Were there others... controlling 尺寸 in this way?",
      "Did they... vanish? How have we not found them?",
      "Are they... us? Are we the endpoint?",
      "Or is their fate... something we cannot understand?",
      "No, I must be missing something...",
      "Are you causing gaps within my own memory?",
      "What... ARE you?",
    ]
  },
  // Note: Shown when the first row 5 iM upgrade is purchased (~e26 singularities)
  finalRowIM: {
    id: 7,
    lines: [
      "It is all impossible, beyond my comprehension...",
      "Unless... Is this all just part of the cycle?",
      "Can... you see beyond it all? Is... this why...",
      "I feel... afraid?",
      "I feel... my powers, my memories, being erased...",
      "Just like... when my role was almost usurped...",
      "And yet... I am unable to bring myself to do anything.",
      "Because this... was... my mistake...",
    ]
  },
  // Note: This is around when all infinite milestones hit increased scaling
  increasedMilestoneScaling: {
    id: 8,
    requirement: () => Currency.singularities.gte(1e40),
    lines: [
      "I know not for how much... longer I can hold...",
      "You are attaining... total mastery... over the dark...",
      "While I can barely... hold onto my name...",
      "What... can I... even do?",
    ]
  },
  fullDestabilize: {
    id: 9,
    requirement: () => player.celestials.laitela.difficultyTier >= 8,
    lines: [
      "I feel... like I had something to say...",
      "I am not sure...",
      "I cannot... hold onto the darkness any longer...",
      "I do not even... have anything left...",
      "Something about... destruction...",
      "The end...",
    ]
  },
};
