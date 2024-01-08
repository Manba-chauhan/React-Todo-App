import React, { useState ,useEffect} from 'react'
import '../App.css';
import Img1 from '../img/Img1.png'

const Todoapp = () => {


    const getLocalData = () => {
        const lists = localStorage.getItem('mytodolist');

        if (lists) {
            return JSON.parse(lists);
        } else {
            return [];
        }
    }
    
    const [inputdata, setData] = useState('');
    const [items, setItems] = useState(getLocalData());
    const [togglebtn,settogglebtn]=useState(true);
    const[isedititem,setedititem]=useState(null);

   

    const additems = () => {
        if (!inputdata) {
             alert("please add items");
        } else if( inputdata && !togglebtn)
        {
              setItems(items.map((elem)=>{
                  if(elem.id === isedititem)
                  {
                     return {...elem,name:inputdata}
                  }
                  return elem;
              }))
            settogglebtn(true);
            setData('');
            setedititem(null);
        }
        else {
            const allinputdata={ id: new Date().getTime().toString() ,name :inputdata}
            setItems([...items,allinputdata]);
            setData('')
        }

    }
    // delete code
     const deleteitem=(index)=>{
        const updateitem=items.filter((ele)=>{
            return index !== ele.id;
        })
           setItems(updateitem);
     }
// remove all items
     const removeall=()=>{
         setItems([]);


     }
     useEffect(() => {
      localStorage.setItem('mytodolist',JSON.stringify(items))
     }, [items]);
     // edit code
     const edititem=(index)=>{
        const edititem=items.find((ele)=>{
            return( index===ele.id)
            
        });
         
        settogglebtn(false);
        setData(edititem.name);
        setedititem(index);
        console.log(edititem)

     }

    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src={Img1} alt='logoimg' />
                        <figcaption>Add Your List Here 👌</figcaption>
                    </figure>
                    <div className='addItems'>
                        <input
                            type='text'
                            placeholder=' ✍️ add items....'
                            value={inputdata}
                            onChange={(event) =>{ setData(event.target.value )}}
                        />
                        {
                             togglebtn ? (
                        <i className="fa fa-plus add-btn" title='Add items' onClick={additems}></i>

                              ):
                              (
                            <i className="far fa-edit add-btn" title='edit items' onClick={additems}></i>

                              )
                        }
                    </div>
                    <div className='showItems'>
                    {
                        items.map((ele)=>{
                            return(
                                <div className='eachItem' key={ele.id}>
                                    <h3>{ele.name}</h3>
                                    <div className='todo-btn'>
                                    <i className="far fa-edit add-btn" title='Delete items' onClick={() => { edititem(ele.id) }}></i>
                                    <i className="far fa-trash-alt add-btn" title='Delete items' onClick={()=>{ deleteitem(ele.id)}}></i>
                                  </div>
                              </div>
                            )
                        })
                    }
                        
                    </div>
                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text='Remove All' onClick={removeall}><span>CheckList</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Todoapp;
