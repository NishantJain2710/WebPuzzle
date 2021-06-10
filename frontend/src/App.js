import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomeScreen from './screen/HomeScreen';
import AddQuestionScreen from './screen/AddQuestionScreen'
import ShowQuestionsScreen from './screen/ShowQuestionsScreen'
import LoginScreen from './screen/LoginScreen'
import RegisterScreen from './screen/RegisterScreen'
import EditQuestionScreen from './screen/EditQuestionScreen'
import QuizScreen from './screen/QuizScreen'
import Footer from './component/Footer';
const App = () => {
  //   const disableFunction = (e) => {
  //     e.preventDefault()  
  //     return true
  // }
  // onContextMenu = {disableFunction}
  return (
    <Router>
      <div className='site'  >
          <main>
            <Route path='/' component={HomeScreen}  exact />
            <Route path='/addQuestions' component={AddQuestionScreen} />
            <Route path='/showQuestions' component={ShowQuestionsScreen} />
            <Route path='/Login' component={LoginScreen} />
            <Route path='/Register' component={RegisterScreen} />
            <Route path='/editQuestions/:id' component={EditQuestionScreen} />
            <Route path='/quiz' component={QuizScreen} />
          </main>
          <Footer/>
      </div>
    </Router>
    
  );
}
export default App;
