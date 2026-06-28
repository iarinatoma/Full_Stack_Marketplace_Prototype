import { createApp } from 'vue';
import NewSite from './NewSite.vue';
import PrimeVue from 'primevue/config';
import Rating from 'primevue/rating';

const app = createApp(NewSite);
app.use(PrimeVue);
app.component('Rating', Rating);
app.mount('#newsite'); // monteaza vue pe elementul #newsite din html
