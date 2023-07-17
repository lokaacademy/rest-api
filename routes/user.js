const { response } = require("express")

const userRoute = (app, fs) => {

    const dataPath = process.cwd() + '/data/user.json'

    const getUserData = () => {
        const jsonData = fs.readFileSync(dataPath)
        return JSON.parse(jsonData)   
    }

    const postUserData = (data) => {
        const userData = JSON.stringify(data)
        fs.writeFileSync(dataPath, userData)
    }

    /*
       fungsi -> input (data) -> output (callback) (void) : functional programming

       const <nama_fungsi> = () => {

       }
       
       PHP
       function <nama_fungsi>(<data/callback>){
              
       }
    */

       const getResponse = (code, message, data) => {
            const res = {
                "code": code,
                "message": message,
                "data": data
            }
            return res
       }
     

    // endpoint get users data
    app.get('/users', (request, result) => {
        const users = getUserData()
        const code = response.statusCode
        let message = 'list data users'
        
        if(code !== 200){
            const error_message = response.statusMessage
            message = "Error " + error_message    
        } 
        const res = getResponse(code, message, users)
        result.send(res)
      })

    // endpoint post users data
    app.post('/user', (request, result) => {

        const data = request.body
        
        // get existing data
        let usersData = getUserData() 

        // get last key 
        const last_key = Object.keys(usersData).pop()
        
        // create new key
        const new_key = parseInt(last_key) + 1 
        
        // create new data
        usersData[new_key] = data

        // post new data
        postUserData(usersData)

        // get new list data
        const users = getUserData()
        
        // get response code
        const code = response.statusCode
        let message = 'Data berhasil di simpan'
        
        if(code !== 200){
            const error_message = response.statusMessage
            message = "Error " + error_message    
        } 
        const res = getResponse(code, message, users)
        result.send(res)
      })

      // endpoint put users data
    app.put('/user/:id', (request, result) => {
        const id = request.params.id

        const new_data = request.body

        // ambil user data
        let usersData = getUserData()

        // ambil user data yang mau diubah
        let userData = usersData[id] 

        userData = new_data
        usersData[id] = userData

        postUserData(usersData)
                
        
        // get new list data
        const users = getUserData()
        
        // get response code
        const code = response.statusCode
        let message = 'Data berhasil di simpan'
        
        if(code !== 200){
            const error_message = response.statusMessage
            message = "Error " + error_message    
        } 
        const res = getResponse(code, message, users)
        result.send(res)
      })
      
}
module.exports = userRoute