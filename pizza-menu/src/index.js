import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// For Debugging

// 1) Make sure application is running
// 2) Hard-reload browser
// 3) Keep terminal open and console open on browser
// 4) Have esLint on

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

// What is JSX? It is a declarative syntax to describe what components look like and how they work

// Different than JS (imperative), when there's a step by step DOM mutations until reaching desired UI

// React (declarative) describes what UI should look like based on current data, abstraction away from the DOM

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  // { color: "red", fontSize: "48px", textTransform: "uppercase" }
  const style = {};

  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;

  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {/* Use of ternary operator */}
      {numPizzas > 0 ? (
        // Use of fragment to include more elements without changing the DOM !!!
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>

          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>We're still working on our menu. Please come back later!</p>
      )}
    </main>
  );
}

// Props are used to pass information down the component tree, essential react tool
// A component is made out of Data (Props and State), Logic and Appearance
// Props is data coming from the outside, can only be updated by parent component
// State is internal data that can only be updated by the component's logic

// Props are immutable, if need mutable, need state(data that changes overtime)

// One-way dataflow, data can only be passed from parent to child
// Makes app more predictable, easier to debug, more performant

// Angular has a two way dataflow

function Pizza({ pizzaObj }) {
  // Example of destructuring right up {}, uses the specific prop instead of general props

  if (pizzaObj.soldOut) return null; // Conditional Rendering

  return (
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name}></img>
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  // if (hour >= openHour && hour <= closeHour) alert("We're currently open");
  // else alert("Sorry we're closed");

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  );
  // return React.createElement("footer", null, "We're currently open");
}

function Order({ closeHour, openHour }) {
  return (
    <div className="order">
      {/* Good use case of conditional rendering */}
      <p>
        We're open from {openHour}:00 until {closeHour}:00. Come visit us or
        order online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode> enables additional checks and warnings for its descendants,
  // helping to identify potential issues in the application.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Older React versions
// ReactDOM.render(<App />, document.getElementById("root"));

//////////////////////////////////

// Summary

//////////////////////////////////

// Components are the building blocks of any UI in React,
// each component is a self-contained piece of the interface that has its own data, js logic and appearance
// which is the JSX, what is returned from a component.

// To pass data down from parent to child, props are used, never the other way around.

// Rendering multiple components at once using the JS .map() method.

// Components can be conditionally rendered using JS tools.