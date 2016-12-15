/* globals MorphBehavior */
import { PolymerApolloBehavior } from '../client';
import submitRepositoryMutation from '../model/new-entry';

class addNew {
  beforeRegister() {
    this.is = 'add-new';
    this.properties = Object.assign(this.properties, {
      currentUser: {
        type: Object,
        value: null,
      },
      value: String,
    });
  }
  get behaviors() {
    return [
      PolymerApolloBehavior,
      MorphBehavior,
    ];
  }
  addNew() {
    this.$apollo.mutate({
      mutation: submitRepositoryMutation,
      variables: {
        repoFullName: this.value,
      },
    }).then((data) => {
      // Result
      console.log(data); // eslint-disable-line no-console
    }).catch((error) => {
      // Error
      console.log(error); // eslint-disable-line no-console
    });
  }
}

Polymer(addNew);
