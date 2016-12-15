import gql from 'graphql-tag';
import VoteButtons from './vote-buttons';
import RepoInfo from './repo-info';

const FeedEntry = gql`
    fragment FeedEntry on Entry {
      id
      commentCount
      repository {
        full_name
        html_url
        owner {
          avatar_url
        }
      }
      ...VoteButtons
      ...RepoInfo
    }
    ${VoteButtons}
    ${RepoInfo}
  `;

export default FeedEntry;
