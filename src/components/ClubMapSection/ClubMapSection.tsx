import React, { useEffect } from 'react';
import L from 'leaflet';

import { Text } from 'components';

import logoSrc from './assets/logo-circle.png';
import 'leaflet/dist/leaflet.css';

import styles from './ClubMapSection.module.scss';

export const ClubMapSection = () => {
  useEffect(() => {
    // Создаём карту
    const map = L.map('map', {
      zoomControl: false,
    });

    // Тёмные тайлы (Carto Dark Matter)
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    ).addTo(map);

    // Данные клубов
    const clubs = [
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
        address: 'ул. Савушкина, 127',
        phone: '+7 (812) 660-55-96',
        coords: [59.987_303, 30.219_281],
      },
    ] as const;

    // Создаём кастомную иконку с логотипом
    const customIcon = L.icon({
      iconUrl: logoSrc,
      iconSize: [36, 36],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20],
    });

    const markers: L.Marker[] = [];

    // Добавляем маркеры
    clubs.forEach((club) => {
      // @ts-ignore
      const marker = L.marker(club.coords, { icon: customIcon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:sans-serif;color:#fff;"><strong style="color:#6632fa;">${club.name}</strong><br>${club.address}<br>${club.phone}</div>`
        );
      markers.push(marker);
    });

    const group = new L.FeatureGroup(markers);
    map.fitBounds(group.getBounds(), { padding: [20, 20] });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <section className={styles.mapSection}>
      <div className={styles.header}>
        <Text type="h2" format="xxl" family="cyrillic">
          Наши клубы
        </Text>
      </div>
      <div id="map" className={styles.map} />
    </section>
  );
};
