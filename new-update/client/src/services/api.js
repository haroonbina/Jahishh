export const checkuserPost = (admin, password) => {
        return new Promise((resolve, reject) => {
            const sendData = {
            admin,
            password
        }
            fetch('/checkuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sendData)
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        resolve(data)
                    }).catch(error => {
                        reject(error)
                    })
                } else {
                    reject(new Error('Cannot send data to server. response number is: ' + response.status))
   
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

export const addRoomPost = (rooms, deviceSerial_no, max_people_number, current_people_number) => {
    return new Promise((resolve, reject) => {
        const fd = new FormData()
        fd.append('rooms', rooms)
        fd.append('deviceSerial_no', deviceSerial_no)
        fd.append('max_people_number', max_people_number)
        fd.append('current_people_number', current_people_number)
        fetch('/addroom', {
            method: 'POST',
            body: fd,
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
export const changePasswordPost = (oldPassword, newPassword, reNewPassword) => {
    return new Promise((resolve, reject) => {
        const fd = new FormData()
        fd.append('oldPassword', oldPassword)
        fd.append('newPassword', newPassword)
        fd.append('reNewPassword', reNewPassword)
        fetch('/changepassword', {
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

export const logoutPost = () => {
    return new Promise((resolve, reject) => {
        fetch('/logout', {
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