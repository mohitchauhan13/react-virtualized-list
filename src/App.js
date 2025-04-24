// import "./App.css";
// import VirtualizedList from "./components/VirtualizedList";

// function App() {
//   // Generate mock data
//   const items = Array.from({ length: 1000 }, (_, i) => {
//     const repeat = Math.floor(Math.random() * 10) + 1;
//     return `Item ${i}: ` + "🍕 ".repeat(repeat); // variable height text
//   });

//   return (
//     <div className="App">
//       <div style={{ padding: "20px" }}>
//         <h2>Virtualized List with Dynamic Heights</h2>
//         <VirtualizedList items={items} itemHeight={40} containerHeight={200} />
//       </div>
//     </div>
//   );
// }

// export default App;

// Dynamic height
import VirtualizedList from "./components/VirtualizedList";

function App() {
  const items = Array.from({ length: 1000 }, (_, i) => {
    const repeat = Math.floor(Math.random() * 10) + 1;
    return {
      id: i,
      content: `Item ${i}: ` + "🍕 ".repeat(repeat),
      height: 30 + repeat * 5, // height varies based on content
    };
  });

  return (
    <div style={{ padding: 20 }}>
      <h2>Virtualized List (Dynamic Heights)</h2>
      <VirtualizedList items={items} containerHeight={400} />
    </div>
  );
}

export default App;
