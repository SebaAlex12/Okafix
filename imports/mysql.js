const mysql = require("mysql");

const mysql_db = require("../config/db_config.js");
const mysql_connect = mysql.createConnection(mysql_db);
const mysql_pool = mysql.createPool(mysql_db);

mysql_connect.connect(function(err) {
    if (err) throw err;
});

//https://devdotcode.com/interact-with-mysql-database-using-async-await-promises-in-node-js/

module.exports = {
    fetchAllProducts: function(){
        const sql = `SELECT id FROM produkty`;
        return new Promise((resolve, reject) => {
            mysql_pool.query(sql, (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        })
    },
    getProductById: function(id) {
        const sql = `SELECT id FROM produkty WHERE id = ${id}`;
        return new Promise((resolve, reject)=>{
            mysql_pool.query(sql,  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    },
    insertProduct: function({id,categoryId,name,description1,description2,price,photo,tags}){
        //  insert product to mysql database

        let fileName = name.replace(" ","-");
        fileName = fileName.replace(" ","-");

            const sql = `INSERT INTO produkty (
                id,
                id_kategorii, 
                nazwa,
                nazwa_pliku,
                opis,
                opis2,
                nr,
                widocznosc,
                widoczny_glowna,
                cena,
                img,
                tagi
            ) VALUES (
                ${id},
                ${categoryId}, 
                "${name}",
                "${fileName}",
                "${description1}",
                "${description2}",
                ${id},
                1,
                0,
                ${price},
                "${photo}",
                "${tags}"
            )`;

            return new Promise((resolve, reject) => {
                mysql_pool.query(sql, function (error, result) {
                        // if (err) throw err;
                        if(error){
                           console.log("inserted produkt error", error);
                            return reject(error)
                        }
                        console.log("1 record inserted");
                        return resolve(result)
                    })
                }
            );
    },
    getCategoryById: function(id) {
        const sql = `SELECT id FROM kategorie WHERE id = ${id}`;
        return new Promise((resolve, reject)=>{
            mysql_pool.query(sql,  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    },
    insertCategory: function({id,parentId,name}){
             //  insert category to mysql database

            parentId = parentId == 1 || parentId == null ? -1 : parentId;
            const fileName = name;
            const deepNested = parentId == 1 ? -1 : 0;

                const sql = `INSERT INTO kategorie (
                    id, parent, nazwa, nazwa_pliku, widocznosc, nr, g, title, description, keywords
                    ) VALUES (
                        ${id},
                        ${parentId},
                        "${name}",
                        "${fileName}",
                        1,
                        ${id},
                        ${deepNested},
                        "${name}",
                        "${name}",
                        "${name}"
                    )`;
                return new Promise((resolve, reject) => {
                    mysql_pool.query(sql, function (error, result) {
                            // if (err) throw err;
                            if(error){
                               console.log("inserted category error", error);
                                return reject(error)
                            }
                            console.log("1 record inserted");
                            return resolve(result)
                        })
                })
        }
}