# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="2.1.1"></a>
## [2.1.1](https://gitlab.com/nubabi/mobile/compare/nubabi-graphql-server@2.1.0...nubabi-graphql-server@2.1.1) (2017-12-27)




**Note:** Version bump only for package nubabi-graphql-server

<a name="2.1.0"></a>
# [2.1.0](https://gitlab.com/nubabi/mobile/compare/nubabi-graphql-server@2.0.1...nubabi-graphql-server@2.1.0) (2017-12-22)


### Features

* real user data  to settings sidebar and user details ([9fc5176](https://gitlab.com/nubabi/mobile/commit/9fc5176))




<a name="2.0.1"></a>
## [2.0.1](https://gitlab.com/nubabi/mobile/compare/nubabi-graphql-server@2.0.0...nubabi-graphql-server@2.0.1) (2017-12-21)




**Note:** Version bump only for package nubabi-graphql-server

<a name="2.0.0"></a>
# [2.0.0](https://gitlab.com/nubabi/mobile/compare/nubabi-graphql-server@1.3.0...nubabi-graphql-server@2.0.0) (2017-12-19)


### Bug Fixes

* **graphql-server:** add loaders to server init ([199e1c5](https://gitlab.com/nubabi/mobile/commit/199e1c5))
* **graphql-server:** use full `UserRecord` when assigning `currentUser` ([3092d31](https://gitlab.com/nubabi/mobile/commit/3092d31))
* **schema:** remove Node from types that can't be fetched individually ([d5b4aeb](https://gitlab.com/nubabi/mobile/commit/d5b4aeb))


### Features

* **graphql-server:** add ping endpoint for test and cold starts ([4f3ff6b](https://gitlab.com/nubabi/mobile/commit/4f3ff6b))
* move account linking to core ([5c50e71](https://gitlab.com/nubabi/mobile/commit/5c50e71))
* move to serverless graphql with GCF ([6c4e556](https://gitlab.com/nubabi/mobile/commit/6c4e556))
* remove file upload from server and `FileInputBase64` ([35f44a5](https://gitlab.com/nubabi/mobile/commit/35f44a5))
* update Firebase server and fixes ([a61ceac](https://gitlab.com/nubabi/mobile/commit/a61ceac))
* **graphql-server:** error reporting and sourcemap support ([d76e7af](https://gitlab.com/nubabi/mobile/commit/d76e7af))
* **graphql-server:** switch uploads to Cloud Storage ([34c647f](https://gitlab.com/nubabi/mobile/commit/34c647f))
* **memories:** enable EXIF metadata storage for memories ([bb66439](https://gitlab.com/nubabi/mobile/commit/bb66439))


### BREAKING CHANGES

* Server does no longer do file uploads. We expect file fields
in mutations to include an already-working `url` in Firebase Storage. In
addition, `FileInputBase64` has been removed to better reflect that we were
using `FileInput` with an `url`.




<a name="1.3.0"></a>
# [1.3.0](https://gitlab.com/nubabi/mobile/compare/nubabi-graphql-server@1.2.2...nubabi-graphql-server@1.3.0) (2017-12-11)


### Bug Fixes

* **schema:** add connection params to Viewer.babies ([50ecdc5](https://gitlab.com/nubabi/mobile/commit/50ecdc5))


### Features

* **profile:** delete baby ([319a970](https://gitlab.com/nubabi/mobile/commit/319a970))




<a name="1.2.2"></a>
## [1.2.2](https://gitlab.com/nubabi/mobile/compare/nubabi-graphql-server@1.2.1...nubabi-graphql-server@1.2.2) (2017-12-11)


### Bug Fixes

* **schema:** deprecate {created,changed} in payloads, use edge instead ([8847d22](https://gitlab.com/nubabi/mobile/commit/8847d22))




<a name="1.2.1"></a>
## [1.2.1](https://gitlab.com/nubabi/mobile/compare/nubabi-graphql-server@1.2.0...nubabi-graphql-server@1.2.1) (2017-12-06)


### Performance Improvements

* **schema:** dataloader for activities and experts ([3afd1ed](https://gitlab.com/nubabi/mobile/commit/3afd1ed))




<a name="1.2.0"></a>
# [1.2.0](https://gitlab.com/nubabi/mobile/compare/nubabi-graphql-server@1.1.0...nubabi-graphql-server@1.2.0) (2017-12-06)


### Features

* add memories from activities and display on list ([ad73e88](https://gitlab.com/nubabi/mobile/commit/ad73e88))




<a name="1.1.0"></a>
# [1.1.0](https://gitlab.com/nubabi/mobile/compare/nubabi-graphql-server@1.0.0...nubabi-graphql-server@1.1.0) (2017-12-04)


### Features

* **auth:** account linking and unlinking plus display ([568a640](https://gitlab.com/nubabi/mobile/commit/568a640))




<a name="1.0.0"></a>
# 1.0.0 (2017-11-27)


### Features

* individual dependencies, workaround victory-chart error ([a101ea6](https://gitlab.com/nubabi/mobile/commit/a101ea6))
