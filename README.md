# Vue SoundCloud
This is a simple [SoundCloud](https://soundcloud.com) client that built with [Vue.js](https://vuejs.org) and [Nuxt.js](https://nuxtjs.org). 

## Live demo:
**[https://vue-soundcloud.herokuapp.com](https://vue-soundcloud.herokuapp.com)**


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


## Features:
* Server-side rendering with [Nuxt.js](https://nuxtjs.org).
* Load data from [SoundCloud API](https://developers.soundcloud.com/docs/api/guide).
* The home page included loading more tracks with infinite scroll and search tracks form.
* The track page included related tracks ,track comments and showing track wave.
* The profile page included the user tracks and user followers.
* And so on...


## This project implemented by the following technologies:
* [Vue](https://github.com/vuejs/vue)
* [Nuxt](https://github.com/nuxt/nuxt.js)
* [Vuex](https://github.com/vuejs/vuex)
* [Element](https://github.com/ElemeFE/element)
* [Howler](https://github.com/goldfire/howler.js)
* [Axios](https://github.com/axios/axios)
* And so on...


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

#### Build and run production:
Run one of the following commands:
```bash
$ yarn && yarn build && yarn start

# OR

$ npm i && npm run build && npm start
```


## NOTE:
It seems that SoundCloud has revoked my api client keys without any explanation or warning. Running the app locally no longer works unless you have a working SoundCloud API client id (SoundCloud has disabled registration of new apps for quite some time now). The [live demo](https://vue-soundcloud.herokuapp.com) is also not working at the moment.


## Support:
<a href="https://www.patreon.com/soroushchehresa">
	<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>
