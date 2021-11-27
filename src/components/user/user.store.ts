export const userLocalStore = () => ({
  isLoading: false,
  isError: false,
  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  },
  setIsError(isError: boolean) {
    this.isError = isError;
  }, 
});
