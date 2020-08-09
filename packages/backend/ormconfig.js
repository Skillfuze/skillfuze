module.exports = {
  "type": 'mysql',
  "url": process.env.MYSQL_URL || 'mysql://root:root@localhost/skillfuze-dev',
  "database": process.env.MYSQL_DB || 'skillfuze-dev',
  "synchronize": process.env.NODE_ENV !== 'production',
  "logging": process.env.NODE_ENV !== 'production',
  "entities": [`${__dirname}/dist/**/*.entity.js`],
  "migrations": [`${__dirname}/dist/db/migrations/*.js`],
  "cli": {
    "migrationsDir": "db/migrations"
  }
}
