import { useState } from "react"


export const TodoList = () => {

    const [Title,setTitle] = useState<string>('');
    const [Desc,setDesc] = useState<string>('');

    interface TodoList{
         Title : string,
         Desc : string,
         id : number
    }


    const[StoreTodo,setStoreTodo] = useState<TodoList[]>([]);

    const addtoList = () => {
        let newTodo = {
            Title,
            Desc,
            id : Date.now()
        }

        setStoreTodo([...StoreTodo , newTodo])
        setTitle('');
        setDesc('')
    }


    return (
        <>
         <h3> Inside TodoList  </h3>
        <div style = {{display:'flex',flexDirection:'column', gap:'20px',alignItems:'center'}}>
            <div>
                <label> Enter Title  </label>
                <input type = "text" placeholder="Enter Title" value={Title} onChange={(e) => setTitle(e.target.value)}  />
            </div>
            <div>
                <label> Enter Desc.  </label>
                <input type = "text" placeholder="Enter Desc" value={Desc} onChange={(e) => setDesc(e.target.value)} />
            </div>
            <div>
                <button onClick={addtoList}> Add todo </button>
            </div>
        </div>

        <div>
              <h3> All Lists </h3>
               {StoreTodo?.map(i => {
                return (
                    <div key = {i?.id}>
                        <h2> {i?.Title} </h2>
                        <h4> {i?.Desc} </h4>
                    </div>
                )
               })}
        </div>
        </>
    )
}