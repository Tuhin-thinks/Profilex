import React from "react";
import Header from "../../components/Header.tsx";
import carouselImg1 from "../../assets/img/carouselImg1.png";
import feature1 from "../../assets/img/feature1.png";
import feature2 from "../../assets/img/feature2.png";
import feature3 from "../../assets/img/feature3.png";
import slider1 from "../../assets/img/slider1.png";
import slider2 from "../../assets/img/slider2.png";
import slider3 from "../../assets/img/slider3.png";
import "./analyser.css";
import UploadPdf from "./UploadPdf/index";
import AddJobDescription from "./AddJobDescription/index";
import Result from "./Result/index";
import { useDispatch } from "react-redux";
import { getSuggestions, uploadFile } from "../../redux/action/resume.action";

const ResumeAnalyser = () => {
  const [activeTab, setIsActiveTab] = React.useState(1  );
  const [fileData, setIsfileData] = React.useState(null);
  const [jobDes, setJobDes] = React.useState(null);
  const dispatch = useDispatch();

  const handleResumeUpload = (file, isText) => {
    if (isText) {
      console.log(file);
      setIsActiveTab(2);
      return;
    }
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    dispatch(uploadFile(formData, ()=> {
      setIsfileData(file);
      setIsActiveTab(2);
    }))
  };

  const handleJDUpload =(e)=> {
    dispatch(getSuggestions(()=> {
      setIsActiveTab(3)
    }))
  }
  const handleReupload = () => {
    setIsActiveTab(1);
  };

  function handleResumeReject() {
    setIsfileData(null);
    setIsActiveTab(1);
  }

  function handleRejectJD() {
    setJobDes(null);
    setIsActiveTab(2);
  }
  return (
    <div>
      <Header />

      <div
        className={`analyser-container ${activeTab === 3 ? "score-page" : ""}`}
      >
        {activeTab !== 3 && (
          <section className="analyser-left">
            <h1>
              Resume <span>Suggestions</span>
            </h1>
            <p>
              Use our FREE AI-powered platform to tailor your resume for a
              specific job role and make yourself stand out from the
              competition!
            </p>

            <section className="carousel">
              <img src={carouselImg1} alt="img" />

              <div className="feature">
                <span>
                  <img src={feature1} alt="img" />
                  Resume Analysis
                </span>
                <span>
                  <img src={feature2} alt="img" />
                  Smart Skill Scoring
                </span>
                <span>
                  <img src={feature3} alt="img" />
                  Resume Relevance Score
                </span>
              </div>

              <div className="feature_description">
                Get noticed by recruiters and surpass the ATS (Application
                Tracking System) using our job-specific feedback. Revolutionary
                analysis of multiple jobs with an unlimited amount of scans.
              </div>
            </section>
          </section>
        )}

        <section className="analyser-right">
          {activeTab !== 3 ? (
            <div className="analyser-top margin-auto">
              <span>
                See how you can strengthen your resume in three simple steps!
              </span>

              <div className="slider_wrapper">
                <div className="slider-divider"></div>
                <div className="slider">
                  <div className={activeTab === 1 ? "active" : ""}>
                    <img src={slider1} alt="sliderimg" />
                  </div>
                  <p>Upload Image</p>
                </div>

                <div className="slider">
                  <div className={activeTab === 2 ? "active" : ""}>
                    <img src={slider2} alt="sliderimg" />
                  </div>
                  <p>Paste or Select Job Description</p>
                </div>

                <div className="slider">
                  <div className={activeTab === 3 ? "active" : ""}>
                    <img src={slider3} alt="sliderimg" />
                  </div>
                  <p>Get Score</p>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="activity_container margin-auto">
            {activeTab === 1 ? (
              <UploadPdf handleImageUpload={handleResumeUpload} />
            ) : (
              <></>
            )}
            {activeTab === 2 ? (
              <AddJobDescription
                handleChange={handleJDUpload}
                fileData={fileData}
                handleResumeReject={handleResumeReject}
              />
            ) : (
              <></>
            )}
            {activeTab === 3 ? (
              <Result handleBack={handleReupload} />
            ) : (
              <></>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResumeAnalyser;
