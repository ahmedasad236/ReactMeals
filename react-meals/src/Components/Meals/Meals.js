import React from "react";
import AvailabelMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const Meals = (props) => {
  return (
    <>
      <MealsSummary />
      <AvailabelMeals />
    </>
  );
};

export default Meals;
