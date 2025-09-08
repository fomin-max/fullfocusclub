import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './RedirectPage.module.scss';

const METRIKA_ID = '102772587'; // замените на ваш реальный ID

export const RedirectPage: React.FC = () => {
  const [params] = useSearchParams();
  const utm_content = params.get('utm_content') || 'unknown';
  const utm_campaign = params.get('utm_campaign') || 'unknown';
  const utm_medium = params.get('utm_medium') || 'unknown';
  const redirect = decodeURIComponent(params.get('redirect') || '');

  useEffect(() => {
    // логируем для проверки
    console.log('[RedirectPage] reachGoal redirect', {
      utm_content,
      utm_campaign,
      utm_medium,
      redirect,
    });

    if (window.ym && typeof window.ym === 'function') {
      window.ym(METRIKA_ID, 'reachGoal', 'redirect', {
        utm_content,
        utm_campaign,
        utm_medium,
        redirect,
      });
    } else {
      console.warn('[RedirectPage] window.ym не найден');
    }

    if (redirect.startsWith('http')) {
      setTimeout(() => {
        window.location.href = redirect;
      }, 1000);
    }
  }, [utm_content, utm_campaign, utm_medium, redirect]);

  if (!redirect || !redirect.startsWith('http')) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Ошибка</h1>
          <p className={styles.text}>
            Ссылка для перехода не задана или некорректна.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Перенаправляем...</h1>
        <p className={styles.text}>
          Вы будете перенаправлены на внешний ресурс. Если этого не произошло,{' '}
          <a href={redirect} rel="noopener noreferrer" className={styles.link}>
            нажмите здесь
          </a>
          .
        </p>
      </div>
    </div>
  );
};
