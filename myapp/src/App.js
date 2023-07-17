//import logo from './logo.svg';
//import './App.css';
import Header from './Header';
import Content from './Content';
import SearchList from './SearchList';
import Footer from './Footer';
import AddItem from './AddItem';
import requestApi from './requestApi';
import { useState ,useEffect } from 'react';
import { json } from 'react-router-dom';

function App() {
 
  const [items , setItems] = useState([
    {
      id: 1,
      checked : false,
      item: "Gym"
    },
    {
      id: 2,
      checked : false,
      item: "Swimming"
    },
    {
      id: 3,
      checked : false,
      item: "Study"
    }


  ]);

  const[newItem , setNewItem] = useState('');

  const [search , setSearch] = useState('');

  //  console.log("Before UseEffect");

  useEffect(()=>{  // loadtime = [] only

    localStorage.setItem('listitems' , JSON.stringify(items))

  } ,[items])
  
  //console.log("After UseEffect");

  const addItem = async (item) =>{
    const id = items.length ? items[items.length-1].id + 1 : 1;
    const myNewItem = {id , checked : false , item}
    const listItems = [...items , myNewItem];
    setItems(listItems);
    }
  

  const handleCheck = async (id) =>{
    const listItems = items.map((item)=>
        item.id === id ? {...item ,checked : !item.checked} : item);  
  
      setItems(listItems)
  }
  
  const handleDelete = async (id)=>{
    const listItems = items.filter((item)=>
    item.id !== id );
    
    setItems(listItems);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!newItem) return;
    addItem(newItem);
    setNewItem('');
  }


  return (
    <div className="App">
     <Header title = "To do List" />
     <AddItem 
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
        
        />

        <SearchList 
            search = {search}
            setSearch = {setSearch}
            />
     
    <main>
        <Content
        items = {items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete}/>
      
    </main>
     <Footer 
      length = {items.length}
      />
    </div>
  );
}

export default App;


// Styled Components (install and use)