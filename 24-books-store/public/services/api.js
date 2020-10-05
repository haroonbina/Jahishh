
export const registerPost = (email, password, repassword) => {
    const sendData = {
        email,
        password,
        repassword
    }
    return new Promise((resolve, reject) => {
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)
        }).then(response => {
            if (response.status === 200) {
                response.json().then(recievedData => {
                    resolve(recievedData)
                }).catch(error => {
                    reject(error)
                })
            } else {
                reject(new Error('can not send data to server. response number is: ' + response.status))
            }
        }).catch(error => {
            reject(error)
        })
    })
}

export const loginPost = (email, password) => {
    return new Promise((resolve, reject) => {
        const data = {
            email,
            password
        }
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            } else {
                reject(new Error('can not send the data, response number is: ' + response.status))
            }
        }).catch(error => {
            reject(error)
        })
    })
}

export const addBookPost = (bookTitle, bookDescription, bookPdf, bookImgs) => {
    return new Promise((resolve, reject) => {
        const fd = new FormData()
        fd.append('bookTitle', bookTitle)
        fd.append('bookDescription', bookDescription)
        for (let i = 0; i < bookImgs.length; i++) {
            fd.append('bookImg' + i, bookImgs[i])
        }
        fd.append('bookPdf', bookPdf)

        fetch('/admin/addbook', {
            method: 'POST',
            body: fd
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            } else {
                reject(new Error('can not send the data, response number is: ' + response.status))
            }
        }).catch(error => {
            reject(error)
        })
    })
}

export const allBooksPost = () => {
    return new Promise((resolve, reject) => {
        fetch('/getallbooks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200 ){
                response.json().then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            }else {
                reject(new Error('can not get the data, response number is: ' + response.status))
            }
        }).catch(error => {
            reject(error)
        })
    })
}

export const getBookPost = (bookId) => {
    return new Promise((resolve, reject) => {
        const data = {
            id: bookId
        }
        fetch('/getbook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            } else {
                reject(new Error('can not get the data, response number is: ' + response.status))
            }
        }).catch(error => {
            reject(error)
        })
    })
}

export const myBooksPost = () => {
    return new Promise((resolve, reject) => {
        fetch('/admin/mybooks', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200){
                response.json().then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            }else {
                reject(new Error('can not get the data, response number is: ' + response.status))
            }
        }).catch(error => {
            reject(error)
        })
    })
}

export const deleteBookPost = (bookid) => {
    return new Promise((resolve, reject) => {
        const data = {
            bookid
        }
        fetch('/admin/deletebook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status === 200 ) {
                response.json().then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            } else {
                reject(new Error('can not get the data, response number is: ' + response.status))
            }
        }).catch(error => {
            reject(error)
        })
    })
} 

export const editBookPost = (bookTitle, bookDescription, bookOldImgs, booknewImgs, bookPdf, bookid) => {
    return new Promise((resolve, reject) => {
        const fd = new FormData()
        fd.append('bookid', bookid)
        fd.append('newBookTitle', bookTitle)
        fd.append('oldImgsUrls',JSON.stringify(bookOldImgs))
        for (let i = 0; i < booknewImgs.length; i++) {
            fd.append('bookImg' + i, booknewImgs[i])
        }
        if (bookPdf) {
            fd.append('bookPdf', bookPdf)
        }
        fd.append('bookDescription', bookDescription)
        fetch('/admin/editbook', {
            method: 'POST',
            body: fd
        }).then(response => {
            if(response.status === 200) {
                response.json().then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            } else {
                reject(new Error('can not get the data, response number is: ' + response.status))
            }
        }).catch(error => {
            reject(error)
        })
    })
}

export const logoutPost = () => {
    return new Promise((resolve, reject) => {
        fetch('/admin/logout', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            } else {
                reject(new Error('can not get the data, response number is: ' + response.status))
            }
        }).catch(error => {
            reject(error)
        })
    })
}


export const checkLoginPost = () => {
    return new Promise((resolve, reject) => {
        fetch('/checklogin', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            } else {
                reject(new Error('can not get the data, response number is: ' + response.status))
            }
        }).catch(error => {
            reject(error)
        })
    })
}