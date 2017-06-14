<a name="Unreleased"></a>
# Unreleased (2017-06-14)



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

* **data:** persist apollo store data ([a06b672](https://gitlab.com/nubabi/mobile/commit/a06b672))
* first try at preloading/caching images ([6a132a5](https://gitlab.com/nubabi/mobile/commit/6a132a5))
* prefetch ChooseBaby queries and cache remaining images that can be ([80f6729](https://gitlab.com/nubabi/mobile/commit/80f6729))
* **stimulation:** cache skill and expert image in Activity ([47c3ca6](https://gitlab.com/nubabi/mobile/commit/47c3ca6))
* store media on state in Activity ([3cc2781](https://gitlab.com/nubabi/mobile/commit/3cc2781))



