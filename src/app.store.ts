import { asGlobalStore } from "shared/stores"

const createStore = () => ({
  year: localStorage.getItem("year") ? Number(localStorage.getItem("year")) : new Date().getUTCFullYear(),
  setYear(year: number) {
      if(year < 2015 || year > new Date().getUTCFullYear()) {
          return;
      }
      this.year = year;
      localStorage.setItem("year", year.toString());
  }
});

export const appGlobalStore = asGlobalStore(createStore())