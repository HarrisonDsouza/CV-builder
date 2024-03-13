import React, { useState, useEffect } from "react";

function WorkExpInfo({ setInfo, editItem, setEditItem }) {
  const [workExpInfo, setWorkExpInfo] = useState({
    id: editItem ? editItem.id : 1,
    jobTitle: editItem ? editItem.jobTitle : "",
    companyName: editItem ? editItem.companyName : "",
    compLoc: editItem ? editItem.compLoc : "",
    startDate: editItem ? editItem.startDate : "",
    finishDate: editItem ? editItem.finishDate : "",
    jobDescription: editItem ? editItem.jobDescription : "",
  });

  useEffect(() => {
    if (editItem) {
      setWorkExpInfo({
        id: editItem.id,
        jobTitle: editItem.jobTitle,
        companyName: editItem.companyName,
        compLoc: editItem.compLoc,
        startDate: editItem.startDate,
        finishDate: editItem.finishDate,
        jobDescription: editItem.jobDescription,
      });
    }
  }, [editItem]);

  function resetForm() {
    setWorkExpInfo({
      id: editItem.id,
      jobTitle: "",
      companyName: "",
      startDate: "",
      finishDate: "",
      jobDescription: "",
    });
  }

  function addOrUpdateWorkExp(e) {
    e.preventDefault();
    if (
      workExpInfo.jobTitle &&
      workExpInfo.companyName &&
      workExpInfo.compLoc &&
      workExpInfo.startDate &&
      workExpInfo.jobDescription
    ) {
      if (editItem) {
        setInfo((prevInfo) => ({
          ...prevInfo,
          workExp: prevInfo.workExp.map((exp) =>
            exp.id === editItem.id ? workExpInfo : exp
          ),
        }));
        setEditItem(null);
        resetForm();
      } else {
        setInfo((prevInfo) => ({
          ...prevInfo,
          workExp: [
            ...prevInfo.workExp,
            { ...workExpInfo, id: prevInfo.workExp.length + 1 },
          ],
        }));
        setWorkExpInfo({
          id: WorkExpInfo.id + 1,
          jobTitle: "",
          companyName: "",
          compLoc: "",
          startDate: "",
          finishDate: "",
          jobDescription: "",
        });
      }
    } else {
      console.log("Please fill in all the fields.");
    }
  }

  return (
    <form name="workExpInfoForm" onSubmit={addOrUpdateWorkExp}>
      <label htmlFor="jobTitle">Job Title</label>
      <input
        type="text"
        name="jobTitle"
        id="jobTitle"
        value={workExpInfo.jobTitle}
        onChange={(e) =>
          setWorkExpInfo({ ...workExpInfo, jobTitle: e.target.value })
        }
      />

      <label htmlFor="companyName">Company</label>
      <input
        type="text"
        name="companyName"
        id="companyName"
        value={workExpInfo.companyName}
        onChange={(e) =>
          setWorkExpInfo({ ...workExpInfo, companyName: e.target.value })
        }
      />

      <label htmlFor="compLoc">Company Location</label>
      <input
        type="text"
        name="compLoc"
        id="compLoc"
        value={workExpInfo.compLoc}
        onChange={(e) =>
          setWorkExpInfo({ ...workExpInfo, compLoc: e.target.value })
        }
      />

      <label htmlFor="startDate">Date Started</label>
      <input
        type="date"
        name="startDate"
        id="startDate"
        value={workExpInfo.startDate}
        onChange={(e) =>
          setWorkExpInfo({ ...workExpInfo, startDate: e.target.value })
        }
      />

      <label htmlFor="finishDate">Date Finished</label>
      <input
        type="date"
        name="finishDate"
        id="finishDate"
        value={workExpInfo.finishDate}
        onChange={(e) =>
          setWorkExpInfo({ ...workExpInfo, finishDate: e.target.value })
        }
      />

      <label htmlFor="jobDescription">Job Description</label>
      <textarea
        name="jobDescription"
        id="jobDescription"
        cols="30"
        rows="10"
        value={workExpInfo.jobDescription}
        onChange={(e) =>
          setWorkExpInfo({ ...workExpInfo, jobDescription: e.target.value })
        }
      ></textarea>

      <input type="submit" value={editItem ? "Update" : "Add"} />
      <input type="reset" value="Reset" onClick={resetForm} />
    </form>
  );
}

export default WorkExpInfo;
