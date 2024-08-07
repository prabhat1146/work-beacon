// import Cookies from 'universal-cookie';

// const cookies = new Cookies();
// cookies.set('myCat', 'Pacman');

function  postMethod(data,url) {
  
if(!data){
    return
}
  const handleSubmit = async (e) => {
    // e.preventDefault();
    console.log('post.js',data,url)
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        // mode:"other-origin",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .catch((error)=>{
        console.log(error)
    })
    if(response && response.ok){
        if(response.status>=500){
            return false;
        }
        console.log('post.js1',response)
        return true;
    }else{
        console.log('post.js2',response)
        return false;
    }
    
  }

  return handleSubmit()

 
}

export default postMethod;
