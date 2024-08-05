module.exports = {
    client: 'pg',
    pool: {
        min: 0,
        max: 10
    },
    connection: {
        host: process.env.DBHOST,
        port: process.env.DBPORT,
        database: process.env.DBDATABASE,
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
    },
    migration: {
        directory: './migrations/',
        tableName: 'knex_migrations'
    },
    seeds: {
        directory: './seeds/',
    },
};