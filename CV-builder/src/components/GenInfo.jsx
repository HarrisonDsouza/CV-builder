import React from "react";

function GenInfo({ setInfo }) {
  function updateInfo(field, value) {
    setInfo((prevInfo) => ({
      ...prevInfo,
      personalInfo: { ...prevInfo.personalInfo, [field]: value },
    }));
  }
  return (
    <>
      <form name="personalInfoForm" id="personalInfoForm">
        <label htmlFor="fName">First Name</label>
        <input
          type="text"
          name="fName"
          id="fName"
          onChange={(e) => updateInfo("fName", e.target.value)}
        />

        <label htmlFor="lName">Last Name</label>
        <input
          type="text"
          name="lName"
          id="lName"
          onChange={(e) => updateInfo("lName", e.target.value)}
        />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          onChange={(e) => updateInfo("address", e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => updateInfo("email", e.target.value)}
        />

        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          onChange={(e) => updateInfo("phone", e.target.value)}
        />

        <label htmlFor="shortDesc">Desciption</label>
        <textarea
          name="shortDesc"
          id="shortDesc"
          cols="30"
          rows="10"
          placeholder="Describe yourself in brief"
          onChange={(e) => updateInfo("shortDesc", e.target.value)}
        ></textarea>

        <input type="reset" />
      </form>
    </>
  );
}

export default GenInfo;
