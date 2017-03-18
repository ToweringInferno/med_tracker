var mysql = require('mysql');

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'medschedules'
  },
    useNullAsDefault: true
});

knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100);
      user.string('password', 100);
      user.string('phone', 100);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

knex.schema.hasTable('meds').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('meds', function (med) {
      med.increments('id').primary();
      med.string('medname', 200);
      med.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

knex.schema.hasTable('schedules').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('schedules', function (schedule) {
      schedule.increments('id').primary();
      schedule.time('time', 100);
      schedule.boolean('taken');
      // schedule.integer('meds_id').unsigned();
      schedule.integer('meds_id').references('id').inTable('meds').notNull().onDelete('cascade');
      // schedule.integer('users_id').unsigned();
      schedule.integer('users_id').references('id').inTable('users').notNull().onDelete('cascade');
      schedule.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});


module.exports = knex;


// var connection = mysql.createConnection({
//   user: 'root',
//   password: '',
//   database: 'medschedules'
// });

// connection.connect();

// module.exports = connection;