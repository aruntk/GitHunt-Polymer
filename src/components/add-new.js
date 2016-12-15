/* globals MorphBehavior */
import gql from 'graphql-tag';
import { PolymerApolloBehavior } from '../client';

const SUBMIT_RESPOSITORY_MUTATION = gql`
  mutation submitRepository($repoFullName: String!) {
    submitRepository(repoFullName: $repoFullName) {
      createdAt
    }
  }
`;

class addNew {
  beforeRegister() {
    this.is = 'add-new';
    this.properties = Object.assign(this.properties, {
      currentUser: {
        type: Object,
        value: null,
      },
    });
  }
  get behaviors() {
    return [
      PolymerApolloBehavior,
      MorphBehavior,
    ];
  }
  addNew() {
    // TODO add New
  }
}

Polymer(addNew);
