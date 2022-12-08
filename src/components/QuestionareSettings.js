import { Categories } from "./Categories"

export const QuestionareSettings = (props) =>
{

    return(
        <form onSubmit={props.handleSubmit}>
        <input
          type="range"
          min="1"
          max="10"
          value={props.state.slider}
          step="1"
          onChange={props.zeFunction}
        />
        <p id="rangeValue">{props.state.slider}</p>
        <Categories />
        <div className="radioBtns">
          <input
            type="radio"
            name="difficulty"
            value="easy"
            onChange={props.handleDifficulty}
            required
          />
          <label htmlFor="easy">Easy</label>
          <input
            type="radio"
            name="difficulty"
            value="medium"
            onChange={props.handleDifficulty}
          />
          <label htmlFor="medium">Medium</label>
          <input
            type="radio"
            name="difficulty"
            value="hard"
            onChange={props.handleDifficulty}
          />
          <label htmlFor="hard">Hard</label>
        </div>
        <button type="submit">Start the questionare</button>
      </form>
    )
}
