import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, {
  LatLngExpression,
  Map as LeafletMap,
  Marker as LeafletMarker,
} from 'leaflet';
import { Text } from 'components';
import styles from './ClubMapSection.module.scss';
import { ClubPopup } from './ClubPopup';
import logoSrc from './assets/logo-circle-green.png';

interface Club {
  name: string;
  address: string;
  phone: string;
  coords: LatLngExpression;
  reserveLink?: string;
}

const clubs: Club[] = [
  {
    name: 'Full Focus Василеостровская',
    address: 'Бугский пер., 3',
    phone: '+7 (812) 660-55-96',
    coords: [59.938_389, 30.285_601],
    reserveLink: 'https://t.me/FullFocusVO',
  },
  {
    name: 'Full Focus Электросила',
    address: 'Московский проспект, 149А',
    phone: '+7 (999) 035-06-65',
    coords: [59.874_116, 30.317_797],
    reserveLink: 'https://t.me/fullfocusclub_bot',
  },
  {
    name: 'Full Focus Коменда',
    address: 'проспект Испытателей, 33',
    phone: '+7 (999) 031-06-65',
    coords: [60.008_051, 30.265_316],
    reserveLink: 'https://t.me/fullfocusclub_komenda_bot',
  },
  {
    name: 'Full Focus Просвещения',
    address: 'проспект Просвещения, 43, стр. 1, 3 этаж',
    phone: '+7 (812) 660-55-96',
    coords: [60.046_221, 30.363_012],
    reserveLink: 'https://t.me/fullfocusclub_prosvet_bot',
  },
  {
    name: 'Full Focus Беговая',
    address: 'ул. Савушкина, 126',
    phone: '+7 (812) 660-55-96',
    coords: [59.987_217, 30.218_922],
    // reserveLink:
    //   'https://vk.com/im?entrypoint=community_page&media=&sel=-230576404',
  },
];

export const ClubMapSection: React.FC = () => {
  const mapRef = useRef<LeafletMap | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Создаём массив refs для всех маркеров
  const markerRefs = useRef<(LeafletMarker | null)[]>([]);

  const customIcon = L.icon({
    iconUrl: logoSrc,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });

  const flyToClub = (index: number) => {
    const club = clubs[index];
    const lat = Array.isArray(club.coords)
      ? club.coords[0]
      : (club.coords as any).lat;
    const lng = Array.isArray(club.coords)
      ? club.coords[1]
      : (club.coords as any).lng;
    const target = L.latLng(lat, lng);

    const zoomLevel = 15;
    const isMobile = window.innerWidth <= 768;

    mapRef.current?.flyTo(target, zoomLevel, {
      animate: true,
      duration: 0.5,
      easeLinearity: 0.25,
    });

    // Вместо вычисления shiftedLng — используем panBy!
    if (!isMobile) {
      setTimeout(() => {
        const shiftX = window.innerWidth < 900 ? 200 : 150; // больше сдвиг при узком экране
        mapRef.current?.panBy([-shiftX, 0], { animate: true, duration: 0.5 }); // сдвиг влево
      }, 500); // дождаться окончания flyTo
    }

    const marker = markerRefs.current[index];
    if (marker) {
      marker.openPopup();
    }
  };
  // Обработчик кликов по элементу сайдбара или маркеру
  const handleClubClick = (index: number) => {
    setActiveIndex(index); // для UI
    flyToClub(index); // всегда приближаем
  };

  return (
    <section className={styles.mapSection}>
      <div className={styles.header}>
        <Text tag="h2" format="xxl" weight="thin">
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
                onClick={() => handleClubClick(index)}
              >
                <Text tag="h3" format="m" colorType="secondary" weight="medium">
                  {club.name}
                </Text>
                <Text tag="p" colorType="grey">
                  {club.address}
                </Text>
              </li>
            ))}
          </ul>
        </aside>
        <MapContainer
          center={[59.939_144, 30.335_635]}
          zoom={10}
          zoomControl={false}
          className={styles.map}
          ref={mapRef}
          // @ts-ignore
          whenReady={(mapInstance: any) => {
            const map = mapInstance.target; // текущий экземпляр карты
            if (window.innerWidth > 768 && window.innerWidth < 1_240) {
              // Сдвигаем карту влево, чтобы точки не были под сайдбаром
              map.panBy([-150, 0], { animate: false });
            }
            mapRef.current = map;
          }}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          {clubs.map((club, index) => (
            <Marker
              key={index}
              position={club.coords}
              icon={customIcon}
              ref={(ref) => {
                markerRefs.current[index] = ref;
              }}
              eventHandlers={{
                click: () => handleClubClick(index),
              }}
            >
              <Popup>
                <ClubPopup {...club} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};
