import React, { useState } from 'react'

const Converter = () => {
    
    const [recFile, setRecFile] = useState('');
    const [reqSheetName, setReqSheetName] = useState('');
    const [jsonData, setJsonData] = useState('');
    const fileReceived = (file)=>{
        setRecFile(file.target.files[0]);
    }
    const converter = (e)=>{
        e.preventDefault();
        if(recFile){
            console.log('Lets Convert the file');
            let fileReader = new FileReader();
            fileReader.readAsBinaryString(recFile);

            fileReader.onload = (e)=>{
                let data = e.target.result;
                let reqData = window.XLSX.read(data, {type:'binary'});
                reqData.SheetNames.forEach(sheet=>{
                    if(reqSheetName !== '' && sheet !== reqSheetName ) return;
                    console.log(sheet);
                    let rowToObj = window.XLSX.utils.sheet_to_row_object_array(reqData.Sheets[sheet]);
                    let Finaldata = JSON.stringify(rowToObj,undefined,3);
                    console.log(Finaldata);
                    setJsonData(Finaldata);
                })
            }

            console.log(fileReader);
        }else{
            console.log('Please Select a file');
        }

    }


  return (

      <>
        <form action="#" id='converterForm'>
            <div>
                <input type="file" id="fileSelect" accept=".xlsx, .xls, .csv" onInput={(e)=>fileReceived(e)}/>
            </div>
            <div>
                <input type="text" placeholder='Required Sheet Name' className='reqSheet' onInput={(e)=>{setReqSheetName(e.target.value)}}/>
            </div>
            <button type="submit" id="submitButton" onClick={(e)=>converter(e)}>Converter</button>
        </form>
        <div className="jsonData">{jsonData}</div>
      </>
  )
}

export default Converter;


//TO do 
// Add button to store the json data in a file.
// change UI