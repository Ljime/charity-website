import Header from "./components/Layout/Header";
import { Redirect, Route, Switch } from "react-router-dom"
import Main from "./pages/Main";
import Donate from "./pages/Donate";

function App() {
  return (
		<div className="App">
			<Header></Header>
			<Switch>
				<Route path="/" exact>
					<Main></Main>
				</Route>
				<Route path="/about-us">

				</Route>
				<Route path="/gallery">

				</Route>
				<Route path="/donate">
					<Donate></Donate>
				</Route>
				<Route path="*">
					<Redirect to="/"></Redirect>
				</Route>
			</Switch>
		</div>
	)
}

export default App;

