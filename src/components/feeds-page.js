/* globals MorphBehavior */
import gql from 'graphql-tag';
import { PolymerApolloBehavior } from '../client';
import './feed-item';
import './add-new';

const feed = gql`query Feed($type: FeedType!, $offset: Int, $limit: Int) {
    currentUser {
      login
    }
    feed(type: $type, offset: $offset, limit: $limit) {
    repository {
      owner {
        login
        avatar_url
      }
      name
      full_name
      stargazers_count
      html_url
      description
    }
    postedBy {
      login
      html_url
    }
}
}
`;
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
        query: feed,
        options: 'getOptions(routeData.*)',
        loadingKey: 'loading',
        success(r) {
          this.set('loading', r.loading);
        },
      },
    };
  }
  getOptions() {
    const route = this.routeData;
    const offset = parseInt(route.offset, 10);
    const limit = parseInt(route.limit, 10);

    return {
      variables: {
        type: route.type,
        limit,
        offset,
      },
    };
  }
  routeChange(p) {
    if (!p) {
      this.set('route.path', '/NEW/5/0');
    }
  }
  loadMore() {
    const self = this;
    self.set('loading', true);
    const offset = parseInt(self.routeData.offset, 10);
    const limit = parseInt(self.routeData.limit, 10);
    const newOffset = offset + limit;
    self.$apollo.queries.feed.fetchMore({
      variables: {
        offset: newOffset,
      },
      updateQuery(prev, { fetchMoreResult }) {
        const ret = [...prev.feed, ...fetchMoreResult.data.feed];
        return self.set('feed', ret);
      },
    })
      .then(() => {
        self.set('routeData.offset', newOffset);
        // self.set('routeData.limit', limit + 5);
        self.set('loading', false);
      });
    // TODO load more
  }
  login() {
    // TODO login
  }
}
Polymer(feedsPage);
