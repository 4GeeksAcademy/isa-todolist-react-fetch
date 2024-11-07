import React from "react";
import TodoList from "./todolist"; 

const Home = () => {
  return (
    <div className="home-container">
      <TodoList />
      <div className="text-center">
			<p className="fixed-bottom">
			<p>© 2024 Made by Isa </p>
			</p>
		</div>
    </div>
    
  );
};

export default Home;