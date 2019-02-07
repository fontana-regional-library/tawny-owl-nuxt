import Vuex from 'vuex';
import axios from 'axios';
import actions from './actions';
import mutations from './mutations';
const urls = {
  authors: 'https://fontana.librarians.design/wp-json/wp/v2/users?',
  callsToAction: 'https://fontana.librarians.design/wp-json/wp/v2/calls-to-action?',
  collection: 'https://fontana.librarians.design/wp-json/wp/v2/collection?',
  featuredCollections: 'https://fontana.librarians.design/wp-json/wp/v2/featured-collections?',
  locations: 'https://fontana.librarians.design/wp-json/wp/v2/locations?',
  pages: 'https://fontana.librarians.design/wp-json/wp/v2/pages?',
  posts: 'https://public-api.wordpress.com/rest/v1.1/sites/fontanalib.wordpress.com/posts/?number=10',
  articles: 'https://fontana.librarians.design/wp-json/wp/v2/posts?',
  resources: 'https://fontana.librarians.design/wp-json/wp/v2/resources?',
  services: 'https://fontana.librarians.design/wp-json/wp/v2/services?per_page=50',
  events: 'https://fontana.librarians.design/wp-json/wp/v2/events?',
};
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
      articles: [],
      resources: [],
      services: [],
      menuItems: [],      
    },

    actions,

    getters: {
      getAuthorById: state => authorId => state.authors.find(author => author.id === 2),

      getCallsToActionByCategory: state => (categoryName) => {
        const actionsByService = state.callsToAction.filter(
          call => // eslint-disable-line no-confusing-arrow
            call.acf.services
              ? call.acf.services.some(service => service.slug === categoryName)
              : [],
        );

        return actionsByService;
      },

      getContentByService: state => (contentType, serviceName = null, locationName = null) => {
        let contents;
        let contentsFilteredByService = [];
  
        if (locationName && locationName !== 'all') {
          contents = state[contentType].filter(
            page => page.acf.location.some(location => location.slug === locationName)
          );
        } else {
          contents = state[contentType];
        }
        
        if (serviceName && serviceName !== 'any' && contents) {
          contents.forEach(function(content){
            if (content.acf.services != null && content.acf.services !== false){ 
            contentsFilteredByService.push(content);
            }
          });
          contentsFilteredByService = contentsFilteredByService.filter(
            page => page.acf.services.some(service => service.slug === serviceName)
          );
        }
        return serviceName ? contentsFilteredByService : contents;
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
