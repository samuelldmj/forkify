
const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };


export const getJSON = async function(url){
    try {
        const res = await Promise.race([fetch(`${url}`), timeout(10)]);
        
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} ${data.status}`);

        //testing the api calls
        // console.log("res =",res);
        // console.log("data = ", data);
        return data;
    } catch(err){
        throw(err);
    }
   
}