import React from "react"
import PropTypes from "prop-types"
class TodosList extends React.Component {

  constructor () {
    super()
    this.state = {
      TodoItms: [],
      CatItms: [],
      CurCatID: 0
    }
  }

  componentDidMount() {
    fetch('/views/todos.json')
    .then( results =>{
      return results.json();
    }).then(data => {
      console.log(data)
      this.setState({TodoItms: data})
    })

    fetch('/views/todo_categories.json')
    .then( results =>{
      return results.json();
    }).then(data => {
      console.log(data)
      this.setState({CatItms: data})
      this.setState({CurCatID: this.state.CatItms.length})
    })
    
  }

  sortItems(){
    let catID = document.getElementById("sortCategories").value;
    
    const newTodoList = this.state.TodoItms.map((todo, index) => {
      let visibility = true
      console.log(catID + " : " + todo.CategoryID)
      if (catID != "" && todo.CategoryID != catID){ 
        todo.Completed = true
      }else{
        todo.Completed = false
      }
      return(
        todo
      )
    })
    this.setState({TodoItms: newTodoList})
    
  }

  addNewTodoItem() {
    let catID = document.getElementById("categoryID").value;
    let title = document.getElementById("title").value;
    let description = document.getElementById("desc").value;

    $.ajax({ 
      url: '/api/todos', 
      type: 'POST', 
      data: { todoItem: { CategoryID: catID, Title: title, Description: description, Completed: false } },
      success: (response) => { 
        console.log('it worked!', response);
        const todos = this.state.TodoItms;    
        //todos.push( <li key={response.id} ><div>{ response.CategoryID }</div><div>{ response.Title }</div><div>{ response.Description }</div></li>);   
        todos.push(response)
        this.setState({TodoItms: todos})
        document.getElementById("title").value = "";
        document.getElementById("desc").value = "";
      } 
    });
}

addNewCategoryItem() {
  let catID = this.state.CurCatID + 1;
  let catName = document.getElementById("catName").value;
  console.log(catName)
  $.ajax({ 
    url: '/api/todo_categories', 
    type: 'POST', 
    data: { catItem: { CategoryID: catID, Name: catName } },
    success: (response) => { 
      console.log('it worked!', response);
      const catList = this.state.CatItms;    
      //catList.push( <option key={response.id} value={ response.CategoryID }>{ response.Name }</option>);   
      catList.push(response)
      this.setState({CatItms: catList})
      document.getElementById("catName").value = "";
      this.setState({CurCatID: catList.length})
    } 
  });
  

}

  render () {
    let catItems = this.state.CatItms.map((cat, index) => {
        return(
          <option key={index} value={ cat.CategoryID }>{ cat.Name }</option>
        )
      })
    let  visibility = ""
    let TodoItems = this.state.TodoItms.map((todo, index) => {
      visibility = "isVisible"
      if ( todo.Completed === true ){
        visibility = "isHidden"
      }
      return(
        <li key={index} className={visibility}><div className="todo__category">{ todo.Name }</div><div className="todo__title">{ todo.Title }</div><div className="todo__desc">{ todo.Description }</div></li>
      )
    })
    return (
      
      <div className="app__container">
        <h1 className="hero__title">Todo List App</h1>
        <div className="category__container equal">
          <span className="title">Sort by category</span>
          <input id='catName' placeholder='Enter name of category' /> 
          <button className="newCatButton" onClick={this.addNewCategoryItem.bind(this)}>
            New Category
          </button>
        </div>
        <div className="todo__container equal">
          <span className="title">Add a todo item</span>
          <select id='categoryID'>
          {catItems}
          </select>
          <input id='title' placeholder='Enter a title' /> 
          <input id='desc' placeholder='Enter a description' /> 
          <button className="newTodoButton" onClick={this.addNewTodoItem.bind(this)}>
            New Todo Item
          </button>
        </div>
        <div className="sort__container equal">
          <span className="title">Sort by category</span>
          <select id='sortCategories' onChange={this.sortItems.bind(this)}>
            <option value="">View All</option>
            {catItems}
          </select>
        </div>
        <div className="list__container">
          <ul id="todoList">
            {TodoItems}
          </ul>
        </div>
      </div>
    );
  }
}

TodosList.propTypes = {
  data: PropTypes.array,
  data2: PropTypes.array
};
export default TodosList
