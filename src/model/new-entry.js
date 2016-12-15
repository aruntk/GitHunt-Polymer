import gql from 'graphql-tag';

const submitRepositoryMutation = gql`
  mutation submitRepository($repoFullName: String!) {
    submitRepository(repoFullName: $repoFullName) {
      createdAt
    }
  }
`;
export default submitRepositoryMutation;
