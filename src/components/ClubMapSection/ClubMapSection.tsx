import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngExpression, Map as LeafletMap } from 'leaflet';
import { Text } from 'components';
import styles from './ClubMapSection.module.scss';
import { ClubPopup } from './ClubPopup';
import logoSrc from './assets/logo-circle.png';

interface Club {
  name: string;
  address: string;
  phone: string;
  coords: LatLngExpression;
}

const clubs: Club[] = [
  {
    name: 'Full Focus Василеостровская',
    address: 'Бугский пер., 3',
    phone: '+7 (812) 660-55-96',
    coords: [59.938_389, 30.285_601],
  },
  {
    name: 'Full Focus Электросила',
    address: 'Московский проспект, 149А',
    phone: '+7 (999) 035-06-65',
    coords: [59.874_116, 30.317_797],
  },
  {
    name: 'Full Focus Коменда',
    address: 'проспект Испытателей, 33',
    phone: '+7 (999) 031-06-65',
    coords: [60.008_6, 30.258_1],
  },
  {
    name: 'Full Focus Просвещения',
    address: 'проспект Просвещения, 43, стр. 1, 3 этаж',
    phone: '+7 (812) 660-55-96',
    coords: [60.036_5, 30.418_2],
  },
  {
    name: 'Full Focus Беговая',
    address: 'ул. Савушкина, 126',
    phone: '+7 (812) 660-55-96',
    coords: [60.000_22, 30.259_87],
  },
];

export const ClubMapSection: React.FC = () => {
  const mapRef = useRef<LeafletMap | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const customIcon = L.icon({
    iconUrl: logoSrc,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });

  // При клике на клуб – центрировать карту
  useEffect(() => {
    if (activeIndex !== null && mapRef.current) {
      const club = clubs[activeIndex];
      mapRef.current.setView(club.coords, 14, { animate: true });
    }
  }, [activeIndex]);

  return (
    <section className={styles.mapSection}>
      <div className={styles.header}>
        <Text tag="h2" format="xxl" weight="bold" className={styles.title}>
          Наши клубы
        </Text>
      </div>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <ul className={styles.clubList}>
            {clubs.map((club, index) => (
              <li
                key={index}
                className={styles.clubItem}
                onClick={() => setActiveIndex(index)}
              >
                <h3 className={styles.clubName}>{club.name}</h3>
                <p className={styles.clubAddress}>{club.address}</p>
                <p className={styles.clubPhone}>{club.phone}</p>
              </li>
            ))}
          </ul>
        </aside>
        <MapContainer
          center={[59.939_144, 30.315_635]}
          zoom={11}
          style={{ height: '500px', width: '100%', borderRadius: '12px' }}
          className={styles.map}
          ref={mapRef}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          {clubs.map((club, index) => (
            <Marker key={index} position={club.coords} icon={customIcon}>
              <Popup>
                <ClubPopup
                  name={club.name}
                  address={club.address}
                  phone={club.phone}
                />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};
