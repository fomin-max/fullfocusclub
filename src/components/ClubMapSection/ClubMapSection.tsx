import { useEffect } from 'react';
import styles from './ClubMapSection.module.scss';
import { ReactComponent as Logo } from './assets/logo_F_transparency.svg';

export const ClubMapSection = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://api-maps.yandex.ru/2.1/?apikey=f0af1fee-3709-49a7-8f5e-d37e262321fa&lang=ru_RU';
    script.type = 'text/javascript';
    script.addEventListener('load', () => {
      // @ts-ignore
      window.ymaps.ready(() => {
        // @ts-ignore
        const map = new window.ymaps.Map('map', {
          center: [59.939_144, 30.315_635],
          zoom: 11,
          controls: [],
        });

        const clubs = [
          {
            name: 'Full Focus Василеостровская',
            address: 'Бугский пер., 3',
            phone: '+7 (812) 660-55-96',
            coords: [59.942_7, 30.278_6],
          },
          {
            name: 'Full Focus Электросила',
            address: 'Московский проспект, 149А',
            phone: '+7 (999) 035-06-65',
            coords: [59.891_6, 30.318_5],
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
            name: 'Full Focus Озерки',
            address: 'проспект Художников, 14',
            phone: '+7 (812) 660-55-96',
            coords: [60.013_9, 30.334_5],
          },
        ];

        clubs.forEach((club) => {
          // @ts-ignore
          const placemark = new window.ymaps.Placemark(
            club.coords,
            {
              balloonContent: `<div style="font-family:sans-serif"><strong style="color:#6632fa">${club.name}</strong><br>${club.address}<br><span>${club.phone}</span></div>`,
            },
            {
              preset: 'islands#circleIcon',
              iconColor: '#6632fa',
            }
          );
          map.geoObjects.add(placemark);
        });
      });
    });
    document.body.append(script);
  }, []);

  return (
    <section className={styles.mapSection}>
      <div className={styles.header}>
        <Logo className={styles.logo} />
        <h2 className={styles.heading}>Наши клубы</h2>
      </div>
      <div id="map" className={styles.map} />
    </section>
  );
};
