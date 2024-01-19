export const readOnlySelect = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, backgroundColor: "#D7D7D7" } : base;
  },
  // multiValueLabel: (base, state) => {
  //   return state.data.isFixed
  //     ? { ...base, fontWeight: "bold", color: "white", paddingRight: 6 }
  //     : base;
  // },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  }
};