import React, { useState } from 'react';


export default props => {
    //--------------------------------

    const { task, setTasks } = props;

   //-----------------------------------------
   

  
    return (

        <div id={task.user.UserID}>
            <div className="item">
    <h1>{task.user.fname}</h1>
    <h1>{task.task.topic}</h1>
                </div>
                </div>


    )



}