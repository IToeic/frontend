const MenuItems = {
  Word: {
    label: "Word",
    subTabs: [
      {
        id: "WordStudy",
        label: "Daily Words",
        description: "하루에 다섯개씩 학습",
      },
      {
        id: "WordTest",
        label: "Review Test",
        description: "학습한 단어 시험",
      },
    ],
  },
  Test: {
    label: "WordPack",
    subTabs: [
      {
        id: "WordPackTest",
        label: "Mastery Test",
        description: "단어팩 시험",
      },
    ],
  },
  My: {
    label: "My",
    subTabs: [
      { id: "MyWord", label: "My words", description: "내 단어장" },
      {
        id: "IncorrectWord",
        label: "Incorrect words",
        description: "틀린 단어 모음",
      },
    ],
  },
};

export default MenuItems;
