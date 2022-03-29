module.exports = {
  name: 'default',
  type: 'mysql',
  url: 'mysql2://root:@localhost:3306/factory',
  database: 'factory',
  migrations: ['./src/migrations/*.ts'],
  cli: {
    migrationsDir: './src/migrations/'
  },
}
