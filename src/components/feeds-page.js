/* globals MorphBehavior */
import { PolymerApolloClass } from '../client';
import { feedQuery } from '../model/feed';

class FeedsPage extends PolymerApolloClass{
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
    return 'feeds-page';
  }
  static get properties() {
    return {
      feed: {
        type: Array,
        value: [],
      },
      loading: Boolean,
      currentUser: {
        type: Object,
        value: null,
      },
      routeData: {
        type: Object,
        value: {
          type: 'NEW',
        },
      },
      offset: {
        type: Number,
        value: 0,
      },
      itemsPerPage: {
        type: Number,
        value: 5,
      },
    };
  }
  static get observers() {
    return [
      'routeChange(route.path)',
    ];
  }
  get apollo() {
    return {
      feed: {
        query: feedQuery,
        options: 'getOptions(itemsPerPage,routeData.type)',
        loadingKey: 'loading',
        success(r) {
          this.set('loading', r.loading);
        },
        error(e) {
          console.log(e); // eslint-disable-line no-console
        },
      },
    };
  }
  getOptions(itemsPerPage, type = 'NEW') {
    const offset = 0;
    return {
      variables: {
        type,
        limit: itemsPerPage,
        offset,
      },
    };
  }
  routeChange(p) {
    if (!p) {
      this.set('route.path', '/NEW');
    }
  }
  loadMore() {
    const self = this;
    self.set('loading', true);
    const offset = self.feed.length;
    self.$apollo.queries.feed.fetchMore({
      variables: {
        offset,
      },
      updateQuery(prev, { fetchMoreResult }) {
        if (!fetchMoreResult.data) {
          return prev;
        }
        return Object.assign({}, prev, {
          feed: [...prev.feed, ...fetchMoreResult.data.feed],
        });
      },
    })
      .then(() => {
        self.set('loading', false);
      });
  }
  login() {
    window.location.replace('/login/github');
  }
  logout() {
    window.location.replace('/logout');
  }
  toast(text) {
    if (text) {
      this.$.mainToast.hide();
      this.$.mainToast.text = text;
      Polymer.Async.timeOut.after(300).run(() => {
        this.$.mainToast.show();
      });
    }
  }
  displayInstalledToast() {
    this.$['caching-complete'].show();
  }
}
customElements.define('feeds-page', FeedsPage);
