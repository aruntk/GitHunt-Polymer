import gql from 'graphql-tag';

const VoteButtons = gql`
    fragment VoteButtons on Entry {
      score
      vote {
        vote_value
      }
    }
  `;
export default VoteButtons;
