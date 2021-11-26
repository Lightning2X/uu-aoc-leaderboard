export const tableLocalStore = () => ({
  page: 0,
  rowsPerPage: 10,
  setPage(page: number) {
    this.page = page;
  },
  setRowsPerPage(rowsPerPage: number) {
    this.rowsPerPage = rowsPerPage;
  },
});
