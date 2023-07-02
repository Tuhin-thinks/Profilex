import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import selected_img from "../../../assets/img/selected_img.png";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";

interface Props {
  handleChange: Function;
  fileData: any;
  handleResumeReject: Function;
}

const AddJobDescription: React.FC<Props> = ({
  handleChange,
  fileData,
  handleResumeReject,
}) => {
  const textAreaRef = React.useRef(null);
  const handleSubmit = () => {
    handleChange(textAreaRef.current.value);
  };
  function handleClearResume() {
    handleResumeReject();
  }
  const {
    loading,
    error,
  }: { loading: boolean; error: any | null; displayMessage: string } =
    useSelector(({ common }: { common: any }) => common);
  return (
    <div className="upload_container">
      <h3 className="steps-title">Job description</h3>

      <div className="selected_file_wrapper">
        <div className="selected_file">
          <img src={selected_img} alt="selected_img" />
          <p>{fileData?.name}</p>
          <button onClick={handleClearResume}>
            <AiFillCloseCircle fill="#F44336" />
          </button>
        </div>
      </div>

      <div className="step-activity">
        {loading ? (
        <div className="flex">
          <Loader />
          <p>If call takes too much time please be patient this is hosted on free server 🐢!</p>
        </div>
        ) : 
        <>
          <div className="">
            <textarea
              className="textArea"
              name=""
              id=""
              cols="30"
              rows="10"
              ref={textAreaRef}
            ></textarea>
          </div>
          <button className="submit-btn" onClick={handleSubmit}>
            Get Suggestions
          </button>{" "}
        </>}
      </div>
    </div>
  );
};

export default AddJobDescription;
