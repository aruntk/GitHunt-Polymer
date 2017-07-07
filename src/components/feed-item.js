import moment from 'moment';
import emoji from 'node-emoji';
import { PolymerApolloClass } from '../client';
import { voteMutation } from '../model/feed';

class FeedItem extends PolymerApolloClass {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  static get is() {
    return 'feed-item';
  }
  static get properties() {
    return {
      entry: Object,
    };
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
    }).then((data) => {
      // Result
      console.log(data); // eslint-disable-line no-console
      document.querySelector('feeds-page').toast('Successful.!');
    }).catch((error) => {
      // Error
      console.log(error); // eslint-disable-line no-console
      document.querySelector('feeds-page').toast(error.message);
    });
  }
  _returnFavClass(v, t) {
    return v !== parseInt(t, 10) ? '' : 'selected';
  }
  emojify(text) {
    return emoji.emojify(text);
  }
}
customElements.define('feed-item', FeedItem);
