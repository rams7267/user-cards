import React from "react";

import { getAgeColor } from "@/helper/utils";
import styles from "./Card.module.scss";
import { FORM_TYPE } from "@/helper/constants";

const Card = ({
  data: { name, age, dob, gender, food, hobbies },
  index,
  handleAction,
}) => {
  const handleDelete = () => {
    handleAction && handleAction(FORM_TYPE.delete, index);
  };

  const handleView = () => {
    handleAction && handleAction(FORM_TYPE.view, index);
  };

  const handleEdit = () => {
    handleAction && handleAction(FORM_TYPE.edit, index);
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.name}>
        {name}
        <div className={`${styles.circle} ${styles[getAgeColor(age)]}`}></div>
      </div>
      <div className={styles.details}>
        <p>
          AGE:<span>{age}</span>
        </p>
        <p>
          DOB:<span>{dob}</span>
        </p>
        <p>
          GENDER:<span>{gender}</span>
        </p>
        <p>
          FOOD:<span>{food}</span>
        </p>
        <p>
          HOBBIES:<span>{hobbies}</span>
        </p>
      </div>
      <div className={styles.buttons}>
        <button className={styles.delete} onClick={handleDelete}>
          DELETE
        </button>
        <button onClick={handleView}>VIEW</button>
        <button onClick={handleEdit}>EDIT</button>
      </div>
    </div>
  );
};

export default Card;
