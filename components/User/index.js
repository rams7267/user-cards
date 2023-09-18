import React, { useEffect, useState } from "react";

import Card from "./Card/Card";
import { Form } from "./Form/Form";
import styles from "./index.module.scss";
import { getItem, removeItem, setItem } from "@/helper/utils";
import { FORM_TYPE, LS_KEY_FOR_USER } from "@/helper/constants";

const UserInventory = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserIndex, setCurrentUserIndex] = useState(null);
  const [_action, setAction] = useState(null);
  const [userRecords, setUserRecords] = useState([]);

  const setLocalStorageData = (data) => {
    setItem(LS_KEY_FOR_USER, data);
  };

  useEffect(() => {
    const existing = getItem(LS_KEY_FOR_USER) || [];
    if (existing?.length) {
      setUserRecords(existing);
    }
  }, []);

  useEffect(() => {
    const existing = getItem(LS_KEY_FOR_USER) || [];
    if (existing) {
      removeItem(LS_KEY_FOR_USER);
    }
    setLocalStorageData(userRecords);
  }, [userRecords]);

  const addNewRecord = (data, type) => {
    if (type === FORM_TYPE.add) {
      setUserRecords((prev) => {
        return [...prev, data];
      });
    } else if (type === FORM_TYPE.edit) {
      const temp = [
        ...(userRecords.splice(0, currentUserIndex) || []),
        data,
        ...(userRecords.splice(currentUserIndex + 1) || []),
      ];

      setUserRecords(temp);
    }
  };

  const handleAddRecord = () => {
    setCurrentUser(null);
    setAction(FORM_TYPE.add);
    setOpenPopup(true);
  };

  const handleEdit = (data) => {
    setCurrentUser(data);
    setAction(FORM_TYPE.edit);
    setOpenPopup(true);
  };

  const handleView = (data) => {
    setCurrentUser(data);
    setAction(FORM_TYPE.view);
    setOpenPopup(true);
  };

  const closeForm = () => {
    setOpenPopup(false);
  };

  const handleDelete = (index) => {
    const temp = [
      ...(userRecords.splice(0, index) || []),
      ...(userRecords.splice(index + 1) || []),
    ];

    setUserRecords(temp);
  };

  const handleAction = (type, index) => {
    setCurrentUserIndex(index);
    switch (type) {
      case FORM_TYPE.view:
        handleView(userRecords[index]);
        break;
      case FORM_TYPE.edit:
        handleEdit(userRecords[index]);
        break;
      case FORM_TYPE.delete:
        handleDelete(index);
        break;
    }
  };

  return (
    <div className={styles.userWrapper}>
      <div className={styles.topSection}>
        LIST OF USERS <br />
        <button onClick={handleAddRecord}>add users</button>
      </div>
      <div className={styles.cardsWrapper}>
        {userRecords?.map((user, index) => {
          return (
            <Card
              data={user}
              index={index}
              key={`card-${index}`}
              handleAction={handleAction}
            />
          );
        })}
      </div>
      {openPopup && (
        <Form
          type={_action}
          insertUpdate={addNewRecord}
          data={currentUser}
          closeForm={closeForm}
        />
      )}
    </div>
  );
};

export default UserInventory;
