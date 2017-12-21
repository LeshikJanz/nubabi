# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="2.0.1"></a>
## [2.0.1](https://gitlab.com/nubabi/mobile/compare/nubabi-core@2.0.0...nubabi-core@2.0.1) (2017-12-21)


### Bug Fixes

* force refresh on token accessor ([56aeb3b](https://gitlab.com/nubabi/mobile/commit/56aeb3b))




<a name="2.0.0"></a>
# [2.0.0](https://gitlab.com/nubabi/mobile/compare/nubabi-core@1.4.0...nubabi-core@2.0.0) (2017-12-19)


### Bug Fixes

* `Promise.prototype.finally` is becoming ES, fix RN check ([5fb9c51](https://gitlab.com/nubabi/mobile/commit/5fb9c51))
* apollo memoization path in initialization ([a361956](https://gitlab.com/nubabi/mobile/commit/a361956))
* update usage of edges in Baby responses ([b7958fa](https://gitlab.com/nubabi/mobile/commit/b7958fa))


### Features

* add upload interceptor and upload root to components ([fececd1](https://gitlab.com/nubabi/mobile/commit/fececd1))
* move account linking to core ([5c50e71](https://gitlab.com/nubabi/mobile/commit/5c50e71))
* prepare core for native Firebase SDK ([f1345ee](https://gitlab.com/nubabi/mobile/commit/f1345ee))
* remove file upload from server and `FileInputBase64` ([35f44a5](https://gitlab.com/nubabi/mobile/commit/35f44a5))
* update Firebase server and fixes ([a61ceac](https://gitlab.com/nubabi/mobile/commit/a61ceac))
* use server GraphQL ([490fedb](https://gitlab.com/nubabi/mobile/commit/490fedb))


### BREAKING CHANGES

* Server does no longer do file uploads. We expect file fields
in mutations to include an already-working `url` in Firebase Storage. In
addition, `FileInputBase64` has been removed to better reflect that we were
using `FileInput` with an `url`.
* `configureDeps` now expects `firebase` to be passed through
`platformDeps`. Firebase should now be initialized by the caller of
`configureStore`, and we no longer import Web SDK by default.
* client network interface is no longer available,
new setup requires a running GraphQL server at `config.graphqlEndpoint`
which gets derived from `NUBABI_GRAPHQL_ENDPOINT` env var.




<a name="1.4.0"></a>
# [1.4.0](https://gitlab.com/nubabi/mobile/compare/nubabi-core@1.3.1...nubabi-core@1.4.0) (2017-12-11)


### Features

* **profile:** delete baby ([319a970](https://gitlab.com/nubabi/mobile/commit/319a970))




<a name="1.3.1"></a>
## [1.3.1](https://gitlab.com/nubabi/mobile/compare/nubabi-core@1.3.0...nubabi-core@1.3.1) (2017-12-06)


### Performance Improvements

* **schema:** dataloader for activities and experts ([3afd1ed](https://gitlab.com/nubabi/mobile/commit/3afd1ed))




<a name="1.3.0"></a>
# [1.3.0](https://gitlab.com/nubabi/mobile/compare/nubabi-core@1.2.1...nubabi-core@1.3.0) (2017-12-06)


### Features

* add memories from activities and display on list ([ad73e88](https://gitlab.com/nubabi/mobile/commit/ad73e88))




<a name="1.2.1"></a>
## [1.2.1](https://gitlab.com/nubabi/mobile/compare/nubabi-core@1.2.0...nubabi-core@1.2.1) (2017-12-04)


### Bug Fixes

* **auth:** disallow sign-ups via Facebook on mobile ([5d50e6a](https://gitlab.com/nubabi/mobile/commit/5d50e6a))




<a name="1.2.0"></a>
# [1.2.0](https://gitlab.com/nubabi/mobile/compare/nubabi-core@1.1.0...nubabi-core@1.2.0) (2017-12-04)


### Features

* **auth:** account linking and unlinking plus display ([568a640](https://gitlab.com/nubabi/mobile/commit/568a640))
* **auth:** add Facebook login ([1a2dff3](https://gitlab.com/nubabi/mobile/commit/1a2dff3))
* **auth:** deprecate `loginRequest` with email, password as args ([1503171](https://gitlab.com/nubabi/mobile/commit/1503171))




<a name="1.1.0"></a>
# [1.1.0](https://gitlab.com/nubabi/mobile/compare/nubabi-core@1.0.0...nubabi-core@1.1.0) (2017-11-30)


### Bug Fixes

* export Activity and Memory connection types ([4c32ade](https://gitlab.com/nubabi/mobile/commit/4c32ade))


### Features

* expose environment at runtime ([19990e7](https://gitlab.com/nubabi/mobile/commit/19990e7))
* **memories:** add new edit image ([40be4cc](https://gitlab.com/nubabi/mobile/commit/40be4cc))
* **system:** add error boundary ([510f839](https://gitlab.com/nubabi/mobile/commit/510f839))




<a name="1.0.0"></a>
# 1.0.0 (2017-11-27)


### Bug Fixes

* move resolutions to native package.json ([c8dfd50](https://gitlab.com/nubabi/mobile/commit/c8dfd50))
* move victory-chart out of core ([2b691be](https://gitlab.com/nubabi/mobile/commit/2b691be))


### Features

* individual dependencies, workaround victory-chart error ([a101ea6](https://gitlab.com/nubabi/mobile/commit/a101ea6))
