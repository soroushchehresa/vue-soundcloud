<br />
<div align="center">
  
# 🎧 Vue SoundCloud
Simple [SoundCloud](https://soundcloud.com) client built with [Vue](https://vuejs.org) and [Nuxt](https://nuxtjs.org). 

</div>

<br />

## ⚠️ At present, it is not functional ⚠️
Unfortunately, third-party applications that relied on SoundCloud's API to play music from its platform are no longer functional due to SoundCloud's decision to discontinue the API. Moreover, the platform had long time ceased providing API keys to users without any clear explanation prior to this. As a result, developers are left without a solution to work with the APIs, which has caused frustration and inconvenience for those who use these applications to access SoundCloud's vast music collection. It remains to be seen if SoundCloud will provide an alternative solution to this problem for developers and users alike.

I am hopeful that we can revive this project once again, so I don't archive this repository!

<br>

## Screenshots:
#### Desktop view:
<p align="center">
  <img src="http://i.imgur.com/gI1S0Ct.png" width="100%" />
</p>

#### Mobile view:
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


## This project implemented by the following technologies:
* [Vue](https://github.com/vuejs/vue)
* [Nuxt](https://github.com/nuxt/nuxt.js)
* [Vuex](https://github.com/vuejs/vuex)
* [Element](https://github.com/ElemeFE/element)
* [Howler](https://github.com/goldfire/howler.js)
* [Axios](https://github.com/axios/axios)
* etc.


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

## Support:
<a href="https://www.patreon.com/soroushchehresa">
	<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>
