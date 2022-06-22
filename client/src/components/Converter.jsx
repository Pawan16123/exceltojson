import React, { useState } from 'react'

const Converter = () => {
    
    const [recFile, setRecFile] = useState('');
    const fileReceived = (file)=>{
        console.log('File Received',file);
        setRecFile(file.target.files[0]);
    }
    const converter = (e)=>{
        e.preventDefault();
        if(recFile){
            console.log('Lets Convert the file');
            let fileReader = new FileReader();
            fileReader.readAsBinaryString(recFile);

            fileReader.onload = (e)=>{
                console.log(e.target.result);
            }

            console.log(fileReader);
        }else{
            console.log('Please Select a file');
        }

    }


  return (

      <>
        <form action="#" id='converterForm'>
            <input type="file" id="fileSelect" accept=".xlsx, .xls, .csv" onInput={(e)=>fileReceived(e)}/>
            <button type="submit" id="submitButton" onClick={(e)=>converter(e)}>Converter</button>
        </form>
      </>
  )
}

export default Converter;