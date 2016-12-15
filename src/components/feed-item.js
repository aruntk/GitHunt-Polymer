import moment from 'moment';
import emoji from 'node-emoji';
import { PolymerApolloBehavior } from '../client';
import { voteMutation } from '../model/feed';

class feedItem {
  beforeRegister() {
    this.is = 'feed-item';
    this.properties = Object.assign({}, this.properties, {
      entry: Object,
    });
  }
  get behaviors() {
    return [
      PolymerApolloBehavior,
    ];
  }
  timeAgo(date) {
    return moment(date).fromNow();
  }
  voteUp() {
    const types = {
      '-1': 'UP',
      1: 'CANCEL',
      0: 'UP',
    };
    this.mutate(types);
  }
  voteDown() {
    const types = {
      '-1': 'CANCEL',
      1: 'DOWN',
      0: 'DOWN',
    };
    this.mutate(types);
  }
  mutate(types) {
    const type = types[this.entry.vote.vote_value];
    this.$apollo.mutate({
      mutation: voteMutation,
      variables: {
        repoFullName: this.entry.repository.full_name,
        type,
      },
    });
  }
  _returnFavClass(v, t) {
    return v !== parseInt(t, 10) ? '' : 'selected';
  }
  emojify(text) {
    return emoji.emojify(text);
  }
}
Polymer(feedItem);
