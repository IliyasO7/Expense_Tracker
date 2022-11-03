

const token = localStorage.getItem('token');

const listurl = document.getElementById('listurl-div');

const download  = document.getElementById('downlaod');

window.addEventListener('DOMContentLoaded', async(event)=>{
    event.preventDefault();


    try{

        
        let response = await axios.get('http://localhost:5000/expense/getAllUrl', {headers:{'Authorization': token}})

        if(response.status === 200){
            //some code
            console.log(reponse);
        }


    }
    catch(error){
        console.log(error);
        
    }

})



download.addEventListener('click', async(event)=>{

    event.preventDefault();

    try{

        let reponse = await axios.get('http://localhost:5000/expense/download', {headers:{'Authorization': token}})

        if(response.status == 200){
            //some code
            console.log(response);
        }



    }
    catch(error){
        console.log(error);
    }
    
})



