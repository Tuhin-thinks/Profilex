import React from "react";
import { useSelector } from "react-redux";

interface Props {
  handleBack: any;
}

const Result: React.FC<Props> = ({ handleBack }) => {
  const {suggestions}: {suggestions: any} = useSelector(({resume}:{resume: any}) => resume)
  console.log(suggestions)
  return (
    <div className="results">
      <div className="analyser-top margin-auto result-top">
        <span>Here's Your Resume Suggestion</span>
      </div>

      <div className="feedbacks">
        {suggestions?.map((item, idx) => (
          <p key={idx}>{item}</p>
        ))}
      </div>

      <div className="add_other_pdf">
        <button onClick={handleBack}>Go Back!</button>
      </div>
    </div>
  );
};

export default Result;
