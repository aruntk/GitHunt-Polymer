class feedItem {
  beforeRegister() {
    this.is = 'feed-item';
    this.properties = Object.assign({}, this.properties, {
      entry: Object,
    });
  }
}
Polymer(feedItem);
