import { APP_URLS, LINKS } from 'utils';
import { Text, Link } from 'components';

import { ReactComponent as FullLogo } from 'assets/img/full-logo.svg';

import { ReactComponent as VK } from './assets/vk.svg';
import { ReactComponent as TG } from './assets/tg.svg';

import css from './footer.module.scss';

export const Footer = () => {
  const handleGoTo = (url: string) => {
    window.open(url, '_blank', 'noopener noreferrer');
  };

  const contacts = [
    {
      key: 'Телефон',
      value: '+7 (812) 660-55-96',
    },
    {
      key: 'Организация мероприятий',
      value: 'info@fullfocusclub.ru',
    },
    {
      key: 'Франшиза',
      value: 'franchise@fullfocusclub.ru',
    },
  ];

  const documents = [
    // TODO: доделать
    // {
    //   title: 'Пользовательское соглашение',
    //   url: APP_URLS.UserAgreement,
    // },
    // {
    //   title: 'Согласие на обработку персональных данных',
    //   url: APP_URLS.PersonalDataProcessingConsent,
    // },
    {
      title: 'Политика обработки персональных данных',
      url: APP_URLS.PersonalDataProcessingPolicy,
    },
  ];

  return (
    <footer className={css.footer}>
      <div className={css.social}>
        <FullLogo />
        <div className={css.buttons}>
          <VK onClick={() => handleGoTo(LINKS.vk)} />
          <TG onClick={() => handleGoTo(LINKS.tg)} />
        </div>
      </div>
      <div className={css.info}>
        <div className={css.contacts}>
          {contacts.map(({ key, value }) => (
            <div key={key}>
              <Text>{key}</Text>
              <Text colorType="white-200">{value}</Text>
            </div>
          ))}
        </div>
        <div className={css.docs}>
          {documents.map(({ title, url }) => (
            <Link key={url} url={url}>
              {title}
            </Link>
          ))}
        </div>
      </div>
      <Text format="xs" colorType="white-200" className={css.legal}>
        © 2022-{new Date().getFullYear()}. Full Focus Co. Ltd.
        <br />
        All rights reserved.
        <br />
        <br />
        Общество с ограниченной ответственностью «ФУЛЛ ФОКУС»
        <br />
        ИНН / КПП 7810943662 / 781001001
        <br />
        ОГРН 1227800036860
        <br />
        196128, г. Санкт-Петербург, вн.тер.г. муниципальный округ Московская
        застава, пр-кт Московский, д. 149А, литера А, помещ. 1-Н, раб.м. 1-Ф
      </Text>
    </footer>
  );
};
