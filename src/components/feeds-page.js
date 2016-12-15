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
      type: {
        type: String,
        value: 'NEW',
      },
      limit: {
        type: Number,
        value: 5,
      },
      offset: {
        type: Number,
        value: 0,
      },
    });
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
        options: 'getOptions(type, limit, offset)',
        loadingKey: 'loading',
      },
    };
  }
  getOptions(type, limit, offset) {
    return {
      variables: {
        type,
        limit,
        offset,
      },
    };
  }
  loadMore() {
    // TODO load more
  }
  login() {
    // TODO login
  }
}
Polymer(feedsPage);
