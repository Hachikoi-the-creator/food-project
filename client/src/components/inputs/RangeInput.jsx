import React from "react"
import { ColumnFlexContainer } from "../styles/RecipeMain"

export default function RangeInput({ hookStuff:{options, name, register, errors, watch} , min, max,step }) {
	const capitalizedName = name[0]+name.slice(1)

return (
  <ColumnFlexContainer>
      <label htmlFor={name}>{capitalizedName}</label>  
      <input
        id={name}
        type="range"
        {...{step}}
        {...{min}}
        {...{max}}
        {...register("healthyness", { required: true })}
      />
      <p>{watch("healthyness")}</p>    
  </ColumnFlexContainer>
  )
}
