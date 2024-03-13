import React, { useState, useEffect } from "react";

function EdInfo({ setInfo, editItem, setEditItem }) {
  const [edInfo, setEdInfo] = useState({
    id: editItem ? editItem.id : 1,
    schoolName: editItem ? editItem.schoolName : "",
    studyTitle: editItem ? editItem.studyTitle : "",
    dateCompleted: editItem ? editItem.dateCompleted : "",
  });

  useEffect(() => {
    if (editItem) {
      setEdInfo({
        id: editItem.id,
        schoolName: editItem.schoolName,
        studyTitle: editItem.studyTitle,
        dateCompleted: editItem.dateCompleted,
      });
    }
  }, [editItem]);

  function resetForm() {
    setEdInfo({
      id: editItem.id,
      schoolName: "",
      studyTitle: "",
      dateCompleted: "",
    });
  }

  function addOrUpdateEdInfo(e) {
    e.preventDefault();
    if (
      edInfo.schoolName &&
      edInfo.studyTitle
    ) {
      if (editItem) {
        setInfo((prevInfo) => ({
          ...prevInfo,
          education: prevInfo.education.map((education) =>
            education.id === editItem.id ? edInfo : education
          ),
        }));
        setEditItem(null);
        resetForm();
      } else {
        setInfo((prevInfo) => ({
          ...prevInfo,
          education: [
            ...prevInfo.education,
            { ...edInfo, id: prevInfo.education.length + 1 },
          ],
        }));
        setEdInfo({
          id: edInfo.id + 1,
          schoolName: "",
          studyTitle: "",
          dateCompleted: "",
        });
      }
    } else {
      console.log("Please fill in all the fields.");
    }
  }

  return (
    <form name="edInfoForm" id="edInfoForm" onSubmit={addOrUpdateEdInfo}>
      <label htmlFor="schoolName">School Name</label>
      <input
        type="text"
        name="schoolName"
        id="schoolName"
        value={edInfo.schoolName}
        onChange={(e) =>
          setEdInfo({ ...edInfo, schoolName: e.target.value })
        }
      />

      <label htmlFor="studyTitle">Degree</label>
      <input
        type="text"
        name="studyTitle"
        id="studyTitle"
        value={edInfo.studyTitle}
        onChange={(e) =>
          setEdInfo({ ...edInfo, studyTitle: e.target.value })
        }
      />

      <label htmlFor="dateCompleted">Date Completed</label>
      <input
        type="date"
        name="dateCompleted"
        id="dateCompleted"
        value={edInfo.dateCompleted}
        onChange={(e) =>
          setEdInfo({ ...edInfo, dateCompleted: e.target.value })
        }
      />

      <input type="submit" value={editItem ? "Update" : "Add"} />
      <input type="reset" value="Reset" onClick={resetForm} />
    </form>
  );
}

export default EdInfo;
