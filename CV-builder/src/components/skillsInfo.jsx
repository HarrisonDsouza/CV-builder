import React, { useState, useEffect } from "react";

function SkillsInfo({ setInfo, editItem, setEditItem }) {
  const [skillInfo, setSkillInfo] = useState({
    id: editItem ? editItem.id : 1, 
    skillTitle: editItem ? editItem.skillTitle : "",
  });

  useEffect(() => {
    if (editItem) {
      setSkillInfo({
        id: editItem.id,
        skillTitle: editItem.skillTitle,
      });
    }
  }, [editItem]);

  function resetForm() {
    setSkillInfo({
      id:editItem.id,
      skillTitle: "",
    });
  }

  function addOrUpdateSkill(e) {
    e.preventDefault();
    if (skillInfo.skillTitle) {
      if (editItem) {
        setInfo((prevInfo) => ({
          ...prevInfo,
          skills: prevInfo.skills.map((skill) =>
            skill.id === editItem.id ? skillInfo : skill
          ),
        }));
        setEditItem(null); 
        resetForm();
      } else {
        setInfo((prevInfo) => ({
          ...prevInfo,
          skills: [
            ...prevInfo.skills,
            { ...skillInfo, id: prevInfo.skills.length + 1 },
          ],
        }));
        setSkillInfo({
          id: skillInfo.id + 1,
          skillTitle: "",
        });
      }
    } else {
      console.log("Skill title is required.");
    }
  }

  return (
    <form id="skillsInfoForm" name="skillsInfoForm" onSubmit={addOrUpdateSkill}>
      <label htmlFor="skillTitle">Skill</label>
      <input
        type="text"
        name="skillTitle"
        id="skillTitle"
        value={skillInfo.skillTitle}
        onChange={(e) =>
          setSkillInfo({ ...skillInfo, skillTitle: e.target.value })
        }
      />

      <input type="submit" value="Submit" />
      <input type="reset" value="Reset" onClick={resetForm} />
    </form>
  );
}

export default SkillsInfo;
