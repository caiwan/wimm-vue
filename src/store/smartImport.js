import io from '@/services/io';

export default {
  namespaced: true,
  state: {
    isImporting: false,
    importResponse: {}
  },
  getters: {
    importError: state => state.importResponse.error,
    importCount: state => state.importResponse.imported
  },
  mutations: {
    setProperty: (state, {
      key,
      value
    }) => state[key] = value,

    hideUi: state => {
      state.importResponse = {};
    }
  },
  actions: {
    setProperty: ({
      commit
    }, model) => commit('setProperty', model),

    async doImport({
      commit
    }, file) {
      commit('setProperty', {
        key: 'isImporting',
        value: true
      });

      try {
        const model = await io.smartimport.addFromFile(file);

        commit('setProperty', {
          key: 'importResponse',
          value: model
        });
      } finally {
        commit('setProperty', {
          key: 'isImporting',
          value: false
        });
      }
    },

    hideUi({
      commit
    }) {
      commit('hideUi')
    }
  }
}
