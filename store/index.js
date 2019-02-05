import Vuex from 'vuex';
import axios from 'axios';
import actions from './actions';
import mutations from './mutations';

const createStore = () => {
  return new Vuex.Store({
    state: {
      authors: [],
      callsToAction: [],
      collection: [],
      eventCount: 0,
      events: [],
      featuredCollections: [],
      locations: [],
      menu: [],
      pages: [],
      posts: [],
      resources: [],
      services: [],
    },

    actions,

    getters: {
      getAuthorById: state => authorId => state.authors.find(author => author.id === authorId),

      getCallsToActionByCategory: state => (categoryName) => {
        const actionsByService = state.callsToAction.filter(
          call => // eslint-disable-line no-confusing-arrow
            call.acf.services
              ? call.acf.services.some(service => service.slug === categoryName)
              : [],
        );

        return actionsByService;
      },

      getContentByService: state => (
        contentType,
        serviceName = 'any',
        locationName = null,
      ) => {
        let contentFilteredByLocation;
        let contentByService;

        if (serviceName === 'any') {
          contentByService = state[`${contentType}`];
        } else {
          contentByService = state[`${contentType}`].filter(
            call => // eslint-disable-line no-confusing-arrow
              call.acf.services
                ? call.acf.services.some(service => service.slug === serviceName)
                : [],
          );
        }

        if (locationName && locationName !== 'all') {
          contentFilteredByLocation = contentByService.filter(
            content => // eslint-disable-line no-confusing-arrow
              content.acf.location
                ? content.acf.location.some(
                location => location.slug === locationName,
                )
                : [],
          );
        }
        return locationName && locationName !== 'all' ? contentFilteredByLocation : contentByService;
      },

      getEventCount: state => () => {
        return Number(state.eventCount);
      },

      getEvents: state => (dateString = null, locationName = null) => {
        let events;
        let eventsFilteredByLocation;

        if (dateString) {
          events = state.events.filter(
            event =>
              `${event.start_date_details.year}-${
                event.start_date_details.month
                }-${event.start_date_details.day}` === dateString,
          );
        } else {
          events = state.events;
        }

        if (locationName && locationName !== 'all') {
          eventsFilteredByLocation = events.filter(
            event => event.acf.location.some( location => location.slug === locationName)
          );
        }

        return locationName && locationName !== 'all' ? eventsFilteredByLocation : events;
      },

      getEventsCount: state => () => {
        return Number(state.eventCount);
      },

      getEventBySlug: state => (slug) => {
        return state.events.find(event => event.slug === slug);
      },

      /**
       * We can use `getRandomContentItem(services)` -- for example -- to return
       * a random service.
       */
      getRandomContentItem: state => (contentType) => {
        const content = state[contentType];
        return content[Math.floor(Math.random() * content.length)];
      },

      getMoreContent({commit}, serviceQuery) {
        return new Promise(resolve => {
          axios
            .get(urls[serviceQuery.contentType] + serviceQuery.urlParams)
            .then(({data}) => {
              let payload = {'content': data, 'contentType': serviceQuery.contentType};
              commit("addMoreContent", payload);
              resolve();
            });
        });
      },

      getSiteContent: state => () => { // eslint-disable-line
        return [
          ...state.collection,
          ...state.events,
          ...state.pages,
          ...state.posts,
          ...state.services,
        ];
      },

      getServiceBySlug: state => slug => state.services.find(service => service.slug === slug),
    },

    mutations,
  })
};

export default createStore;
