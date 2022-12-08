import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { ContextProvider } from "./ContextProvider";

export const Categories = () => {

  const { setCategoryID } = useContext(ContextProvider);

  //API-call for all the trivia categories and a use-effect to call for the data immediately.
  const [category, setCategory] = useState([{
    id: 17,
    name: "Science & Nature",
  }]);

  function getCategories() {
    axios
      .get(`https://opentdb.com/api_category.php`)
      .then((response) => setCategory(response.data.trivia_categories))
      .catch((err) => console.log(err));
  }

  useEffect(() => getCategories(), []);

  //Rendering all categories as options for the select drop-down menu.
  const renderCategories = () => {
    return (
        <select id="category" name="category" onChange={(event) => setCategoryID(event.target.value)}>
          {category.map((props) => {
            return (
              <option key={props.id} value={props.id}>
                {props.name}
              </option>
            );  
          })}
        </select>
    );
  };

  return renderCategories();
};
