const API_END_POINT = "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev"

// export const request = (nodeId) => {

//     fetch(`${API_END_POINT}/${nodeId ? nodeId : ''}`)
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error('http error')
//             }
//             return response.json()
//         })
//         .then((myJson) => {
//             console.log(JSON.stringify(myJson))
//         })
//         .catch((e) => {
//             throw new Error(`${e.message}`)
//         })
// }

export const request = async (nodeId) => {
    try {
        const res = await fetch(`${API_END_POINT}/${nodeId ? nodeId : ''}`)
        if (!res.ok){
            throw new Error('server error')
        } 
        return await res.json()
    } catch(e){
        throw new Error(`Error - ${e.message}`)
    }
}
