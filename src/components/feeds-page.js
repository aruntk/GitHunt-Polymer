/* globals MorphBehavior */
import { PolymerApolloBehavior } from '../client';
import { feedQuery } from '../model/feed';
import './feed-item';
import './add-new';

class feedsPage {
  beforeRegister() {
    this.is = 'feeds-page';
    this.properties = Object.assign({}, this.properties, {
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
      },
      offset: {
        type: Number,
        value: 0,
      },
      limit: {
        type: Number,
        value: 5,
      },
    });
    this.observers = [
      'routeChange(route.path)',
    ];
  }
  get behaviors() {
    return [
      PolymerApolloBehavior,
    ];
  }
  get apollo() {
    return {
      feed: {
        query: feedQuery,
        options: 'getOptions(limit,routeData.type)',
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
  getOptions(limit, type) {
    const offset = 0;
    return {
      variables: {
        type,
        limit,
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
    const offset = parseInt(self.offset, 10);
    const limit = parseInt(self.limit, 10);
    const newOffset = offset + limit;
    self.$apollo.queries.feed.fetchMore({
      variables: {
        offset: newOffset,
      },
      updateQuery(prev, { fetchMoreResult }) {
        const ret = [...self.feed, ...fetchMoreResult.data.feed];
        return self.set('feed', ret);
      },
    })
      .then(() => {
        self.set('offset', newOffset);
        self.set('loading', false);
      });
  }
  login() {
    window.location.replace('/login/github');
  }
  logout() {
    window.location.replace('/logout');
  }
}
Polymer(feedsPage);
