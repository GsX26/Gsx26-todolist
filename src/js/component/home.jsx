import React from "react";

//include images into your bundle
import { TodoList } from "./TodoList";
import { Link } from "./Link";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
		<TodoList />
		<Link />
		</div>
	);
};

export default Home;
