import React from "react";
import upload_svg from "../../../assets/img/upload_image.png";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
interface Props {
  handleImageUpload: Function;
}

const UploadPdf: React.FC<Props> = ({ handleImageUpload }) => {
  const [isPdf, setIsPdf] = React.useState(true);
  const handleChangeToText = () => {
    setIsPdf(!isPdf);
  };
  const textAreaRef = React.useRef(null);

  function handleImageSubmit(e) {
    handleImageUpload(e.target.files[0], false);
  }
  function handleTextSubmit(e) {
    handleImageUpload(e.target.value, true);
  }

  const {
    loading,
    error,
  }: { loading: boolean; error: any | null; displayMessage: string } =
    useSelector(({ common }: { common: any }) => common);
  return (
    <div className="upload_container">
      <h3 className="steps-title">{isPdf ? "Upload" : "Type"} Resume</h3>

      <div className="step-activity">
        {isPdf ? (
          loading ? (
            <div className="flex">
              <Loader />
              <p>If call takes too much time please be patient this is hosted on free server 🐢!</p>
            </div>
          ) : (
            <div className="activity_div upload_div">
              <input
                type="file"
                id="uploadResumeWithJd"
                accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.txt,.rtf,.doc"
                onChange={handleImageSubmit}
              />
              <div className="input_info">
                <img src={upload_svg} alt="" />
                <p>Browse from your device and drop your files here</p>

                <p id="support-info">Supports: pdf, txt</p>
              </div>
            </div>
          )
        ) : (
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
        )}
        {/* <p className="options-to-upload margin-auto">Or</p>

        <button className="enter-text-btn" onClick={handleChangeToText}>
          Provide Resume as {isPdf ? "Text" : "PDF"}
        </button> */}

        {!isPdf && (
          <button className="submit-btn" onClick={handleTextSubmit}>
            Get Suggestions
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadPdf;
