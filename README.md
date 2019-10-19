# Vue SoundCloud
This is a simple Soundcloud client built with [Vue.js](https://vuejs.org) and [Nuxt.js](https://nuxtjs.org). 

<br />

## Live demo:
**[https://vue-soundcloud.herokuapp.com](https://vue-soundcloud.herokuapp.com)**


<br />

## Screenshots:
#### Desktop view:
<p align="center">
  <img src="http://i.imgur.com/gI1S0Ct.png" width="100%" />
</p>

#### Responsive view:
<p align="left">
  <img src="http://i.imgur.com/pYKI0MI.png" width="270px" />
  <img src="http://i.imgur.com/dKQr8ul.png" width="270px" />
  <img src="http://i.imgur.com/6sctBZi.png" width="270px" />
</p>

<br />

## Features:
* Server-side rendering with Nuxt.js.
* Load data from SoundCloud API.
* The home page included infinite scroll tracks and search tracks.
* The tracks page included related tracks and track comments.
* The profile page included the user's tracks and followers.
* And so on...

<br />

## This project implemented by the following technologies:
* [Vue](https://github.com/vuejs/vue)
* [Nuxt](https://github.com/nuxt/nuxt.js)
* [Vuex](https://github.com/vuejs/vuex)
* [Element](https://github.com/ElemeFE/element)
* [Howler](https://github.com/goldfire/howler.js)
* [Axios](https://github.com/axios/axios)
* And so on...

<br />

## Let's run:

#### Clone the project:
```bash
$ git clone https://github.com/soroushchehresa/vue-soundcloud.git vue-soundcloud
```

#### Starting Development:

Run one of the following commands:
```bash
$ yarn && yarn dev

# OR

$ npm i && npm run dev
```

#### Build for production:
Run one of the following commands:
```bash
$ yarn && yarn build && yarn start

# OR

$ npm i && npm run build && npm start
```

<br />

## NOTE:
It seems that SoundCloud has revoked my api client keys without any explanation or warning. Running the app locally no longer works unless you have a working SoundCloud API client id (SoundCloud has disabled registration of new apps for quite some time now). The [live demo](https://vue-soundcloud.herokuapp.com) is also not working at the moment.

<br />

## Support:
<a href="https://www.patreon.com/soroushchehresa">
	<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>
