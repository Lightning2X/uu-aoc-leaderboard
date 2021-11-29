import { asGlobalStore } from "shared/stores"

const createStore = () => ({
  year: new Date().getUTCFullYear(),
  setYear(year: number) {
      if(year > new Date().getUTCFullYear()) {
          return;
      }
      this.year = year;
  }
});

export const appGlobalStore = asGlobalStore(createStore())