# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="1.9.0"></a>
# [1.9.0](https://gitlab.com/nubabi/mobile/compare/nubabi-native@1.8.1...nubabi-native@1.9.0) (2017-12-22)


### Bug Fixes

* add aliases for all bundles ([4a2d723](https://gitlab.com/nubabi/mobile/commit/4a2d723))
* fix for activity url ([521079f](https://gitlab.com/nubabi/mobile/commit/521079f))


### Features

* add selected activity status ([4126067](https://gitlab.com/nubabi/mobile/commit/4126067))




<a name="1.8.1"></a>
## [1.8.1](https://gitlab.com/nubabi/mobile/compare/nubabi-native@1.8.0...nubabi-native@1.8.1) (2017-12-21)




**Note:** Version bump only for package nubabi-native

<a name="1.8.0"></a>
# [1.8.0](https://gitlab.com/nubabi/mobile/compare/nubabi-native@1.7.0...nubabi-native@1.8.0) (2017-12-19)


### Bug Fixes

* Choose Baby overlaps with lots of babies ([399906f](https://gitlab.com/nubabi/mobile/commit/399906f))
* **memories:** Recent Memories add button does not need params ([10bf374](https://gitlab.com/nubabi/mobile/commit/10bf374))
* **native:** add firebase to `platformDeps` ([2b174f4](https://gitlab.com/nubabi/mobile/commit/2b174f4))
* **profile:** use min-width for small lists ([b72d6e7](https://gitlab.com/nubabi/mobile/commit/b72d6e7))
* update usage of edges in Baby responses ([b7958fa](https://gitlab.com/nubabi/mobile/commit/b7958fa))
* **stimulation:** remove top border from Browse Activities screen ([4386850](https://gitlab.com/nubabi/mobile/commit/4386850))


### Features

* add upload interceptor and upload root to components ([fececd1](https://gitlab.com/nubabi/mobile/commit/fececd1))
* move account linking to core ([5c50e71](https://gitlab.com/nubabi/mobile/commit/5c50e71))
* update Firebase server and fixes ([a61ceac](https://gitlab.com/nubabi/mobile/commit/a61ceac))
* **memories:** enable EXIF metadata storage for memories ([bb66439](https://gitlab.com/nubabi/mobile/commit/bb66439))




<a name="1.7.0"></a>
# [1.7.0](https://gitlab.com/nubabi/mobile/compare/nubabi-native@1.6.0...nubabi-native@1.7.0) (2017-12-11)


### Features

* **profile:** delete baby ([319a970](https://gitlab.com/nubabi/mobile/commit/319a970))




<a name="1.6.0"></a>
# [1.6.0](https://gitlab.com/nubabi/mobile/compare/nubabi-native@1.5.2...nubabi-native@1.6.0) (2017-12-11)


### Features

* add Choose Baby header title, move close button ([a307599](https://gitlab.com/nubabi/mobile/commit/a307599))




<a name="1.5.2"></a>
## [1.5.2](https://gitlab.com/nubabi/mobile/compare/nubabi-native@1.5.1...nubabi-native@1.5.2) (2017-12-11)


### Bug Fixes

* **memories:** include fromActivity in optimistic response ([d48227a](https://gitlab.com/nubabi/mobile/commit/d48227a))
* **profile:** remove need to `refetchQueries` on baby update ([1bef924](https://gitlab.com/nubabi/mobile/commit/1bef924))
* **schema:** deprecate {created,changed} in payloads, use edge instead ([8847d22](https://gitlab.com/nubabi/mobile/commit/8847d22))


### Performance Improvements

* **profile:** seed images if avatar/coverImage changes ([ea8cff9](https://gitlab.com/nubabi/mobile/commit/ea8cff9))
* avoid re-rendering when an image is uploaded ([594ccd8](https://gitlab.com/nubabi/mobile/commit/594ccd8))
* optimistic response for edit baby ([14ac6a2](https://gitlab.com/nubabi/mobile/commit/14ac6a2))




<a name="1.5.1"></a>
## [1.5.1](https://gitlab.com/nubabi/mobile/compare/nubabi-native@1.5.0...nubabi-native@1.5.1) (2017-12-06)




**Note:** Version bump only for package nubabi-native

<a name="1.5.0"></a>
# [1.5.0](https://gitlab.com/nubabi/mobile/compare/nubabi-native@1.4.0...nubabi-native@1.5.0) (2017-12-06)


### Bug Fixes

* **memories:** request IDs for actors of likes/comments ([0bc538e](https://gitlab.com/nubabi/mobile/commit/0bc538e))


### Features

* add memories from activities and display on list ([ad73e88](https://gitlab.com/nubabi/mobile/commit/ad73e88))




<a name="1.4.0"></a>
# [1.4.0](https://gitlab.com/nubabi/mobile/compare/nubabi-native@1.3.2...nubabi-native@1.4.0) (2017-12-05)


### Features

* **native:** initial iPhone X support ([993c1b3](https://gitlab.com/nubabi/mobile/commit/993c1b3))
* rewritte Choose Baby animation and improve interactions ([24ab225](https://gitlab.com/nubabi/mobile/commit/24ab225))




<a name="1.3.2"></a>
## [1.3.2](https://gitlab.com/nubabi/mobile/compare/nubabi-native@1.3.1...nubabi-native@1.3.2) (2017-12-04)


### Bug Fixes

* **settings:** disable user form controls while submitting ([3c70cb1](https://gitlab.com/nubabi/mobile/commit/3c70cb1))




<a name="1.3.1"></a>
## [1.3.1](https://gitlab.com/nubabi/mobile/compare/nubabi-native@1.3.0...nubabi-native@1.3.1) (2017-12-04)




**Note:** Version bump only for package nubabi-native

<a name="1.3.0"></a>
# [1.3.0](https://gitlab.com/nubabi/mobile/compare/nubabi-native@1.2.0...nubabi-native@1.3.0) (2017-12-04)


### Bug Fixes

* **auth:** use new loginRequest form from Login ([02a15ad](https://gitlab.com/nubabi/mobile/commit/02a15ad))


### Features

* **auth:** account linking and unlinking plus display ([568a640](https://gitlab.com/nubabi/mobile/commit/568a640))
* **auth:** add Facebook login ([1a2dff3](https://gitlab.com/nubabi/mobile/commit/1a2dff3))
* **notifications:** enable push notification support ([f4a5b71](https://gitlab.com/nubabi/mobile/commit/f4a5b71))
* **notifications:** add app opened from notification support ([9210b91](https://gitlab.com/nubabi/mobile/commit/9210b91))
* **notifications:** dispatch action on in-app notification received ([ffe05d5](https://gitlab.com/nubabi/mobile/commit/ffe05d5))




<a name="1.2.0"></a>
# [1.2.0](https://gitlab.com/nubabi/mobile/compare/nubabi-native@1.1.0...nubabi-native@1.2.0) (2017-11-30)


### Bug Fixes

* **growth:** refetchQuery after measurement update ([4063fc9](https://gitlab.com/nubabi/mobile/commit/4063fc9))
* **memories:** first-birthday from Suggested grid mapping ([342c027](https://gitlab.com/nubabi/mobile/commit/342c027))
* **profile:** hide Edit measurement buttons while submitting ([3d42241](https://gitlab.com/nubabi/mobile/commit/3d42241))


### Features

* **memories:** use new edit image ([40be4cc](https://gitlab.com/nubabi/mobile/commit/40be4cc))
* **profile:** go back after measurement update ([feda8e0](https://gitlab.com/nubabi/mobile/commit/feda8e0))
* **system:** add error boundary ([510f839](https://gitlab.com/nubabi/mobile/commit/510f839))




<a name="1.1.0"></a>
# [1.1.0](https://gitlab.com/nubabi/mobile/compare/nubabi-native@1.0.0...nubabi-native@1.1.0) (2017-11-28)


### Features

* analytics support ([be20d72](https://gitlab.com/nubabi/mobile/commit/be20d72))




<a name="1.0.0"></a>
# [1.0.0](https://gitlab.com/nubabi/mobile/compare/v1.0.0-beta.6...nubabi-native@1.0.0) (2017-11-27)


### Bug Fixes

* move resolutions to native package.json ([c8dfd50](https://gitlab.com/nubabi/mobile/commit/c8dfd50))
* move victory-chart out of core ([2b691be](https://gitlab.com/nubabi/mobile/commit/2b691be))
* package.json and module alias ([c4caec1](https://gitlab.com/nubabi/mobile/commit/c4caec1))
* **stimulation:** Browse Activities button height for plus devices ([de50d89](https://gitlab.com/nubabi/mobile/commit/de50d89))


### Features

* individual dependencies, workaround victory-chart error ([a101ea6](https://gitlab.com/nubabi/mobile/commit/a101ea6))




<a name="1.0.0-beta.6"></a>
# [1.0.0-beta.6](https://gitlab.com/nubabi/mobile/compare/v1.0.0-beta.5...v1.0.0-beta.6) (2017-11-22)


### Bug Fixes

* **profile:** null-check avatarSource ([fa490bc](https://gitlab.com/nubabi/mobile/commit/fa490bc))
* **schema:** fetch full user profile for template in growth ([e6cd8ca](https://gitlab.com/nubabi/mobile/commit/e6cd8ca))
* **schema:** user name in first introduction ([5a7f6e3](https://gitlab.com/nubabi/mobile/commit/5a7f6e3))


### Features

* **auth:** update login background ([b3ba2e5](https://gitlab.com/nubabi/mobile/commit/b3ba2e5))
* **growth:** titleize buttons text ([2194683](https://gitlab.com/nubabi/mobile/commit/2194683))
* **growth:** titleize navigation header ([d232e23](https://gitlab.com/nubabi/mobile/commit/d232e23))
* **profile:** rename growth summary title ([4748c45](https://gitlab.com/nubabi/mobile/commit/4748c45))
* **stimulation:** rename nav header ([27995e1](https://gitlab.com/nubabi/mobile/commit/27995e1))




<a name="1.0.0-beta.5"></a>
# [1.0.0-beta.5](https://gitlab.com/nubabi/mobile/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2017-11-21)


### Bug Fixes

* **forms:** display labels when measurement inputs are focused ([0fc2ee1](https://gitlab.com/nubabi/mobile/commit/0fc2ee1))
* **forms**: submit button wrong var ([0358309](https://gitlab.com/nubabi/mobile/commit/0358309))
* **gallery:** coerce boolean for startOnGrid ([435ffcf](https://gitlab.com/nubabi/mobile/commit/435ffcf))
* **gallery:** ImageBackground, remove logging ([dd79690](https://gitlab.com/nubabi/mobile/commit/dd79690))
* **growth:** adjust overlay opacity in GraphDetailHeader ([8bfceff](https://gitlab.com/nubabi/mobile/commit/8bfceff))
* **growth:** chart fails to render on JSC ([0e2d83c](https://gitlab.com/nubabi/mobile/commit/0e2d83c))
* **growth:** display abbrev months in graph detail ([daf77b3](https://gitlab.com/nubabi/mobile/commit/daf77b3))
* **growth:** font size and spacing for header view ([b427a70](https://gitlab.com/nubabi/mobile/commit/b427a70))
* **growth:** increase right margin of update in graph detail ([809999e](https://gitlab.com/nubabi/mobile/commit/809999e))
* **growth:** spacing before update measurement in graph detail ([d0b283e](https://gitlab.com/nubabi/mobile/commit/d0b283e))
* **growth:** temp fix by swapping section links icons ([5397a05](https://gitlab.com/nubabi/mobile/commit/5397a05))
* **growth:** undocumented height adjustment of SegmentedControl ([da2ad92](https://gitlab.com/nubabi/mobile/commit/da2ad92))
* **growth:** unit label too close to edge in graph detail ([620605e](https://gitlab.com/nubabi/mobile/commit/620605e))
* **library:** remove message from share articles ([43731b5](https://gitlab.com/nubabi/mobile/commit/43731b5))
* **memories:** add height to memory images ([9f5a830](https://gitlab.com/nubabi/mobile/commit/9f5a830))
* **memories:** bigger close button in Suggested Memories ([74cfc08](https://gitlab.com/nubabi/mobile/commit/74cfc08))
* **memories:** correct margin for suggested memory was 2px off ([f1d06f7](https://gitlab.com/nubabi/mobile/commit/f1d06f7))
* **memories:** datepicker format ([239dd0e](https://gitlab.com/nubabi/mobile/commit/239dd0e))
* **memories:** display more count logic ([b5ca40d](https://gitlab.com/nubabi/mobile/commit/b5ca40d))
* **memories:** image caching ([c72ed8b](https://gitlab.com/nubabi/mobile/commit/c72ed8b))
* **memories:** remove files ([fb96d3a](https://gitlab.com/nubabi/mobile/commit/fb96d3a))
* **memories:** temp icon for edit in navbar ([0b44823](https://gitlab.com/nubabi/mobile/commit/0b44823))
* **memories:** use md-flower for sticker icon ([0aaeec8](https://gitlab.com/nubabi/mobile/commit/0aaeec8))
* **memories:** workaround pull to refresh by using `RefreshControl` ([2f83f7a](https://gitlab.com/nubabi/mobile/commit/2f83f7a))
* **native:** link libRCTActionSheet ([d3ec785](https://gitlab.com/nubabi/mobile/commit/d3ec785))
* **navigation:** backport react-native-tab changes (use fork) ([3c28869](https://gitlab.com/nubabi/mobile/commit/3c28869))
* **profile:** numeric keyboard for measurement in Add Baby ([3a1bf26](https://gitlab.com/nubabi/mobile/commit/3a1bf26))
* **profile:** only allow numeric input for height/weight ([c651875](https://gitlab.com/nubabi/mobile/commit/c651875))
* **profile:** record measurements on baby creation ([e700095](https://gitlab.com/nubabi/mobile/commit/e700095))
* **profile:** refactor Edit Baby form ([55e8db0](https://gitlab.com/nubabi/mobile/commit/55e8db0))
* **profile:** tabbar icon shows no image with empty avatar ([9505ab5](https://gitlab.com/nubabi/mobile/commit/9505ab5))
* **profile:** update default of DatePicker input ([de849fd](https://gitlab.com/nubabi/mobile/commit/de849fd))
* **profile:** use new uploader for Baby forms ([cd47545](https://gitlab.com/nubabi/mobile/commit/cd47545))
* **schema:** add createdBy when creating baby ([49db80e](https://gitlab.com/nubabi/mobile/commit/49db80e))
* **schema:** restore RN check ([a36dcb4](https://gitlab.com/nubabi/mobile/commit/a36dcb4))
* **schema:** change RN check to ENV (webpack issue) in connector ([b75a1e6](https://gitlab.com/nubabi/mobile/commit/b75a1e6))
* **settings:** omit avatar from props passed to file normalizer ([07fce2a](https://gitlab.com/nubabi/mobile/commit/07fce2a))
* **settings:** use new uploader for user profile ([126eae6](https://gitlab.com/nubabi/mobile/commit/126eae6))
* **stimulation:** avoid failing to update favorites fragment ([4dab1a3](https://gitlab.com/nubabi/mobile/commit/4dab1a3))
* **stimulation:** avoid fetching `isComplete` for non-baby activities ([6cc9864](https://gitlab.com/nubabi/mobile/commit/6cc9864))
* **stimulation:** BrowseActivitiesButton text prop validation ([079eb8a](https://gitlab.com/nubabi/mobile/commit/079eb8a))
* **stimulation:** complete status on nav via buttons ([11b593d](https://gitlab.com/nubabi/mobile/commit/11b593d))
* **stimulation:** improve isCompleted/isFavorite handling ([123a51a](https://gitlab.com/nubabi/mobile/commit/123a51a))
* **stimulation:** move handler for complete activity ([b846d20](https://gitlab.com/nubabi/mobile/commit/b846d20))
* **stimulation:** remove bottom margin from Browse Activities' skill area ([2d2c95d](https://gitlab.com/nubabi/mobile/commit/2d2c95d))
* **stimulation:** remove bottom margin from Browse Activities' skill area ([782ae36](https://gitlab.com/nubabi/mobile/commit/782ae36))
* **stimulation:** switch to refetchQueries after activity actions ([a95f14e](https://gitlab.com/nubabi/mobile/commit/a95f14e))
* **stimulation:** wrong param for cursor on in-place activity navigation ([3ca2e76](https://gitlab.com/nubabi/mobile/commit/3ca2e76))
* ImageBackground on requireBaby ([07b93c9](https://gitlab.com/nubabi/mobile/commit/07b93c9))
* remove duplicate fragments/operation names ([c16c4e8](https://gitlab.com/nubabi/mobile/commit/c16c4e8))
* small fixes ([a665d0a](https://gitlab.com/nubabi/mobile/commit/a665d0a))
* try to move color-convert repo because of BB failure ([b1aa889](https://gitlab.com/nubabi/mobile/commit/b1aa889))
* try to workaround metro-bundler bug ([5288ff9](https://gitlab.com/nubabi/mobile/commit/5288ff9))
* pin color-convert because of shadowed variable ([9c0ff9d](https://gitlab.com/nubabi/mobile/commit/9c0ff9d))
* fix YellowBox warnings ([5600324](https://gitlab.com/nubabi/mobile/commit/5600324))


### Features

* **firebase:** add update rules ([b67f030](https://gitlab.com/nubabi/mobile/commit/b67f030))
* **gallery:** toggle full screen when playing and device is rotated ([57ef332](https://gitlab.com/nubabi/mobile/commit/57ef332))
* **growth:** update GraphDetailHeader image ([595c156](https://gitlab.com/nubabi/mobile/commit/595c156))
* **growth:** use new interpolation on graph detail ([6c121a9](https://gitlab.com/nubabi/mobile/commit/6c121a9))
* **memories:** ability to unselect stickers ([e08b6e7](https://gitlab.com/nubabi/mobile/commit/e08b6e7))
* **memories:** add edit memory button to navigation of View Memory ([7028f5c](https://gitlab.com/nubabi/mobile/commit/7028f5c))
* **memories:** add the rest of stickers ([e70082d](https://gitlab.com/nubabi/mobile/commit/e70082d))
* **memories:** add/edit sticker support ([95359dc](https://gitlab.com/nubabi/mobile/commit/95359dc))
* **memories:** change listitem colors in Memory form ([59e8de1](https://gitlab.com/nubabi/mobile/commit/59e8de1))
* **memories:** empty memory list now shows suggested memories grid per design ([1b85797](https://gitlab.com/nubabi/mobile/commit/1b85797))
* **memories:** header Save button on Add Memory ([117e045](https://gitlab.com/nubabi/mobile/commit/117e045))
* **memories:** memory edit icon ([0986bf2](https://gitlab.com/nubabi/mobile/commit/0986bf2))
* **memories:** move Save to navigation and delete to form ([ac4755b](https://gitlab.com/nubabi/mobile/commit/ac4755b))
* **memories:** remove edit button from list view, refactor ([a162f1d](https://gitlab.com/nubabi/mobile/commit/a162f1d))
* **memories:** remove event and voice notes from memory form ([ecd6e42](https://gitlab.com/nubabi/mobile/commit/ecd6e42))
* **memories:** use new edit image, remove switcher state ([8f8f8f4](https://gitlab.com/nubabi/mobile/commit/8f8f8f4))
* **navigation:** rename tab titles and screen titles for main views ([91bf031](https://gitlab.com/nubabi/mobile/commit/91bf031))
* **profile:** disable controls on Add Baby while submitting ([432a0d8](https://gitlab.com/nubabi/mobile/commit/432a0d8))
* **profile:** move save button to nav, animate, activity indicator ([ec9b254](https://gitlab.com/nubabi/mobile/commit/ec9b254))
* **profile:** set default week to 40 ([3b761d1](https://gitlab.com/nubabi/mobile/commit/3b761d1))
* **schema:** upload independent files and metadata ([468ba4d](https://gitlab.com/nubabi/mobile/commit/468ba4d))
* **settings:** remove Reset all tips & suggestions button ([09bb8af](https://gitlab.com/nubabi/mobile/commit/09bb8af))
* **settings:** remove submit button in user form, use right header ([0f948ee](https://gitlab.com/nubabi/mobile/commit/0f948ee))
* **stimulation:** activity completion ([d5677f2](https://gitlab.com/nubabi/mobile/commit/d5677f2))
* **stimulation:** optimistic response for favorite toggle ([814a16e](https://gitlab.com/nubabi/mobile/commit/814a16e))
* **stimulation:** try to resize images and add text shadow ([dc3e8d9](https://gitlab.com/nubabi/mobile/commit/dc3e8d9))
* **stimulation:** update category images ([6e97ae7](https://gitlab.com/nubabi/mobile/commit/6e97ae7))
* **stimulation:** use 2-weeks-ago label in Activity History ([177c642](https://gitlab.com/nubabi/mobile/commit/177c642))
* label renames ([a094fa6](https://gitlab.com/nubabi/mobile/commit/a094fa6))

### Performance Improvements

* small improvement to loading speed ([1db1e4b](https://gitlab.com/nubabi/mobile/commit/1db1e4b))




<a name="1.0.0-beta.4"></a>
# [1.0.0-beta.4](https://gitlab.com/nubabi/mobile/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2017-10-31)


### Bug Fixes

* **forms:**: SubmitButton setState after unmount ([ddf2188](https://gitlab.com/nubabi/mobile/commit/ddf2188))
* **forms:** try to fix submit animation when form is not valid ([e560747](https://gitlab.com/nubabi/mobile/commit/e560747))
* **forms:** disable user interactions while submitting in memory form ([f7c5feb](https://gitlab.com/nubabi/mobile/commit/f7c5feb))
* **library:** pull section id ([8892916](https://gitlab.com/nubabi/mobile/commit/8892916))
* **library:** remove background color if there's a section bg ([038735e](https://gitlab.com/nubabi/mobile/commit/038735e))
* **memories:**: rewrite upload, optimistic responses for memories, etc ([e9a4772](https://gitlab.com/nubabi/mobile/commit/e9a4772))
* **memories:** blocking Add Memory button in header due to weird event ([9677046](https://gitlab.com/nubabi/mobile/commit/9677046))
* **memories:** invisible titles when there is no suggested memory image ([58c8191](https://gitlab.com/nubabi/mobile/commit/58c8191))
* **memories:** race condition on edit memory ([2037c47](https://gitlab.com/nubabi/mobile/commit/2037c47))
* **memories:** squared suggested memory types ([b3014ac](https://gitlab.com/nubabi/mobile/commit/b3014ac))
* **memories:** suggestedMemoryType aka sticker is editable on schema ([af48d45](https://gitlab.com/nubabi/mobile/commit/af48d45))
* **memories:** temp fix for "Nothing found" after update, perf improvements ([db5b0b0](https://gitlab.com/nubabi/mobile/commit/db5b0b0))
* **memories:** use InteractionManager when going back ([c80e076](https://gitlab.com/nubabi/mobile/commit/c80e076))
* **profile:**: empty states when user has no baby selected ([89db61c](https://gitlab.com/nubabi/mobile/commit/89db61c))
* **profile:** handle when there's no prior measurement (i.e Add baby) ([2dbd4bc](https://gitlab.com/nubabi/mobile/commit/2dbd4bc))
* **profile:** restore relationship label ([939794d](https://gitlab.com/nubabi/mobile/commit/939794d))
* **stimulation:** better alignment of step numbers in Activity ([bfa60c3](https://gitlab.com/nubabi/mobile/commit/bfa60c3))
* use react-native-fetch-blob from fork ([1bbc962](https://gitlab.com/nubabi/mobile/commit/1bbc962))
* handle empty collections in connectionFromBackendMetadataArray ([df764ab](https://gitlab.com/nubabi/mobile/commit/df764ab))
* rewrite uploader ([2678e6c](https://gitlab.com/nubabi/mobile/commit/2678e6c))


### Features

* **growth:** redesign ([a5ba772](https://gitlab.com/nubabi/mobile/commit/a5ba772))
* **growth:** add section information to links (WYNTK) ([372a9f1](https://gitlab.com/nubabi/mobile/commit/372a9f1))
* **growth:** handle view graph from update screens ([41bdbe3](https://gitlab.com/nubabi/mobile/commit/41bdbe3))
* **growth:** update measurement controls ([b5e4d42](https://gitlab.com/nubabi/mobile/commit/b5e4d42))
* **library:** add distinct header bgs by section ([8993094](https://gitlab.com/nubabi/mobile/commit/8993094))
* **library:** add healthcare notice to Health articles ([6608fbe](https://gitlab.com/nubabi/mobile/commit/6608fbe))
* **library:** add icons to Growth article titles ([f11d311](https://gitlab.com/nubabi/mobile/commit/f11d311))
* **library:** add section titles instead of Articles ([c4d4761](https://gitlab.com/nubabi/mobile/commit/c4d4761))
* **memories:** likes, detail UI, commenting UI, etc ([d3f761d](https://gitlab.com/nubabi/mobile/commit/d3f761d))
* **memories:** add comments ([c0f631d](https://gitlab.com/nubabi/mobile/commit/c0f631d))
* **memories:** disable navigation and display activity indicator when optimistic ([f0790a8](https://gitlab.com/nubabi/mobile/commit/f0790a8))
* **memories:** display memory types ([a7fde70](https://gitlab.com/nubabi/mobile/commit/a7fde70))
* **memories:** optimistic response for toggle like ([6e69be4](https://gitlab.com/nubabi/mobile/commit/6e69be4))
* **memories:** suggested memories and edit ([f8252df](https://gitlab.com/nubabi/mobile/commit/f8252df))
* **memories**: use video thumbnail if available ([a4187a3](https://gitlab.com/nubabi/mobile/commit/a4187a3))
* **networking:** network indicator when fetching more activities ([89bb773](https://gitlab.com/nubabi/mobile/commit/89bb773))
* **networking:**: network indicator when pull to refresh on article list ([de424f6](https://gitlab.com/nubabi/mobile/commit/de424f6))
* **notifications:** wire notifications view ([d569c5f](https://gitlab.com/nubabi/mobile/commit/d569c5f))
* **profile:** restore update measurement functionality pending submission handling ([23f6d6a](https://gitlab.com/nubabi/mobile/commit/23f6d6a))
* **stimulation:** activity history ([2aca6f8](https://gitlab.com/nubabi/mobile/commit/2aca6f8))
* **stimulation:** add overlay while handling activity actions ([1c23d67](https://gitlab.com/nubabi/mobile/commit/1c23d67))
* **stimulation:** arguably smoother activity navigation ([751a489](https://gitlab.com/nubabi/mobile/commit/751a489))
* **stimulation:** Browse Activities redesign ([ca02469](https://gitlab.com/nubabi/mobile/commit/ca02469))
* **stimulation:** continuous steps in activity view ([85927e6](https://gitlab.com/nubabi/mobile/commit/85927e6))
* **stimulation:** mocked activity history ([917730f](https://gitlab.com/nubabi/mobile/commit/917730f))
* **stimulation:** remove filter for right nav since this is now "Custom Search" ([69c8f1e](https://gitlab.com/nubabi/mobile/commit/69c8f1e))
* **stimulation:** try new action card styles ([f1558c7](https://gitlab.com/nubabi/mobile/commit/f1558c7))
* add pull to refresh with network indicator to all remaining lists ([fff2fd0](https://gitlab.com/nubabi/mobile/commit/fff2fd0))
* missed Favorites from previous commit ([71e2a79](https://gitlab.com/nubabi/mobile/commit/71e2a79))




<a name="1.0.0-beta.3"></a>
# [1.0.0-beta.3](https://gitlab.com/nubabi/mobile/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2017-08-24)


### Bug Fixes

* **auth:** improve logo positioning ([f7dc675](https://gitlab.com/nubabi/mobile/commit/f7dc675))
* **auth:** avoid double state reset on logout ([899f6ea](https://gitlab.com/nubabi/mobile/commit/899f6ea))
* **library:** article title color in card list is "secondary" ([654f09f](https://gitlab.com/nubabi/mobile/commit/654f09f))
* **library:** match font sizes ([08b0735](https://gitlab.com/nubabi/mobile/commit/08b0735))
* **library:** allow scrolling ([4afe5b6](https://gitlab.com/nubabi/mobile/commit/4afe5b6))
* **login:** disable autofocus for now ([a0db1e5](https://gitlab.com/nubabi/mobile/commit/a0db1e5))
* **login:** go back to abs pos logo ([14e3a30](https://gitlab.com/nubabi/mobile/commit/14e3a30))
* **login:** logo dimensions ([547739f](https://gitlab.com/nubabi/mobile/commit/547739f))
* **login:** trigger animation when submitting via keyboard ([1f48513](https://gitlab.com/nubabi/mobile/commit/1f48513))
* **login:** update mapDispatchToProps for redux 3.7 ([33fc658](https://gitlab.com/nubabi/mobile/commit/33fc658))
* **memories:** avatar URL has changed due to resizing ([a4c2166](https://gitlab.com/nubabi/mobile/commit/a4c2166))
* **memories:** make recent memories take same space, truncate text ([596babd](https://gitlab.com/nubabi/mobile/commit/596babd))
* **memories:** MemoryMediaVideo now opens grid ([ee380b1](https://gitlab.com/nubabi/mobile/commit/ee380b1))
* **memories:** missing files from selective push ([a37e71e](https://gitlab.com/nubabi/mobile/commit/a37e71e))
* **memories:** removeFiles was passed in add memory, fix voice screen on add memory ([cb197c5](https://gitlab.com/nubabi/mobile/commit/cb197c5))
* **memories:** style of more indicator for videos ([42df820](https://gitlab.com/nubabi/mobile/commit/42df820))
* **memories:** update edge on ViewMemories when adding memory ([8cff352](https://gitlab.com/nubabi/mobile/commit/8cff352))
* **navigation:** remove black touchable feedback from Settings ([6b85d9e](https://gitlab.com/nubabi/mobile/commit/6b85d9e))
* **profile:** change casing of Read more ([385c70d](https://gitlab.com/nubabi/mobile/commit/385c70d))
* **profile:** match empty Recent Memories font size ([eb479c1](https://gitlab.com/nubabi/mobile/commit/eb479c1))
* **profile** unique fragment name for measurement, typo ([d375b6f](https://gitlab.com/nubabi/mobile/commit/d375b6f))
* **profile:** increase border radius of age Pill in Growth section ([8b2a06e](https://gitlab.com/nubabi/mobile/commit/8b2a06e))
* **profile:** line height on Growth section ([3f3a9f9](https://gitlab.com/nubabi/mobile/commit/3f3a9f9))
* **profile:** render loading image while profile icon loads ([9951eff](https://gitlab.com/nubabi/mobile/commit/9951eff))
* **profile:** reorder LayoutAnimation to try to fix flash ([f80ce16](https://gitlab.com/nubabi/mobile/commit/f80ce16))
* **profile:** right-align "Read More" for growth section ([dc75d66](https://gitlab.com/nubabi/mobile/commit/dc75d66))
* **profile:** submit button ([c7e6dce](https://gitlab.com/nubabi/mobile/commit/c7e6dce))
* **profile:** trying to load baby icon before preload ([93d4df9](https://gitlab.com/nubabi/mobile/commit/93d4df9))
* **profile:** use 3 lines for growth section text ([ff9c8f5](https://gitlab.com/nubabi/mobile/commit/ff9c8f5))
* **stimulation:** left-over on Reader was on BrowseActivities ([f2d9994](https://gitlab.com/nubabi/mobile/commit/f2d9994))
* **stimulation:** lifecycle error with LayoutAnimation causing screen flash ([03dfd33](https://gitlab.com/nubabi/mobile/commit/03dfd33)), closes [#86](https://gitlab.com/nubabi/mobile/issues/86)
* make loader animations slower, change easing ([b62e334](https://gitlab.com/nubabi/mobile/commit/b62e334))
* avoid leaking unhandled rejection if graphql server token isn't running ([067d4ae](https://gitlab.com/nubabi/mobile/commit/067d4ae))
* point victory-native to native while they fix component bug ([f99c10f](https://gitlab.com/nubabi/mobile/commit/f99c10f))
* resizeMode is a prop, not style ([1c305da](https://gitlab.com/nubabi/mobile/commit/1c305da))
* mistakenly optimized imports in schema ([cab2ed6](https://gitlab.com/nubabi/mobile/commit/cab2ed6))
* guard against null image prefetching in Splash ([90ca6ac](https://gitlab.com/nubabi/mobile/commit/90ca6ac))
* remove layout animation to try to fix flash in Splash ([a1e61d0](https://gitlab.com/nubabi/mobile/commit/a1e61d0))


### Features

* **auth:** dynamic width animations, fade in text on back ([894a8b9](https://gitlab.com/nubabi/mobile/commit/894a8b9))
* **auth:** imperatively trigger fade on submit button text ([f983945](https://gitlab.com/nubabi/mobile/commit/f983945))
* **auth:** transparentize placeholder text ([24247aa](https://gitlab.com/nubabi/mobile/commit/24247aa))
* **auth:** update logo image to white version ([ed12c78](https://gitlab.com/nubabi/mobile/commit/ed12c78))
* **auth:** use new photo for login background ([21e9fc8](https://gitlab.com/nubabi/mobile/commit/21e9fc8))
* **forms:** animated submit button 🎉 ([345a357](https://gitlab.com/nubabi/mobile/commit/345a357))
* **forms:** new submit buttons for Login and Edit User ([02828ff](https://gitlab.com/nubabi/mobile/commit/02828ff))
* **growth:** add combined chart for Growth card, improve detailed ([22d7bf1](https://gitlab.com/nubabi/mobile/commit/22d7bf1))
* **growth:** add lines to graph ([e602612](https://gitlab.com/nubabi/mobile/commit/e602612))
* **growth:** better graph implementation ([7b8dac3](https://gitlab.com/nubabi/mobile/commit/7b8dac3))
* **growth:** first try on switching away from D3 for growth chart ([8b76ad8](https://gitlab.com/nubabi/mobile/commit/8b76ad8))
* **growth:** initial graph detail implementation ([da98a6b](https://gitlab.com/nubabi/mobile/commit/da98a6b))
* **native**: portrait orientation-lock ([9bb6f51](https://gitlab.com/nubabi/mobile/commit/9bb6f51))
* **library:** share articles to mylearningbabyguide.com URL ([d282a65](https://gitlab.com/nubabi/mobile/commit/d282a65))
* **memories:** add display more with thumbnail of 3rd media ([67a160f](https://gitlab.com/nubabi/mobile/commit/67a160f))
* **memories:** add Memory screen with media pickers ([4ab3c4b](https://gitlab.com/nubabi/mobile/commit/4ab3c4b))
* **memories:** add memory takes you back, prepare for optimistic response ([739905d](https://gitlab.com/nubabi/mobile/commit/739905d))
* **memories:** audio playback ([1e59734](https://gitlab.com/nubabi/mobile/commit/1e59734))
* **memories:** change asset processing text ([4944868](https://gitlab.com/nubabi/mobile/commit/4944868))
* **memories:** comment display ([2c78686](https://gitlab.com/nubabi/mobile/commit/2c78686))
* **memories:** custom datepicker lifecycle, fix media wrapping ([09e0c99](https://gitlab.com/nubabi/mobile/commit/09e0c99))
* **memories:** delete memories ([01805f6](https://gitlab.com/nubabi/mobile/commit/01805f6))
* **memories:** edit memory with file add/removal ([3e1b7d5](https://gitlab.com/nubabi/mobile/commit/3e1b7d5))
* **memories:** experimental video playback ([c67354a](https://gitlab.com/nubabi/mobile/commit/c67354a))
* **memories:** gallery view for images ([15a4a4e](https://gitlab.com/nubabi/mobile/commit/15a4a4e))
* **memories:** memory creation and file upload ([863a3b5](https://gitlab.com/nubabi/mobile/commit/863a3b5))
* **memories:** memory screens, schema, contentType switcher ([c707dab](https://gitlab.com/nubabi/mobile/commit/c707dab))
* **memories:** optimistic Add Memory on list and add author ([cd033dd](https://gitlab.com/nubabi/mobile/commit/cd033dd))
* **memories:** optimistic memory add ([4cdef29](https://gitlab.com/nubabi/mobile/commit/4cdef29))
* **memories:** optimistic memory deletion with error handling ([408d9c6](https://gitlab.com/nubabi/mobile/commit/408d9c6))
* **memories:** show network indicator while deleting memory ([d6f6643](https://gitlab.com/nubabi/mobile/commit/d6f6643))
* **memories:** show network indicator while memory is being added ([97c6f2a](https://gitlab.com/nubabi/mobile/commit/97c6f2a))
* **memories:** show translucent card with onPress disabled if optimistic ([480df27](https://gitlab.com/nubabi/mobile/commit/480df27))
* **memories:** sort memory list by createdAt.DESC ([470ceae](https://gitlab.com/nubabi/mobile/commit/470ceae))
* **memories:** start tracking memory navigation ([81f75a7](https://gitlab.com/nubabi/mobile/commit/81f75a7))
* **memories:** store memory ID with object ([483d38b](https://gitlab.com/nubabi/mobile/commit/483d38b))
* **memories:** use File interface metadata (i.e duration), fix scroll when video is playing, etc ([465a6db](https://gitlab.com/nubabi/mobile/commit/465a6db))
* **memories:** use video thumbnail in file list ([70656b0](https://gitlab.com/nubabi/mobile/commit/70656b0))
* **memories:** video thumbnail on edit form, update snapshots ([9753194](https://gitlab.com/nubabi/mobile/commit/9753194))
* **memories:** voice note upload ([f6ae65a](https://gitlab.com/nubabi/mobile/commit/f6ae65a))
* **memories:** voice recording/notes ([9cdb17f](https://gitlab.com/nubabi/mobile/commit/9cdb17f))
* **memories:** animate file addition/removal on memory form ([cf61357](https://gitlab.com/nubabi/mobile/commit/cf61357))
* **navigation:**: swap Growth and Stimulation tabs ([7fb3b95](https://gitlab.com/nubabi/mobile/commit/7fb3b95))
* **networking:** actions for showing network activity indicator on status bar ([20cd5f2](https://gitlab.com/nubabi/mobile/commit/20cd5f2))
* **profile:** remove unit switcher, update measurements in current unit ([2b3148c](https://gitlab.com/nubabi/mobile/commit/2b3148c))
* **profile:** bigger age Pill in header ([9a6ae3f](https://gitlab.com/nubabi/mobile/commit/9a6ae3f))
* **profile:** bigger font sizes in Profile screen ([9fe101a](https://gitlab.com/nubabi/mobile/commit/9fe101a))
* **profile:** display Growth article title instead of dob ([5cdbddf](https://gitlab.com/nubabi/mobile/commit/5cdbddf))
* **profile:** empty recent memories state ([b2250ee](https://gitlab.com/nubabi/mobile/commit/b2250ee))
* **profile:** initial implementation of introduction gretting removal for Growth ([c47823a](https://gitlab.com/nubabi/mobile/commit/c47823a))
* **profile:** redesign ([3a93cbd](https://gitlab.com/nubabi/mobile/commit/3a93cbd))
* **settings:** add friend list header and invite blank screen ([af20097](https://gitlab.com/nubabi/mobile/commit/af20097))
* **settings:** add friends list ([93b75c9](https://gitlab.com/nubabi/mobile/commit/93b75c9))
* **settings:** invite user form with contact selection ([89d1760](https://gitlab.com/nubabi/mobile/commit/89d1760))
* **settings**: invite users ([ecb8ef9](https://gitlab.com/nubabi/mobile/commit/ecb8ef9))
* **settings:** add reducer and map settings from props ([2690e18](https://gitlab.com/nubabi/mobile/commit/2690e18))
* **settings:** redesigned screen and notification settings ([5d6defe](https://gitlab.com/nubabi/mobile/commit/5d6defe))
* **settings:** restore Logout button ([8d12807](https://gitlab.com/nubabi/mobile/commit/8d12807))
* **settings:** update profile screen ([a4560b4](https://gitlab.com/nubabi/mobile/commit/a4560b4))
* **settings:** update profile with avatar uploading ([34e8006](https://gitlab.com/nubabi/mobile/commit/34e8006))
* **stimulation:** redesign ([64e7dc2](https://gitlab.com/nubabi/mobile/commit/64e7dc2))
* **stimulation:** remove "Did You Know" section ([42180e7](https://gitlab.com/nubabi/mobile/commit/42180e7))
* **stimulation:** use start of week as calendar date in TWAs ([a62ab28](https://gitlab.com/nubabi/mobile/commit/a62ab28))
* add SF Pro fonts, link regular and display, adapt theme ([a921bf3](https://gitlab.com/nubabi/mobile/commit/a921bf3))
* display graphs in current unit ([3136d70](https://gitlab.com/nubabi/mobile/commit/3136d70))
* new App icon ([69d6825](https://gitlab.com/nubabi/mobile/commit/69d6825))
* embed a few loading messages w/o author for unauthenticated users. ([d9a918b](https://gitlab.com/nubabi/mobile/commit/d9a918b))
* new loader attempt ([d414f4d](https://gitlab.com/nubabi/mobile/commit/d414f4d))
* update splash screen ([14e8aa2](https://gitlab.com/nubabi/mobile/commit/14e8aa2))


### Performance Improvements

* **memories:** instant thumbnail display, delay asset processing until submit ([0b09529](https://gitlab.com/nubabi/mobile/commit/0b09529))
* **memories:** use 'large' version of image in gallery if available ([ae530e9](https://gitlab.com/nubabi/mobile/commit/ae530e9))
* **memories:** use thumbnails for Recent Memories if available ([d0b6cb4](https://gitlab.com/nubabi/mobile/commit/d0b6cb4))
* **memories:** use thumbs in Memory tab if available ([b7dbe12](https://gitlab.com/nubabi/mobile/commit/b7dbe12))
* upgrade react-native-cached-image, enabling prefetch ([ad19efb](https://gitlab.com/nubabi/mobile/commit/ad19efb))




<a name="1.0.0-beta.2"></a>
# [1.0.0-beta.2](https://gitlab.com/nubabi/mobile/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2017-06-14)


### Bug Fixes

* **navigation:** remove baby name from Growth screen title ([8ef598c](https://gitlab.com/nubabi/mobile/commit/8ef598c))


### Features

* **auth:** add basic user profile screen ([f88e744](https://gitlab.com/nubabi/mobile/commit/f88e744))
* **connectors:** use firstName for firebase viewer ([101fb85](https://gitlab.com/nubabi/mobile/commit/101fb85))
* **growth:** use real data in graph ([444a4bd](https://gitlab.com/nubabi/mobile/commit/444a4bd))
* **library:** add parenting tips and health help sections ([86a219b](https://gitlab.com/nubabi/mobile/commit/86a219b))
* **profile:** add datepicker for dob, more margin for relationship label ([ff18397](https://gitlab.com/nubabi/mobile/commit/ff18397))
* **profile:** add relationship options ([0b157a2](https://gitlab.com/nubabi/mobile/commit/0b157a2))
* **profile:** update week born range ([595ff2e](https://gitlab.com/nubabi/mobile/commit/595ff2e))
* **profile:** update week born range, pull up weekOptions ([40c461a](https://gitlab.com/nubabi/mobile/commit/40c461a))
* **schema:** resolve pagination ([d19c21a](https://gitlab.com/nubabi/mobile/commit/d19c21a))
* **stimulation:** add no-op filter button to browse activities ([b79e4c8](https://gitlab.com/nubabi/mobile/commit/b79e4c8))
* **stimulation:** browse activities, default filters ([72f48bb](https://gitlab.com/nubabi/mobile/commit/72f48bb))


### Performance Improvements

* **stimulation:** use cached image now that BrowseActivitiesButton can take urls ([32226cf](https://gitlab.com/nubabi/mobile/commit/32226cf))




<a name="1.0.0-beta.1"></a>
# [1.0.0-beta.1](https://gitlab.com/nubabi/mobile/compare/v1.0.0-alpha.3+167.sha.696fd38...v1.0.0-beta.1) (2017-05-30)


### Bug Fixes

* **splash:** control flow issue would issue failing queries if logged out ([fc2895f](https://gitlab.com/nubabi/mobile/commit/fc2895f))
* activity introductions have tokens now ([a8a89be](https://gitlab.com/nubabi/mobile/commit/a8a89be))
* age is now displayed in weeks, months, or years depending on the closest unit ([964a741](https://gitlab.com/nubabi/mobile/commit/964a741))
* avoid re-rendering settings on logout ([4befcfb](https://gitlab.com/nubabi/mobile/commit/4befcfb))
* baby possessive ([a666a9b](https://gitlab.com/nubabi/mobile/commit/a666a9b))
* build errors, display app version, settings logout button fix ([1e343a0](https://gitlab.com/nubabi/mobile/commit/1e343a0))
* general smoothness improvements, details follow ([dcc6948](https://gitlab.com/nubabi/mobile/commit/dcc6948))
* improve empty state error handling, growth header padding ([cee627a](https://gitlab.com/nubabi/mobile/commit/cee627a))
* **resolvers:** disable nesting ([474dac3](https://gitlab.com/nubabi/mobile/commit/474dac3))
* make splash fade animation faster ([1464bab](https://gitlab.com/nubabi/mobile/commit/1464bab))
* **android:** input heights and border preventing typing display and looking weird ([d5feb7c](https://gitlab.com/nubabi/mobile/commit/d5feb7c))
* **babies:** show babies on choose baby modal ([c3cb179](https://gitlab.com/nubabi/mobile/commit/c3cb179))
* **build:** remove _dev.json and gitignore ([c3e96eb](https://gitlab.com/nubabi/mobile/commit/c3e96eb))
* **build:** remove env logging, touch dev.json ([d72ce65](https://gitlab.com/nubabi/mobile/commit/d72ce65))
* **components:** change default shadow ([6bddfb8](https://gitlab.com/nubabi/mobile/commit/6bddfb8))
* **data:** allow data to be refreshed seamlessly without displaying loading state ([24eb854](https://gitlab.com/nubabi/mobile/commit/24eb854))
* **deps:** transform-define CWD issue with RN packager ([8bae345](https://gitlab.com/nubabi/mobile/commit/8bae345))
* **favorites:** activity needs to be baby-scoped again ([6629642](https://gitlab.com/nubabi/mobile/commit/6629642))
* **growth:** growth button image dimensions ([4a8ca81](https://gitlab.com/nubabi/mobile/commit/4a8ca81))
* **growth:** margin after Expert Advice ([3e805e7](https://gitlab.com/nubabi/mobile/commit/3e805e7))
* **growth:** non-dismissable intros, reorder, headings and bigger text ([87a2d4a](https://gitlab.com/nubabi/mobile/commit/87a2d4a))
* **growth:** rename growth WYNTK title ([645a1d9](https://gitlab.com/nubabi/mobile/commit/645a1d9))
* **growth:** switch period filter to more dropdown-like component ([1ff0b05](https://gitlab.com/nubabi/mobile/commit/1ff0b05))
* **growth:** use line height from design and fix merge ([5df997e](https://gitlab.com/nubabi/mobile/commit/5df997e))
* **library:** header shape being cut off ([9e46c99](https://gitlab.com/nubabi/mobile/commit/9e46c99))
* **library:** image alignment/size ([b1c8a7e](https://gitlab.com/nubabi/mobile/commit/b1c8a7e))
* **library:** improve image styling in articles ([2f60c4b](https://gitlab.com/nubabi/mobile/commit/2f60c4b))
* **library:** list style ([75d282f](https://gitlab.com/nubabi/mobile/commit/75d282f))
* **library:** new bullets ([1e2fbc5](https://gitlab.com/nubabi/mobile/commit/1e2fbc5))
* **library:** remove center alignment from headers ([e4a247f](https://gitlab.com/nubabi/mobile/commit/e4a247f))
* **login:** add submit handler for login input ([3426382](https://gitlab.com/nubabi/mobile/commit/3426382))
* **login:** increase font size ([60597c5](https://gitlab.com/nubabi/mobile/commit/60597c5))
* **login:** we need to avoid event swallow on ScrollView ([b21c6fa](https://gitlab.com/nubabi/mobile/commit/b21c6fa))
* **measurements:** wrong date being displayed on header ([7be9415](https://gitlab.com/nubabi/mobile/commit/7be9415))
* **native:** RCTRootView copies background color, workaround with NSNotificationCenter listening ([01e9132](https://gitlab.com/nubabi/mobile/commit/01e9132))
* **navigation:** avoid warning on deprecated BackAndroid ([d7b0e7b](https://gitlab.com/nubabi/mobile/commit/d7b0e7b))
* **navigation:** header bg and floating header support ([e7e0228](https://gitlab.com/nubabi/mobile/commit/e7e0228))
* **navigation:** navigate to home after logging in ([04c82c2](https://gitlab.com/nubabi/mobile/commit/04c82c2))
* **navigation:** position close button, match animation to list ([a2b53b7](https://gitlab.com/nubabi/mobile/commit/a2b53b7))
* **navigation:** remove shadow on profile header ([12899ca](https://gitlab.com/nubabi/mobile/commit/12899ca))
* **navigation:** use baby title on profile ([3fc1c98](https://gitlab.com/nubabi/mobile/commit/3fc1c98))
* **navigation:** use black tintColor and "Back" copy ([8c610ed](https://gitlab.com/nubabi/mobile/commit/8c610ed))
* **navigation:** white background for header ([bfe7bdc](https://gitlab.com/nubabi/mobile/commit/bfe7bdc))
* **Pill:** logic error ([1cbb449](https://gitlab.com/nubabi/mobile/commit/1cbb449))
* **profile:** add feedback for Edit Baby button, update snapshots ([703a5f9](https://gitlab.com/nubabi/mobile/commit/703a5f9))
* **profile:** baby age parsing was returning NaN ([85c2bf3](https://gitlab.com/nubabi/mobile/commit/85c2bf3))
* **profile:** cover image is not required ([517c9e1](https://gitlab.com/nubabi/mobile/commit/517c9e1))
* **profile:** header background for Add Baby ([d7ce12a](https://gitlab.com/nubabi/mobile/commit/d7ce12a))
* **reducer:** babies array syntax ([0fb7586](https://gitlab.com/nubabi/mobile/commit/0fb7586))
* **resolvers:** /babies/:id/activities does not use nested data ([498d73e](https://gitlab.com/nubabi/mobile/commit/498d73e))
* **resolvers:** skill areas also don't use nested data ([aed870e](https://gitlab.com/nubabi/mobile/commit/aed870e))
* **schema:** update activity by ID response handling ([83a979f](https://gitlab.com/nubabi/mobile/commit/83a979f))
* **schema:** update content/growth/:id to reflect API ([3821ec2](https://gitlab.com/nubabi/mobile/commit/3821ec2))
* **splash:** always query ID ([8902b55](https://gitlab.com/nubabi/mobile/commit/8902b55))
* **stimulation:** activities in mutations require babyId for steps ([b472216](https://gitlab.com/nubabi/mobile/commit/b472216))
* **stimulation:** activities need edges because of navigation ([0d2ab2d](https://gitlab.com/nubabi/mobile/commit/0d2ab2d))
* **stimulation:** adjust prop in HeaderOverlay ([21fb584](https://gitlab.com/nubabi/mobile/commit/21fb584))
* **stimulation:** Next Week Equipment image resize mode ([795a393](https://gitlab.com/nubabi/mobile/commit/795a393))
* **stimulation:** remove WYNTK header, workaround for button in Growth screen ([0bdecc7](https://gitlab.com/nubabi/mobile/commit/0bdecc7))
* **stimulation:** style for Did You Know card ([66f34da](https://gitlab.com/nubabi/mobile/commit/66f34da))
* **stimulation:** swoop activity payload is different ([8feba31](https://gitlab.com/nubabi/mobile/commit/8feba31))
* **style:** border radius on card images ([9ee2b0a](https://gitlab.com/nubabi/mobile/commit/9ee2b0a))
* match Stimulation header style in Growth ([2239d08](https://gitlab.com/nubabi/mobile/commit/2239d08))
* rename WYNTK button and fix corners ([49767f8](https://gitlab.com/nubabi/mobile/commit/49767f8))
* replace &nbsp with space instead ([9302ce4](https://gitlab.com/nubabi/mobile/commit/9302ce4))
* temp revert to hardcoded SVG for ChooseBaby ([6f6b83d](https://gitlab.com/nubabi/mobile/commit/6f6b83d))
* **style:** content spacing in lists and screens ([cf0fdef](https://gitlab.com/nubabi/mobile/commit/cf0fdef))
* **style:** only left radius for activity/article list item images ([a5ff87d](https://gitlab.com/nubabi/mobile/commit/a5ff87d))
* **style:** promote panel background to Screen ([5bcf08c](https://gitlab.com/nubabi/mobile/commit/5bcf08c))


### Features

* **babies:** update measurements ([4c86980](https://gitlab.com/nubabi/mobile/commit/4c86980))
* **growth:** add content-specific introductions ([b8e5170](https://gitlab.com/nubabi/mobile/commit/b8e5170))
* **growth:** add expert advice ([8dbeaa3](https://gitlab.com/nubabi/mobile/commit/8dbeaa3))
* **growth:** add healthcare notice ([0af2703](https://gitlab.com/nubabi/mobile/commit/0af2703))
* **growth:** add mocked chart and fix cards ([7f4146e](https://gitlab.com/nubabi/mobile/commit/7f4146e))
* **growth:** add period switching ([4a9b5d5](https://gitlab.com/nubabi/mobile/commit/4a9b5d5))
* **growth:** add screen with introduction, what you need to know detail, etc ([350e34a](https://gitlab.com/nubabi/mobile/commit/350e34a))
* **growth:** complete filter, defaults to the current content or last if no content returned ([8e5d962](https://gitlab.com/nubabi/mobile/commit/8e5d962))
* **growth:** display value in selected unit ([39eafb6](https://gitlab.com/nubabi/mobile/commit/39eafb6))
* **growth:** initial update measurement ([0812acc](https://gitlab.com/nubabi/mobile/commit/0812acc))
* **growth:** wire period switching, growth content intro skip ([4dcf4e9](https://gitlab.com/nubabi/mobile/commit/4dcf4e9))
* **library:** add articles section to library screen ([aae645e](https://gitlab.com/nubabi/mobile/commit/aae645e))
* **library:** add new section placeholders ([88f9d83](https://gitlab.com/nubabi/mobile/commit/88f9d83))
* **library:** browse articles view with pull to refresh ([f20e60d](https://gitlab.com/nubabi/mobile/commit/f20e60d))
* **library:** deep linking, links from growth, refactor, etc ([bc47012](https://gitlab.com/nubabi/mobile/commit/bc47012))
* **library:** narrow text in Article card, overlay images ([77bfc52](https://gitlab.com/nubabi/mobile/commit/77bfc52))
* **library:** view article view, reading time, share, etc ([f4bdb62](https://gitlab.com/nubabi/mobile/commit/f4bdb62))
* **libray:** add new images for sections ([6e9ae57](https://gitlab.com/nubabi/mobile/commit/6e9ae57))
* **navigation:** back to eager loading tabs ([3a51aca](https://gitlab.com/nubabi/mobile/commit/3a51aca))
* **profile:** while card tappable for update measurement ([7f792e6](https://gitlab.com/nubabi/mobile/commit/7f792e6))
* **reporting:** add crash reporting, details follow ([b5121e0](https://gitlab.com/nubabi/mobile/commit/b5121e0))
* **routing:** switch to react-navigation, add splash screen (#68) ([eddfbbe](https://gitlab.com/nubabi/mobile/commit/eddfbbe))
* **schema:** add connection params to Activity media ([81e765d](https://gitlab.com/nubabi/mobile/commit/81e765d))
* **schema:** categories, media, quotes, tips and refactor ([b113280](https://gitlab.com/nubabi/mobile/commit/b113280))
* **splash:** add author when available below quote ([37e35e3](https://gitlab.com/nubabi/mobile/commit/37e35e3)), closes [#85](https://gitlab.com/nubabi/mobile/issues/85)
* **splash:** use quotes on splash screen ([75dbc42](https://gitlab.com/nubabi/mobile/commit/75dbc42)), closes [#85](https://gitlab.com/nubabi/mobile/issues/85)
* **stimulation:** add new icons for activities ([97bf327](https://gitlab.com/nubabi/mobile/commit/97bf327))
* **stimulation:** add tips from backend for Did You Know ([3d77edf](https://gitlab.com/nubabi/mobile/commit/3d77edf))
* **stimulation:** begin showing Activity media ([7366268](https://gitlab.com/nubabi/mobile/commit/7366268))
* **stimulation:** initial try for Activity image gallery ([986dba6](https://gitlab.com/nubabi/mobile/commit/986dba6))
* **stimulation:** only flip on triggers, better effect ([d7a305e](https://gitlab.com/nubabi/mobile/commit/d7a305e))
* add splash screen for iOS and random message for React's ([9db9f9f](https://gitlab.com/nubabi/mobile/commit/9db9f9f))
* article style and overhaul ([a52a5d5](https://gitlab.com/nubabi/mobile/commit/a52a5d5))
* strip tags, unescape html, get rid of &nbsp; ([aa5e5d9](https://gitlab.com/nubabi/mobile/commit/aa5e5d9))
* **stimulation:** remove recipes and segmented control ([ea403fb](https://gitlab.com/nubabi/mobile/commit/ea403fb))
* **stimulation:** sort this week and fav activities by skill area ([bb5ce3e](https://gitlab.com/nubabi/mobile/commit/bb5ce3e))
* **stimulation:** use react navigation headers (no fullscreen for now) ([c610eac](https://gitlab.com/nubabi/mobile/commit/c610eac))
* **stimulation:** use templates in steps, remove placeholder, increase font size ([b10b63d](https://gitlab.com/nubabi/mobile/commit/b10b63d))


### Performance Improvements

* persist apollo store data ([a06b672](https://gitlab.com/nubabi/mobile/commit/a06b672))
* first try at preloading/caching images ([6a132a5](https://gitlab.com/nubabi/mobile/commit/6a132a5))
* prefetch ChooseBaby queries and cache remaining images that can be ([80f6729](https://gitlab.com/nubabi/mobile/commit/80f6729))
* **stimulation:** cache skill and expert image in Activity ([47c3ca6](https://gitlab.com/nubabi/mobile/commit/47c3ca6))
* store media on state in Activity ([3cc2781](https://gitlab.com/nubabi/mobile/commit/3cc2781))
