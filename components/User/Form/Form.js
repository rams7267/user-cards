import { FOOD_OPTIONS, FORM_TYPE, GENDER } from "@/helper/constants";
import React, { useRef, useState } from "react";
import styles from "./Form.module.scss";

export const Form = ({
  type = FORM_TYPE.add,
  data,
  insertUpdate,
  closeForm,
}) => {
  const [gender, setGender] = useState(data?.gender || "");
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const dobRef = useRef(null);
  const foodRef = useRef(null);
  const hobbiesRef = useRef(null);

  const handleGenderChange = (e) => {
    setGender(e?.target?.value);
  };

  const handleSubmit = () => {
    const params = {
      name: nameRef.current.value,
      age: ageRef.current.value,
      dob: dobRef.current.value,
      food: foodRef.current.value,
      hobbies: hobbiesRef.current.value,
      gender,
    };

    insertUpdate && insertUpdate(params, type);
    closeForm && closeForm();
  };

  const handleClose = () => {
    closeForm && closeForm();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.formWrapper}>
        <p className={styles.heading}>{type} user</p>
        <div className={styles.form}>
          <div className={styles.left}>
            <div className={styles.formItem}>
              <p>
                <label htmlFor="name">NAME</label>
              </p>
              <input
                ref={nameRef}
                type="text"
                id="name"
                defaultValue={data?.name}
                readOnly={type === FORM_TYPE.view}
              />
            </div>
            <div className={styles.formItem}>
              <p>
                <label htmlFor="date">DOB</label>
              </p>
              <input
                ref={dobRef}
                type="date"
                id="date"
                defaultValue={data?.dob}
                readOnly={type === FORM_TYPE.view}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </div>
            <div className={styles.formItem}>
              <p>
                <label htmlFor="food">Favourite food</label>
              </p>
              <select
                ref={foodRef}
                id="food"
                defaultValue={data?.food}
                readOnly={type === FORM_TYPE.view}
              >
                {FOOD_OPTIONS?.map((item, index) => {
                  return (
                    <option value={item} key={`food-option-${index}`}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.formItem}>
              <p>
                <label htmlFor="age">AGE</label>
              </p>
              <input
                ref={ageRef}
                type="number"
                id="age"
                readOnly={type === FORM_TYPE.view}
                defaultValue={data?.age}
              />
            </div>
            <div className={styles.formItem}>
              <p>
                <label htmlFor="date">GENDER</label>
              </p>
              <label>
                <input
                  type="radio"
                  value={GENDER.male}
                  checked={gender === GENDER.male}
                  readOnly={type === FORM_TYPE.view}
                  onChange={handleGenderChange}
                />
                Male
              </label>
              &nbsp;{" "}
              <label>
                <input
                  type="radio"
                  value={GENDER.female}
                  checked={gender === GENDER.female}
                  readOnly={type === FORM_TYPE.view}
                  onChange={handleGenderChange}
                />
                Female
              </label>
            </div>
            <div className={styles.formItem}>
              <p>
                <label htmlFor="date">HOBBIES</label>
              </p>
              <textarea
                ref={hobbiesRef}
                rows={5}
                readOnly={type === FORM_TYPE.view}
                defaultValue={data?.hobbies}
              ></textarea>
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          {type === FORM_TYPE.view ? (
            <button onClick={handleClose}>CLOSE</button>
          ) : (
            <>
              <button className={styles.cancel} onClick={handleClose}>
                CANCEL
              </button>
              <button onClick={handleSubmit}>SUBMIT</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
