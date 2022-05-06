module.exports = {
    test:{
        client: 'pg',
        version: '11',
        connection: {
            host: 'localhost',
            user: 'admin',
            password:'123456',
            database:'financial-db',
        },
        migrations: {
            directory: 'src/migrations',
        },
    },
}