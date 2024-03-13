import React from "react";
import "../CV.css";
function CV({ genInfo, exp }) {
  return (
    <div className="CV-field">
      <div className="container">
        <header className="form-header">
          <h1>
            {genInfo.personalInfo.fName + " " + genInfo.personalInfo.lName}
          </h1>
          <p>{genInfo.personalInfo.address}</p>
          <p>
            Email: {genInfo.personalInfo.email} | Phone:{" "}
            {genInfo.personalInfo.phone}
          </p>
        </header>
        <hr />
        <p className="shortDesc">{genInfo.personalInfo.shortDesc}</p>
        <section className="section xxp">
          <h2>Experience</h2>
          {exp.workExp.map((e) => (
            <div className="sub-section" key={e.id}>
              <h3>{e.jobTitle}</h3>
              <p>
                <strong>{e.companyName}</strong>, {e.compLoc} ({e.startDate} to{" "}
                {e.finishDate || "Present"})
              </p>
              <p>{e.jobDescription}</p>
            </div>
          ))}
        </section>
        <section className="section proj">
          <h2>Projects</h2>

          <ul>
            {exp.projects.map((e, index) => (
              <li className="sub-section" key={e.id}>
                <h3>Project Name: {e.projectName}</h3>
                <p>
                  <strong>Project Description</strong>: {e.projectDescription}
                </p>
              </li>
            ))}
          </ul>
        </section>
        <section className="section ed">
          <h2>Education</h2>

          {genInfo.education.map((e) => (
            <div className="sub-section" key={e.id}>
              <p>
                {e.dateCompleted
                  ? `Graduated: ${e.dateCompleted}`
                  : "Currently pursuing"}
              </p>
              <p>
                <strong>{e.studyTitle}</strong>, {e.schoolName}
              </p>
            </div>
          ))}
        </section>
        <section className="section skills">
          <h2>Skills</h2>
          <ul>
            {exp.skills.map((e) => (
              <li key={e.id}>{e.skillTitle}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default CV;
