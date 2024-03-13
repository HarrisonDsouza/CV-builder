import React, { useEffect, useState } from "react";

function ProjectInfo({ setInfo, editItem, setEditItem }) {
  const [projectInfo, setProjectInfo] = useState({
    id: editItem ? editItem.id : 1,
    projectName: editItem ? editItem.projectName : "",
    projectDescription: editItem ? editItem.projectDescription : "",
  });

  useEffect(() => {
    if (editItem) {
      setProjectInfo({
        id: editItem.id,
        projectName: editItem.projectName,
        projectDescription: editItem.projectDescription,
      });
    }
  }, [editItem]);

  function resetForm(){
    setProjectInfo({
      id: projectInfo.id,
      projectName: "",
      projectDescription: "",
    });
  }

  function addOrUpdateProjectInfo(e) {
    e.preventDefault();
    console.log("Submitting project info:", projectInfo);
    if (projectInfo.projectName && projectInfo.projectDescription) {
      if (editItem) {
        console.log("Editing project:", editItem.id);
        console.log("Updated project info:", projectInfo);
        setInfo((prevExp) => ({
          ...prevExp,
          projects: prevExp.projects.map((project) =>
            project.id === editItem.id ? projectInfo : project
          ),
        }));
        setEditItem(null); 
        console.log("Project updated successfully.");

        resetForm();
      } else {
        console.log("Adding new project.");
        setInfo((prevExp) => ({
          ...prevExp,
          projects: [
            ...prevExp.projects,
            { ...projectInfo, id: prevExp.projects.length + 1 },
          ],
        }));
        setProjectInfo({
          id: projectInfo.id + 1,
          projectName: "",
          projectDescription: "",
        });
        console.log("New project added successfully.");
      }
    } else {
      console.log("Project name and description are required.");
    }
  }

  return (
    <form
      id="projectInfoForm"
      name="projectInfoForm"
      onSubmit={addOrUpdateProjectInfo}
    >
      <label htmlFor="projectName">Project Name</label>
      <input
        type="text"
        name="projectName"
        id="projectName"
        value={projectInfo.projectName}
        onChange={(e) =>
          setProjectInfo({ ...projectInfo, projectName: e.target.value })
        }
      />

      <label htmlFor="projectDescription">Describe your Project</label>
      <textarea
        name="projectDescription"
        id="projectDescription"
        cols="30"
        rows="10"
        value={projectInfo.projectDescription}
        onChange={(e) =>
          setProjectInfo({
            ...projectInfo,
            projectDescription: e.target.value,
          })
        }
      ></textarea>

      <input type="submit" />
      <input type="reset" onClick={resetForm}/>
    </form>
  );
}

export default ProjectInfo;
