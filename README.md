# <a href='https://skillfuze.com'><img src='https://i.ibb.co/gSBFjHx/skillfuze-logo.png' height='60' alt='Skillfuze Logo' aria-label='skillfuze.com' /></a>

![Circle Ci](https://img.shields.io/circleci/build/github/Skillfuze/skillfuze/master)
![GitHub](https://img.shields.io/github/license/Skillfuze/skillfuze)
![Codecov branch](https://img.shields.io/codecov/c/github/Skillfuze/skillfuze/master)
![Github lerna version](https://img.shields.io/github/lerna-json/v/Skillfuze/skillfuze)

An online learning platform, that utilizes nearly every possible way of interaction from live streaming, uploading videos, writing blogs, and creating courses.

## Requirements

* Yarn
* MySQL
* Redis
* FFmpeg
  
## Installation

```bash
# Clone the repo
$ git clone https://github.com/Skillfuze/skillfuze.git

# Install dependencies
$ yarn
```

You'll need to check the `.env.example` file in each package, and put the required connection strings and api keys before you continue.

## Getting Started

Before trying to run, or build any package, make sure you `cd` to the root directory of the package.

```bash
# Backend
$ yarn build
$ yarn start:dev

# Web Client
$ yarn build
$ yarn start:dev

# Blogs Client
$ yarn build:gatsby
$ yarn start:dev

# UI Components
$ yarn build
$ yarn start

# Types
$ yarn build
```

## Contributors

* [Khaled Mohamed](https://github.com/khaled-hamam)
* [Karim Elsayed](https://github.com/Karimelsayed98)
* [Rawan Ashraf](https://github.com/Rawan1998)
* [Chantal Chawki](https://github.com/chantalchawki)
* [Mariam Kamel](https://github.com/mariamkamel)

## License

Skillfuze is [MIT licensed](./LICENSE).
