import React from 'react';

import { Button, Text } from 'components';

import styles from './ClubPopup.module.scss';

interface ClubPopupProps {
  name: string;
  address: string;
  phone: string;
  reserveLink?: string;
}

export const ClubPopup: React.FC<ClubPopupProps> = ({
  name,
  address,
  phone,
  reserveLink,
}) => {
  const handleReserve = () => {
    window.open(reserveLink, '_blank', 'noreferrer');
  };

  return (
    <div className={styles.popupContent}>
      <Text colorType="secondary" weight="medium">
        {name}
      </Text>
      <Text colorType="grey" format="xs">
        {address}
        <br />
        {phone}
      </Text>
      {reserveLink ? (
        <Button variant="secondary" onClick={handleReserve}>
          ЗАБРОНИРОВАТЬ
        </Button>
      ) : (
        <Text colorType="grey" format="xs">
          Скоро открытие
        </Text>
      )}
    </div>
  );
};
