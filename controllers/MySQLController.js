'use strict';

var mysqlConn = require("../config/MySQLdatabase");

exports.list_users = (req, res, next) => {
    let sql = "SELECT id \
                    ,nick_name \
                    ,kudosQTY \
               FROM user;";
    var params = [];

    mysqlConn.query(sql, function (error, rows, fields) {
		if (error) throw error;
        return res.json({"users":rows});
    });
};

exports.find_users = (req, res, next) => {
    let sql = "SELECT id \
                    ,nick_name \
                    ,nombre_real \
               FROM user \
               WHERE nick_name LIKE ? \
               OR nombre_real LIKE ?;";

    let params = ["%" + req.query.nickname + "%", "%" + req.query.nombre + "%"];

    mysqlConn.query(sql, params, function (error, rows, fields) {
        if (error) throw error;
        else {
            if(rows) return res.json({ "users" : rows });
            return res.json({ "users" : "Not Found" });
        }  
    });
};    

exports.user_detail = (req, res, next) => {
        let sql = "SELECT id \
                        ,nick_name \
                        ,nombre_real \
                        ,kudosQTY \
                   FROM user \
                   WHERE id = ?;";
                   
        let params = [req.query.id];
    
        mysqlConn.query(sql, params, function (error, rows, fields) {
            if (error) throw error;
            else {
                if(rows) return res.json({ "users" : rows });
                return res.json({ "user" : "Not Found" });
            }  
        });    
};

exports.add_user = (req, res, next) => {
    let sql = "INSERT INTO user(id, nick_name, nombre_real, kudosQTY) \
               VALUES (?,?,?,?);";
               
    let params = [req.body.id, req.body.nickname, req.body.nombre, req.body.kudos];

    mysqlConn.query(sql, params, function (error, rows, fields) {
        if (error) 
            return res.status(500).send(error);
        else 
            return res.json({inserted:true});
    });    
};

exports.del_user = (req, res, next) => {
    let sql = "DELETE FROM user\
               WHERE id = ?;";
               
    let params = [req.params.id];

    mysqlConn.query(sql, params, function (error, rows, fields) {
        if (error) 
            return res.status(500).send(error);
        else 
            return res.json({deleted:true});
    });    
};

exports.update_kudos = (req, res, next) => {
    let sql = "UPDATE user\
               SET kudosQTY = (kudosQTY + 1) \
               WHERE id = ?;";
               
    let params = [req.params.id];

    mysqlConn.query(sql, params, function (error, rows, fields) {
        if (error) 
            return res.status(500).send(error);
        else 
            return res.json({kudosUpdated:true});
    });    
};