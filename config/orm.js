var connection = require("../config/connection.js");

function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
  
function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

var orm = {
    selectAll: function (tableInput, cbModel) {
        var queryString = "SELECT * FROM ??"
        connection.query(queryString, tableInput, function (err, data) {
            cbModel(data)
        })
    },

    insertOne: function (tableInput, columnNamesArr, valuesArr, cbModel) {
        connection.query("INSERT into ?? (??,??) VALUES (?,?)", [tableInput, columnNamesArr[0], columnNamesArr[1], valuesArr[0], valuesArr[1]], function (err, data) {
            cbModel(data)
        })
    },

    updateOne: function (table, colValues, condition, cbModel) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(colValues);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function (err, data) {
            if (err) {
                throw err;
            }
                cbModel(data);
        });
    }
};

module.exports = orm;