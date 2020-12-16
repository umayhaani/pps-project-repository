import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Admin from "./users/admin/Admin";
import Student from "./users/student/Student";
import Teacher from "./users/teacher/Teacher";
import MainPage from "./spellBee/MainPage";
import SpellLevel from "./spellBee/SpellLevel";
import SpeechToText from "./spellBee/speechTotext/SpeechToText";
import AddWord from "./users/admin/AddWordAdmin";
import Auth from "./Auth";

function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact>
          <Auth></Auth>
        </Route>
        <Route path="/admin" exact>
          <Admin />
        </Route>
        <Route path="/student" exact>
          <Student />
        </Route>
        <Route path="/teacher" exact>
          <Teacher />
        </Route>
        <Route exact path="/Student/SpellBee">
          <MainPage />
        </Route>

        <Route exact path="/SpellBee/SpellLevel">
          <SpellLevel />
        </Route>
        <Route exact path="/SpeechToText">
          <SpeechToText />
        </Route>
        <Route exact path="/addWord">
          <AddWord />
        </Route>

        <Redirect to="/" />
      </Router>
    </div>
  );
}

export default App;
