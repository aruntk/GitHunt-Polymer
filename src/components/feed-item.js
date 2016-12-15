import moment from 'moment';

class feedItem {
  beforeRegister() {
    this.is = 'feed-item';
    this.properties = Object.assign({}, this.properties, {
      entry: Object,
    });
  }
  timeAgo(date) {
    return moment(date).fromNow();
  }
  voteToggle(e) {
    const fav = e.currentTarget;
    fav.selected = !fav.selected;
    fav.classList.toggle('liked');
    const icon = fav.selected ? 'favorite' : 'favorite-border';
    fav.setAttribute('icon', icon);
    // TODO toggle vote
  }
}
Polymer(feedItem);
