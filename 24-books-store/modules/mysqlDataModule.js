const passwordHash = require('password-hash')
// const {MongoClient, ObjectID} = require('mongodb')
const mySql = require('mysql')
const fs = require('fs')
// const connectionString = 'mongodb+srv://fbw5:5vT2OVt8eSTwntF8@cluster0-rmrmn.mongodb.net/test1?retryWrites=true&w=majority'


// get Schema object
// const Schema = mongoose.Schema
// creat new users schema
// const usersSchema = new Schema({
//     email:{
//         type: String,
//         unique: true,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// })
// // creat Books schema
// const bookSchema = new Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String
//     },
//     pdfUrl: {
//         type: String,
//         required: true
//     },
//     imgs: {
//         type: [String],
//         required: true,
//         min: 1
//     },
//     userid: {
//         type: String,
//         required: true
//     }
// })

// // creat Users model
// const Users = mongoose.model('users', usersSchema)
// // creat Books model
// const Books = mongoose.model('books', bookSchema)

// declare con
let con = null

function connect() {
    return new Promise((resolve, reject) => {
        if (con) {
            if (con.state === 'disconnected') {
                con.connect(error => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve()
                    }
                })
            } else {
                resolve()
            }
        } else {
            con = mySql.createConnection({
                multipleStatements: true,
                host: 'localhost',
                port: 3306,
                user: 'root',
                password: '1234qweR!',
                database: 'fbw5_test'
            })
            con.connect(error => {
                if (error) {
                    reject(error)
                } else {
                    resolve()
                }
            })
        }
    })
}

