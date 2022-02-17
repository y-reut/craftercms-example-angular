<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in navItems"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <AppFooter />
    </v-footer>
  </v-app>
</template>

<script>
import { crafterConf } from '@craftercms/classes';
import AppFooter from '../components/AppFooter';
import { getNav } from '../lib/api';

const siteName = process.env.NUXT_ENV_CRAFTERCMS_SITE_NAME;
if (typeof siteName === 'undefined') {
  throw new TypeError('The value of `NUXT_ENV_CRAFTERCMS_SITE_NAME` is not defined. Did you create a `.env` file and declare the `NUXT_ENV_CRAFTERCMS_SITE_NAME` variable?');
} else if (siteName === '') {
  throw new TypeError('The site name value of is blank. Set `NUXT_ENV_CRAFTERCMS_SITE_NAME=YOUR_SITE_NAME` in your .env file.');
}

crafterConf.configure({
  baseUrl: process.env.NUXT_ENV_CRAFTERCMS_HOST_NAME ?? '',
  site: siteName,
  cors: true,
});

const ICON_MAP = {
  'about': 'mdi-information-outline',
  'blog': 'mdi-blogger',
  'contact': 'mdi-email-outline',
  'home': 'mdi-home-outline',
  'products': 'mdi-cube-outline',
  'services': 'mdi-wrench-outline',
};

export default {
  name: 'DefaultLayout',
  components: {
    AppFooter
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      navItems: [],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'CrafterCMS + NuxtJS',
    }
  },
  async fetch() {
    const nav = await getNav();
    if (nav) {
      this.navItems = nav.map(item => ({
        icon: ICON_MAP[item.url.replace('/', '')] ?? ICON_MAP.home,
        title: item.label,
        to: item.url,
      }));
    }
  },
}
</script>
