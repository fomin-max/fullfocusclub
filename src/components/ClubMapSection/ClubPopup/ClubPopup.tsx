import React from 'react';
import styles from './ClubPopup.module.scss';

interface ClubPopupProps {
  name: string;
  address: string;
  phone: string;
}

export const ClubPopup: React.FC<ClubPopupProps> = ({
  name,
  address,
  phone,
}) => {
  return (
    <div className={styles.popupContent}>
      <strong className={styles.name}>{name}</strong>
      <br />
      <span>{address}</span>
      <br />
      <span>{phone}</span>
      <br />
      {/* eslint-disable-next-line react/button-has-type */}
      <button className={styles.reserveBtn}>Забронировать</button>
    </div>
  );
};
