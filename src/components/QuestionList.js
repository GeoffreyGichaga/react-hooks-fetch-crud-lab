import React,{useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions,setQuestions] = useState([])

  useEffect(()=>{
    fetch('http://localhost:4000/questions')
    .then(res=>res.json())
    .then(data=>{setQuestions(data)})
  },[])

  function handleDeleteAction(id){
    fetch(`http://localhost:4000/questions/${id}`,{
      method:"DELETE",
  
    })
    .then(res=>res.json())
    .then(()=>{
      const displayOtherQuestions = questions.filter((quiz)=> quiz.id !== id)
      setQuestions(displayOtherQuestions)

    })

    console.log(id);

  }

  function answeredQuestions(id,correctIndex){
    fetch(`http://localhost:4000/questions/${id}`,{
      method:"PATCH",
      headers:{
        "content-Type":"application/json"
      },
      body:JSON.stringify({correctIndex})
  
    })
    .then(res=>res.json())
    .then((displayOtherQuestion)=>{
      const displayOtherQuestions = questions.map((quiz)=>{
        if(quiz.id === displayOtherQuestions.id )
        {
          return displayOtherQuestion
        }else{
          return quiz
        }
      })
    })

  }

  const displayQuestion = questions.map((quiz)=>(
     <QuestionItem 
     key={quiz.id} 
     question={quiz} 
     deleteItem={handleDeleteAction} 
     answeringQuestions={answeredQuestions}
     />
    
  ))
  
  
    
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {displayQuestion}
        
      </ul>
    </section>
  );
}

export default QuestionList;
