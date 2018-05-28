# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Update React to v.16.4.0 - [Changelog](https://reactjs.org/blog/2018/05/23/react-v-16-4.html)
- Change componentWillReceiveProps to componentDidUpdate [Migration Guide](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#side-effects-on-props-change)
- Change componentWillMount to componentDidMount (Migration Guide)[https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#fetching-external-data] 

## [1.0.1] – 2018-03-02
### Added
- Plop generator for React Redux container
- Plop generator for React components
- Ramda dependency

### Changed
- Update react-hot-loader to v4 release

## 1.0.0 – 2018-03-02
### Added
- This CHANGELOG file.
- Plop generator for redux modules kept in `app/modules` directory. It also appends generated reducer to root 
reducer and generated saga to root saga.

### Changed
- [**BREAKING**] [styled-component](https://github.com/styled-components/styled-components) as a primary way of styling
elements
- Update [react-hot-loader](https://github.com/gaearon/react-hot-loader) to v4 (beta-22)
- Hide component from [webpack-appversion-plugin](https://github.com/apptension/webpack-appversion-plugin) in 
development env by default
- Update React to v16.2
- Update redux-saga to v0.16
- Update jest to v22.3
- Update sinon to v4.3
- Update other less important dependencies

### Removed
- [**BREAKING**] SASS support

[Unreleased]: https://github.com/apptension/react-boilerplate/compare/1.0.1...HEAD
[1.0.1]: https://github.com/apptension/react-boilerplate/compare/1.0.0...1.0.1

