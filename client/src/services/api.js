export const checkuserPost = (admin, password) => {
    return new Promise((resolve, reject) => {
        const sendData = {
            admin,
            password
        }
        return new Promise((resolve, reject) => {
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
    })
}