function runQuery(queryString) {
    return new Promise((resolve, reject) => {
        connect().then(() => {
            con.query(queryString, (error, result, fields) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        }).catch(error => {
            reject(error)
        })
    })
}

function registerUser(email, password) {
    return new Promise((resolve, reject) => {
        // "INSERT INTO users (email, password) VALUES ('" + email + "', '" + passwordHash.generate(password) + "')"
        runQuery(`INSERT INTO users (email, password) VALUES ('${email}', '${passwordHash.generate(password)}')`).then(() => {
            resolve()
        }).catch(error => {
            if (error.errno === 1062) {
                reject('exist')
            } else {
                reject(error)
            }
        })
    })
}

function checkUser(email, password) {
    return new Promise((resolve, reject) => {
        // any result from SELECT query will be return as an array (empty array or array with one element or array with many elements)
        runQuery(`SELECT * FROM users where email like '${email}'`).then(result => {
            console.log(result)
            if (result.length === 0) {
                reject(4)
            } else {
                if (passwordHash.verify(password, result[0].password)) {
                    result[0]._id = result[0].id
                    resolve(result[0])
                } else {
                    reject(3)
                }
            }
        }).catch(error => {
            reject(error)
        })
    })
}
// make title and user id on books table unique together
// ALTER TABLE books ADD UNIQUE `book_title`(userid, title);
// make imgUrl and book id in imgs table unique together
// ALTER TABLE imgs ADD UNIQUE `img_url`(bookid, imgUrl);
function addBook(bookTitle, bookDescription, bookPdf, bookImgs, userid) {
    return new Promise((resolve, reject) => {
        // set a new pdf file name
        let pdfName = bookTitle.trim().replace(/ /g, '_') + '_' + userid + '.pdf'
        // move the pdf file with the new name to uploadedfiles folder
        bookPdf.mv('./public/uploadedfiles/' + pdfName)
        // set the pdf url that gonna be saved in the json file
        let pdfNewUrl = '/uploadedfiles/' + pdfName
        runQuery(`INSERT INTO books (title, description, pdfUrl, userid) VALUES 
        ('${bookTitle}', '${bookDescription}', '${pdfNewUrl}', ${userid})`).then(result => {
            let saveImgsQuery = ''
            bookImgs.forEach((img, idx) => {
                // get file extension
                let ext = img.name.substr(img.name.lastIndexOf('.'))
                // set the new image name
                let newName = bookTitle.trim().replace(/ /g, '_') + '_' + userid + '_' + idx + ext
                img.mv('./public/uploadedfiles/' + newName)
                const imgUrl = '/uploadedfiles/' + newName
                saveImgsQuery += `INSERT INTO imgs (imgUrl, bookid) VALUES ('${imgUrl}', ${result.insertId});`
                //imgsArr.push('/uploadedfiles/' + newName)
            });
            runQuery(saveImgsQuery).then(() => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        }).catch(error => {
            if (error.errno === 1062) {
                reject(3)
            } else {
                reject(error)
            }
        })
    })
}



function getAllBooks() {
    return new Promise((resolve, reject) => {
        runQuery('SELECT books.*, imgs.* FROM books INNER JOIN imgs on books.id = imgs.bookid').then(results => {
            const books = []
            results.forEach(result => {
                // search if the book has been added to books array
                let book = books.find(element => element.id === result.bookid)
                if (book){
                    // if the book is added before, we need  only to append the imgs property with the new imgurl
                    book.imgs.push(result.imgUrl)
                } else {
                    // if the book is not added to books, 
                    // we need to add it to books and set imgs as new array with one element imgurl
                    books.push({
                        _id: result.bookid,
                        id: result.bookid,
                        title: result.title,
                        description: result.description,
                        pdfUrl: result.pdfUrl,
                        userid: result.userid,
                        imgs: [result.imgUrl]
                    })
                }
            })
            resolve(books)
        }).catch(error => {
            reject(error)
        })
    })
}
function getBook(id) {
    return new Promise((resolve, reject) => {
        runQuery(`SELECT books.* , imgs.* FROM books INNER JOIN imgs ON imgs.bookid = books.id wHERE imgs.bookid = ${id}`).then(results => {
            if (results.length) {
                const book = {}
                results.forEach(result => {
                    if(book.id) {
                        book.imgs.push(result.imgUrl)
                    } else {
                        book._id = result.bookid
                        book.id = result.bookid
                        book.title = result.title
                        book.description = result.description
                        book.pdfUrl = result.pdfUrl
                        book.userid = result.userid
                        book.imgs = [result.imgUrl]
                    }
                })
                resolve(book)
            } else {
                reject(new Error('can not find a book with this id : ' + id))
            }
        }).catch(error => {
            reject(error)
        })
    })
}

function userBooks(userid) {
    return new Promise((resolve, reject) => {
        runQuery(`SELECT books.*, imgs.* FROM books INNER JOIN imgs on books.id = imgs.bookid WHERE books.userid = ${userid}`).then(results => {
            const books = []
            results.forEach(result => {
                // search if the book has been added to books array
                let book = books.find(element => element.id === result.bookid)
                if (book){
                    // if the book is added before, we need  only to append the imgs property with the new imgurl
                    book.imgs.push(result.imgUrl)
                } else {
                    // if the book is not added to books, 
                    // we need to add it to books and set imgs as new array with one element imgurl
                    books.push({
                        _id: result.bookid,
                        id: result.bookid,
                        title: result.title,
                        description: result.description,
                        pdfUrl: result.pdfUrl,
                        userid: result.userid,
                        imgs: [result.imgUrl]
                    })
                }
            })
            resolve(books)
        }).catch(error => {
            reject(error)
        })
    })
}


function updateBook(bookid, newBookTitle, oldImgsUrls, bookDescription, newPdfBook, newImgs, userid) {
    return new Promise((resolve, reject) => {
        try {
            (async () => {
                let oldBookData = await getBook(bookid)
                if(oldBookData.userid === userid){
                const deletedImgs = []
                const keepImgs = []
                // get update version number
                // let updateNum = 1
                // if(oldBookData.update){
                //     updateNum = oldBookData.update +1
                // }

                // check which images user wants to keep and which to delete
                oldBookData.imgs.forEach(img => {
                    if (oldImgsUrls.indexOf(img) >= 0) {
                        keepImgs.push(img)
                    } else {
                        deletedImgs.push(img)
                    }
                })
                // save new images to file system and to array to be saved to db
                let newImgsQuery = ''
                const currentTime = Date.now()
                newImgs.forEach((img, idx) => {
                    const imgExt = img.name.substr(img.name.lastIndexOf('.'))
                    const newImgName = newBookTitle.trim().replace(/ /g, '_') + '_' + userid + '_' + idx + '_' + currentTime + imgExt
                    //newImgsUrlsArr.push('/uploadedfiles/' + newImgName)
                    const newImgUrl = '/uploadedfiles/' + newImgName
                    newImgsQuery += `INSERT INTO imgs (imgUrl, bookid) VALUES ('${newImgUrl}', ${bookid} );`
                    img.mv('./public/uploadedfiles/' + newImgName)
                })
                // delete the deleted images files from the system
                let deleteImgQuery = ''
                deletedImgs.forEach(file => {
                    // first check file is exist
                    deleteImgQuery += `DELETE FROM imgs WHERE imgUrl like '${file}' AND bookid = ${bookid};`
                    if (fs.existsSync('./public' + file)) {
                        fs.unlinkSync('./public' + file)
                    }
                })
                // check if user upload a new pdf file and move it to the same place of the old one so it will OVERWRITE it
                if (newPdfBook) {
                    newPdfBook.mv('./public' + oldBookData.pdfUrl)
                }
                await runQuery(`UPDATE books SET title = '${newBookTitle}', description = '${bookDescription}' WHERE id = ${bookid};` 
                + deleteImgQuery + newImgsQuery)

                getBook(bookid).then(book => {
                    resolve(book)
                }).catch(error => {
                    reject(error)
                })
            }
            else {
                reject('hack')
            }
                // await connect()
                // delete const db = client.db('test1')
                // await Books.updateOne({
                //     _id: bookid
                // }, {

                //     title: newBookTitle,
                //     description: bookDescription,
                //     imgs: [...keepImgs, ...newImgsUrlsArr],
                //     //delete update: updateNum,
                //     $inc: {
                //         __v: 1
                //     }

                // })
                // delete client.close()
                //resolve()

            })()
        } catch (error) {
            reject(error)
        }
    })
}

function deleteBook(bookid, userid) {
    return new Promise((resolve, reject) => {
        getBook(bookid).then(book => {
            // check if the book belong to the current login user
            if (book.userid === userid) {
                // delete book images
                book.imgs.forEach(img => {
                    //check the img file is exist then delete it
                    if (fs.existsSync('./public' + img)) {
                        fs.unlinkSync('./public' + img)
                    }
                })
                // delete pdf file
                // check if pdf file is exist then delete it
                if (fs.existsSync('./public' + book.pdfUrl)) {
                    fs.unlinkSync('./public' + book.pdfUrl)
                }
                // connect().then(client => {
                // const db = client.db('test1')
                Books.deleteOne({
                    _id: bookid
                }).then(() => {
                    // client.close()
                    resolve()
                }).catch(error => {
                    // client.close()
                    reject(error)
                })
                // }).catch(error => {
                //     reject(error)
                // })
            } else {
                reject(new Error('hacking try. not this time'))
            }
        }).catch(error => {
            reject(error)
        })
    })

}
module.exports = {
    registerUser,
    checkUser,
    addBook,
    getAllBooks,
    getBook,
    userBooks,
    updateBook,
    deleteBook
}