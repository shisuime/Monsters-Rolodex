import { useState, useEffect } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/Search-box.component";

import "./App.css";

const App = () => {
  const [searchField, setsearchField] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filterredMonsters, setFiltermonsters] = useState(monsters);

  useEffect(() => {
    console.log("fetch");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);
  useEffect(() => {
    console.log("filter");
    const newfilterredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFiltermonsters(newfilterredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    console.log("onsearchchange");
    const searchFieldstring = event.target.value.toLocaleLowerCase();
    setsearchField(searchFieldstring);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        className=" monsters search-box"
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
      />
      <CardList monsters={filterredMonsters} />
    </div>
  );
};

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       monsters: [],
//       searchField: "",
//     };
//   }
//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((users) =>
//         this.setState(() => {
//           return { monsters: users };
//         })
//       );
//   }
//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();

//     this.setState(() => {
//       return { searchField };
//     });
//   };
//   render() {
//     console.log("render from app.js");
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;
//     const filterredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });
//     return (
//       <div className="App">
//         <h1 className="app-title">Monsters Rolodex</h1>
//         <SearchBox
//           className=" monsters search-box"
//           onChangeHandler={onSearchChange}
//           placeholder="search monsters"
//         />
//         <CardList monsters={filterredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
