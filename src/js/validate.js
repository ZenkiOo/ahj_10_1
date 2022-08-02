export default class Validate {
  constructor(coord) {
    this.coord = coord;
  }

  check() {
    if (
      this.coord.search(
        /^(\[?-?)((\d|[0-8]\d?|90)\.\d{4,}), ?(-|−)?((\d|\d\d|1[0-7][0-9]|180)\.\d{4,})(\]?)$/
      ) !== -1
    ) {
      return true;
    }
    return false;
  }
}
