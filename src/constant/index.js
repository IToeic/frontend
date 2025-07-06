const menuItems = {
  Word: {
    label: "Word",
    subTabs: [
      { id: "Study", label: "Study", description: "하루에 다섯개씩 학습" },
      { id: "Test", label: "Test", description: "학습한 단어 시험" },
    ],
  },
  Test: {
    label: "Test",
    subTabs: [{ id: "Test", label: "Test", description: "단어팩 시험" }],
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

export default menuItems;
