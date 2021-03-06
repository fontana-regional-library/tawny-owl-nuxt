const mutations = {
  addAuthorsToState: (state, authors) => {
    state.authors = authors;
  },

  addCallsToActionToState: (state, callsToAction) => { // eslint-disable-line
    state.callsToAction = callsToAction;
  },

  addCollectionToState(state, collection) {
    state.collection = collection; // eslint-disable-line
  },

  addFeaturedCollectionToState(state, featuredCollections) {
    state.featuredCollections = featuredCollections; // eslint-disable-line
  },

  addLocationsToState(state, locations) {
    state.locations = locations; // eslint-disable-line
  },

  addMoreContent(state, payload) {
    if(payload !== null){
      for (let i=0; i < payload.content.length; i++){
        const index = state[payload.contentType].findIndex(item => item.id === payload.content[i].id)
        if (index === -1){
          state[payload.contentType].push(payload.content[i]);
        }
      }
    }
  },

  addPagesToState(state, pages) {
    state.pages = pages; // eslint-disable-line
  },

  addPostsToState(state, posts) {
    state.posts = posts; // eslint-disable-line
  },

  addArticlesToState(state, articles) {
    state.articles = articles;
  },

  addEventToState(state, event) {
    state.events.push(event);
  },

  addEventsToState(state, events) {
    state.events = events;
  },

  addEventCount(state, eventCount) {
    state.eventCount = eventCount;
  },

  addMoreEvents(state, moreEvents){
    for (let i=0; i < moreEvents.length; i++) {
      const index = state.events.findIndex(event => event.id === moreEvents[i].id);
      if (index === -1) {
        state.events.push(moreEvents[i]);
      }
    }
  },

  addResourcesToState(state, resources) {
    state.resources = resources; // eslint-disable-line
  },

  addServiceToState(state, service) {
    state.services.push(service);
  },

  addServicesToState(state, services) {
    state.services = services; // eslint-disable-line
  },

  addMenuItemsToState(state, menuItems) {
    state.menuItems = menuItems;
  },

  addMoreContent(state, payload) {
    for (let i=0; i < payload.content.length; i++){
      const index = state[payload.contentType].findIndex(item => item.id === payload.content[i].id)
      if (index === -1){
        state[payload.contentType].push(payload.content[i]);
      }
    }
  },
};

export default mutations;
