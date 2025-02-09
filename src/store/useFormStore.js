import create from "zustand";
import { persist, devtools } from "zustand/middleware";
import { globalStorePersist, storeVersion } from "./config";

let store = (set, get) => ({
  labFormName: [],
  selectedDiseaseArea: null,

  populateLabFormName: (payload) => {
    const currentLabFormName1 = get().labFormName;
    const tempArray = [...currentLabFormName1, payload]
    const uniqueArray = [...new Set(tempArray)];

    set((state) => ({ labFormName: uniqueArray }));
  },

  expungeFormName: (nameToRemove) => {
    const currentLabFormName2 = get().labFormName;
    const newArray = currentLabFormName2.filter((item) => item !== nameToRemove);
    const uniqueArray = [...new Set(newArray)];
    set((state) => ({ labFormName: uniqueArray }));
  },

  setDiseaseProgramName: (diseaseName) => {
    set((state) => ({selectedDiseaseArea: diseaseName }));
  },

  reset: () => {
    set((state) => ({ labFormName: [], selectedDiseaseArea: null }));
  },
});

store = devtools(store);
store = persist(store, {
  name: globalStorePersist,
  version: storeVersion,
});

const useFormStore = create(store);

export default useFormStore;
