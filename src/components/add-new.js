/* globals MorphMixin */
import { PolymerApolloClass } from '../client';
import submitRepositoryMutation from '../model/new-entry';

class AddNew extends MorphMixin(PolymerApolloClass) {
  static get is() {
    return 'add-new';
  }
  static get properties() {
    return {
      currentUser: {
        type: Object,
        value: null,
      },
      value: String,
    };
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
      document.querySelector('feeds-page').toast(`Repo ${this.value} successfully added.`);
    }).catch((error) => {
      // Error
      console.log(error); // eslint-disable-line no-console
      document.querySelector('feeds-page').toast(error.message);
    });
  }
}

customElements.define('add-new', AddNew);
