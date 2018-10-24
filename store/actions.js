import axios from "axios/index";

const actions = {
  async getAuthors({ commit }) {
    const { data } = await axios.get('https://fontana.librarians.design/wp-json/wp/v2/users');
    commit('addAuthorsToState', data);
  },

  async getCallsToAction({ commit }) {
    const { data } = await axios.get('https://fontana.librarians.design/wp-json/wp/v2/calls-to-action');
    commit('addCallsToActionToState', data);
  },

  getCollection({ commit }) {
    return new Promise((resolve) => {
      axios
        .get('https://fontana.librarians.design/wp-json/wp/v2/collection')
        .then(({ data }) => {
          commit('addCollectionToState', data);
          resolve();
        });
    });
  },

  getFeaturedCollections({ commit }) {
    return new Promise((resolve) => {
      axios.get('https://fontana.librarians.design/wp-json/wp/v2/featured-collection')
        .then(({ data }) => {
          commit('addFeaturedCollectionToState', data);
          resolve();
        });
    });
  },

  getLocations({ commit }) {
    return new Promise((resolve) => {
      axios
        .get('https://fontana.librarians.design/wp-json/wp/v2/locations')
        .then(({ data }) => {
          commit('addLocationsToState', data);
          resolve();
        });
    });
  },

  getPages({ commit }) {
    return new Promise((resolve) => {
      axios
        .get('https://fontana.librarians.design/wp-json/wp/v2/pages')
        .then(({ data }) => {
          commit('addPagesToState', data);
          resolve();
        });
    });
  },

  getPosts({ commit }) {
    return new Promise((resolve) => {
      axios
        .get(
          'https://public-api.wordpress.com/rest/v1.1/sites/fontanalib.wordpress.com/posts/?number=10',
        )
        .then(({ data }) => {
          commit('addPostsToState', data.posts);
          resolve();
        });
    });
  },

  getResources({ commit }) {
    return new Promise((resolve) => {
      axios
        .get('https://fontana.librarians.design/wp-json/wp/v2/resources')
        .then(({ data }) => {
          commit('addResourcesToState', data);
          resolve();
        });
    });
  },

  getServices({ commit }) {
    return new Promise((resolve) => {
      axios
        .get('https://fontana.librarians.design/wp-json/wp/v2/services')
        .then(({ data }) => {
          commit('addServicesToState', data);
          resolve();
        });
    });
  },

  async getUpcomingEvents({ commit }) {
    const { data } = await axios.get('https://fontana.librarians.design/wp-json/tribe/events/v1/events');
    commit('addEventsToState', data.events);
  },
};

export default actions;