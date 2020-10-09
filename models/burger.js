const { updateOne } = require("../config/orm.js")
var orm = require("../config/orm.js")


var burgers = {
    selectAll: function(cbController){
     orm.selectAll("burgers", function(data){
         cbController(data)
     })
    },
    insertOne: function(columnNamesArr, valuesArr,  cbController){
        orm.insertOne("burgers", columnNamesArr, valuesArr, function(data){
            cbController(data)
        })
    },
    updateOne: function(colValues, condition, cbController){
        orm.updateOne("burgers", colValues, condition, function(data){
            cbController(data);
        });
    }
};

module.exports = burgers;