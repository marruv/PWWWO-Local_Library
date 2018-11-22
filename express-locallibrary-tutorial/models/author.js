var mongoose = require('mongoose');

var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Shows author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Shows author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  var both_dates = '';
  if (this.date_of_birth) {
      both_dates = moment(this.date_of_birth).format('MMMM Do, YYYY');
      }
  both_dates += ' - ';
  if (this.date_of_death) {
      both_dates += moment(this.date_of_death).format('MMMM Do, YYYY');
      }
  return both_dates
});

// Shows author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);