import { createApp } from 'vue'; // importa functia createApp din biblioteca Vue
import NewSite from './NewSite.vue'; // importeaza NewSite din acelasi folder
import PrimeVue from 'primevue/config';
import Rating from 'primevue/rating';

const app = createApp(NewSite); //creează o aplicație Vue cu NewSite.vue ca componentă principală
app.use(PrimeVue);
app.component('Rating', Rating);
app.mount('#newsite'); // monteaza aplicatia pe elementul html cu id-ul newsite
