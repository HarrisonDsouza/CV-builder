import { useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import html2pdf from "html2pdf.js";
import "./App.css";
import WorkExpInfo from "./components/WorkExpInfo";
import SkillsInfo from "./components/skillsInfo";
import ProjectInfo from "./components/ProjectInfo";
import EdInfo from "./components/EdInfo";
import GenInfo from "./components/GenInfo";
import CV from "./components/CV";

function App() {
  const [genInfo, setGenInfo] = useState({
    personalInfo: {
      fName: "",
      lName: "",
      address: "",
      email: "",
      phone: "",
      shortDesc: "",
    },
    education: [],
  });

  const [exp, setExp] = useState({
    workExp: [],
    projects: [],
    skills: [],
  });


  const [editItem, setEditItem] = useState(null);

  const handlePrint = () => {
    const printableContent = document.querySelector('.CV-field .container');

    const options = {
      margin: [0, 0, 20, 0], 
      filename: 'cv.pdf', 
      image: { type: 'jpeg', quality: 0.98 }, 
      html2canvas: { scale: 2 }, 
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }, 
    };

    html2pdf().from(printableContent).set(options).save();
  };

  return (
    <>
      <header className="header">
        <h1>CV Builder</h1>
        <p onClick={handlePrint}>{<MdOutlineFileDownload />}</p>
      </header>
      <main>
        <div className="form-container">
          <div className="form-section">
            <h2>Personal Information</h2>
            <GenInfo setInfo={setGenInfo} />
          </div>

          <div className="form-section">
            <h2>Work Experience Information</h2>
            <WorkExpInfo
              setInfo={setExp}
              editItem={editItem}
              setEditItem={setEditItem}
            />
            <List
              list={"workExp"}
              listContent={exp.workExp}
              listTitle={"jobTitle"}
              setFunc={setExp}
              setEditItem={setEditItem}
            />
          </div>

          <div className="form-section">
            <h2>Projects</h2>
            <ProjectInfo
              setInfo={setExp}
              editItem={editItem}
              setEditItem={setEditItem}
            />
            <List
              list={"projects"}
              listContent={exp.projects}
              listTitle={"projectName"}
              setFunc={setExp}
              setEditItem={setEditItem}
            />
          </div>

          <div className="form-section">
            <h2>Education Background</h2>
            <EdInfo
              setInfo={setGenInfo}
              editItem={editItem}
              setEditItem={setEditItem}
            />
            <List
              list={"education"}
              listContent={genInfo.education}
              listTitle={"schoolName"}
              setFunc={setGenInfo}
              setEditItem={setEditItem}
            />
          </div>

          <div className="form-section">
            <h2>Skills</h2>
            <SkillsInfo
              setInfo={setExp}
              editItem={editItem}
              setEditItem={setEditItem}
            />
            <List
              list={"skills"}
              listContent={exp.skills}
              listTitle={"skillTitle"}
              setFunc={setExp}
              setEditItem={setEditItem}
            />
          </div>


        </div>
        <div className="CVDisplay">
          <CV genInfo={genInfo} exp={exp} />
        </div>
      </main>
    </>
  );

  function List({ list, listContent, listTitle, setFunc, setEditItem }) {
    const handleEdit = (content) => {
      console.log("Editing project:", content);
      setEditItem(content);
    };

    function handleDelete(content) {
      const newContent = listContent.filter((item) => item.id !== content.id);
      setFunc((prevInfo) => ({
        ...prevInfo,
        [list]: newContent,
      }));
      if (editItem && editItem.id === content.id) {
        setEditItem(null);
      }
    }

    return (
      <ul className="list">
        {listContent.map((content) => (
          <li key={content.id}>
            <div className="list-item">
              <span>{content[listTitle]}</span>
              <div className="button-container">
                <button onClick={() => handleEdit(content)}>Edit</button>
                <button onClick={() => handleDelete(content)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default App;
