module.exports = {
  "type": 'mysql',
  "url": 'mysql://root:root@localhost/skillfuze-dev',
  "database": 'skillfuze-dev',
  "synchronize": process.env.NODE_ENV !== 'production',
  "logging": process.env.NODE_ENV !== 'production',
  "entities": [`${__dirname}/dist/**/*.entity.js`],
  "migrations": [`${__dirname}/dist/db/migrations/*.js`],
  "cli": {
    "migrationsDir": "db/migrations"
  }
}
