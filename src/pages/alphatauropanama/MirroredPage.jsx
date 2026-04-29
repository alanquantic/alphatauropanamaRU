import { useEffect, useState } from "react";
import "./mirrored.css";

const asset = (path) =>
  `/public_clean/alphatauropanama/alphatauropanama.com/${path}`;

const locales = {
  ru: {
    topAddress: "Edificio Almacenadora Mercantil, Ojo de Agua, Panama",
    contactCta: "контакт",
    heroTag: "Alpha Tauro",
    heroTitle: "ALPHA ИНТЕГРИРОВАННЫЙ ЦЕНТР ГЛОБАЛЬНЫЙ ЛОГИСТИЧЕСКИХ УСЛУГ",
    offersLead:
      "ALPHA предлагает своим клиентам комплексную платформу логистических услуг, которая объединяет следующие инфраструктуры в едином операционном центре площадью 50 гектаров, расположенном в Колоне:",
    serviceIntro: [
      {
        icon: asset("wp-content/uploads/2024/06/customs.png"),
        title: "ТАМОЖНЯ НА МЕСТЕ",
        text: "ТАМОЖЕННЫЙ представитель с офисом на логистическом таможенном складе. Все представители на месте для управления MIDA и APA",
      },
      {
        icon: asset("wp-content/uploads/2024/06/aduanero.png"),
        title: "ТАМОЖЕННО-ЛОГИСТИЧЕСКИЙ СКЛАД (DAL)",
        text: "В «Colon LogisticsPark (CLP)» есть здание AAA для работы с продуктами и процессами, требующими соблюдения стандартов GMP для фармацевтических, питания, технологий и т.д.",
      },
      {
        icon: asset("wp-content/uploads/2024/06/terminal.png"),
        title: "ПУНКТ КОНТЕЙНЕРЫ CCT",
        text: "Логистический склад и «Colon Container Terminal» расположены в пределах одной концессии на расстоянии 500 метров.",
      },
      {
        icon: asset("wp-content/uploads/2024/06/maritime.png"),
        title: "КОМПЛЕКСНЫЕ МОРСКИЕ СЕРВИСЫ",
        text: "Морские услуги от наших активных торговых партнеров, чтобы интегрировать их в пакет услуг «от двери до двери».",
      },
    ],
    servicesProvidedTag: "СЕРВИСЫ, КОТОРЫЕ МОГУТ БЫТЬ ПРЕДЛОЖЕНЫ КЛИЕНТАМ",
    servicesProvidedTitle: "Предоставляемые сервисы",
    servicesProvidedList: [
      "Сервис фискального складирования грузов",
      "Сервис по маркировке",
      "Сервис «Cross Dock»",
      "Таможенные брокерские сервисы",
      "Сервис по обработке негабаритных грузов",
      "Сервис BAS",
      "Сервис по реэкспорту",
      "Экспедирование и дистрибуция грузов",
      "Сервис по консолидации и деконсолидации грузов",
    ],
    benefitsLeadLeft:
      "Терминал и склад расположены в 500 метрах друг от друга. Перегрузка контейнеров с терминала на склад с помощью собственного оборудования.",
    benefitsLeadRight:
      "Эксклюзивные мини-ворота со двора на склад Операции 7х24 во дворе, на складе",
    benefitCards: [
      {
        eyebrow: "Operacion conectada",
        title: "ЭФФЕКТИВНОСТЬ РАСХОДАХ",
        points: [
          "Снижение транспортных расходов от терминала до склада и обратно.",
          "Нулевая стоимость входящих и исходящих DMC",
          "Снижение возможности расходов пребываний",
          "Более экономичные страховые полисы благодаря более высоким стандартам безопасности",
        ],
      },
      {
        eyebrow: "Flujo 7x24",
        title: "СОКРАЩЕНИЕ ВРЕМЕНИ ВЫПОЛНЕНИЯ",
        points: [
          "Сокращение времени перехода от терминала к DAL (собственное оборудование)",
          "Перевозки на склад 7х24 во избежание простоев на складе.",
          "Операции в кросс-доках выполняются быстрее всего и в тот же день, чтобы соединиться с наземным, морским и воздушным реэкспортом.",
          "Круглосуточный доступ к CLP для выполнения срочных заказов",
        ],
      },
      {
        eyebrow: "Mercancia sensible",
        title: "СНИЖЕНИЕ РИСКОВ ПРИ ОБРАЩЕНИИ С ЧУВСТВИТЕЛЬНЫМИ ТОВАРАМИ",
        points: [
          "Качество материалов, чувствительных к вибрации и чрезмерным нагрузкам, сохраняется оптимально, поскольку переезд с терминала на склад осуществляется через мини-ворота, поддерживаемые наличием негабаритных погрузочных и выравнивающих рамп на всех воротах.",
        ],
      },
      {
        eyebrow: "Marco aduanero",
        title: "ТАМОЖЕННЫЕ БЛАГА",
        points: [
          "Сокращение процедур в SIGA, вход и выход из DAL осуществляется с помощью TI.",
          "Корпус включен в DUCA, чтобы сделать наземную связь с CA",
          "Национальный и таможенный двойной корпус",
          "Сохраняется происхождение товаров",
        ],
      },
    ],
    securityTag: "БЛАГА",
    securityTitle:
      "Персонал службы безопасности обучен процедурам ISPS и BASC.",
    securityChecks: [
      "Весь персонал обеспечен средствами индивидуальной защиты",
      "В DAL есть собственная насосная станция, резервные цистерны для воды объемом 160 000 галлонов для предотвращения пожаров.",
    ],
    securityChecks2: [
      "Инфраструктура DAL оснащена:",
      "Из центра видеонаблюдения ведется круглосуточное наблюдение.",
    ],
    securityChecks2List: [
      "Лазерными детекторами дыма",
      "Пандусы и доклевеллеры на всех дверях для обработки негабаритных грузов",
      "Ограждение по периметру на 360 градусов",
      "Доступ контролируется магнитной картой",
    ],
    warehouse: "Склад компании CLP находится в 500 метрах от набережной",
    galleryTag: "Фотографии интерьера нашей склады",
    galleryTitle: "Imagen industrial, precisa y sobria",
    firePreventionSystem:
      "«CL PHAS» УСТАНОВИЛА СОБСТВЕННУЮ ПРОТИВОПОЖАРНУЮ СИСТЕМУ, СООТВЕТСТВУЮЩУЮ НОРМАМ",
    firePreventionSystem2:
      "NFPA, И РАСПОЛАГАЕТ ЗАПАСОМ ВОДЫ НА 160 000 ГАЛЛОНОВ.",
    contactTag: "Связаться с нами",
    contactTitle: "Póngase en contacto con nosotros",
    contactBody: "Свяжитесь с нами",
    form: {
      name: "Полное имя",
      firstName: "Имя",
      lastName: "Фамилии",
      email: "Электронная почта",
      message: "Сообщение",
      messagePlaceholder: "Describe tu operacion o requerimiento.",
      send: "ОТПРАВЛЯТЬ",
    },
    cards: [
      {
        title: "Ubicacion estrategica",
        text: "Edificio Almacenadora Mercantil, Ojo de Agua, Via Transistmica, Distrito de San Miguelito, Panama.",
      },
      {
        title: "Atencion directa",
        text: "+507 6573 1676",
      },
      {
        title: "Correo corporativo",
        text: "director@alpha-tauro.com",
      },
    ],
    footerCopy: "Copyright © 2026 Alpha Tauro Panama. All rights reserved.",
  },
};

const galleryImages = [
  asset("wp-content/uploads/2024/05/3.jpg"),
  asset("wp-content/uploads/2024/05/11.jpg"),
  asset("wp-content/uploads/2024/05/12.jpg"),
  asset("wp-content/uploads/2024/05/13.jpg"),
  asset("wp-content/uploads/2024/05/14.jpg"),
  asset("wp-content/uploads/2024/05/5.jpg"),
  asset("wp-content/uploads/2024/05/16.jpg"),
  asset("wp-content/uploads/2024/05/17.jpg"),
];

const galleryPreventionSystem = [
  asset("wp-content/uploads/2024/05/18.jpg"),
  asset("wp-content/uploads/2024/05/19.jpg"),
  asset("wp-content/uploads/2024/05/22.jpg"),
  asset("wp-content/uploads/2024/05/20.jpg"),
  asset("wp-content/uploads/2024/05/21.jpg"),
  asset("wp-content/uploads/2024/05/23.jpg"),
];

const flagMap = {
  es: asset("wp-content/uploads/2024/05/es_MX.png"),
  en: asset("wp-content/uploads/2024/05/en_US.png"),
};

const contactFormCopy = {
  tag: "Связаться с нами",
  title: "Свяжитесь с нами",
  name: "Полное имя",
  firstName: "Имя",
  lastName: "Фамилии",
  email: "Электронная почта",
  message: "Сообщение",
  messagePlaceholder: "Describe tu operacion o requerimiento.",
  send: "ОТПРАВЛЯТЬ",
};

const contactMethods = [
  {
    icon: "phone",
    title: "Our Phone",
    text: "+507 6573 1676",
    href: "tel:+50765731676",
  },
  {
    icon: "email",
    title: "Our Email",
    text: "director@alpha-tauro.com",
    href: "mailto:director@alpha-tauro.com",
  },
];

const footerCards = [
  {
    icon: "map",
    text: "Edificio Almacenadora Mercantil, Ojo de Agua, Via Transistmica Distrito de San Miguelito Corregimiento, Panama",
  },
  {
    icon: "phone",
    text: "+507 6573 1676",
  },
  {
    icon: "email",
    text: "director@alpha-tauro.com",
  },
];

function ContactIcon({ name }) {
  const paths = {
    map: (
      <>
        <path d="M20 10c0 5-8 12-8 12s-8-7-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
    ),
    email: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

export default function MirroredPage() {
  const [locale, setLocale] = useState("ru");
  const copy = locales[locale];

  useEffect(() => {
    const previousClassName = document.body.className;
    document.body.className = "alphatauro-body";
    return () => {
      document.body.className = previousClassName;
    };
  }, []);

  return (
    <main className="alphatauro-page">
      <div className="alphatauro-noise" aria-hidden="true" />

      <header className="topbar">
        <div className="topbar__meta">
          <span>{copy.topAddress}</span>
          <span>director@alpha-tauro.com</span>
        </div>
        <a
          className="topbar__social"
          href="https://www.linkedin.com"
          aria-label="LinkedIn"
        >
          in
        </a>
      </header>

      <nav className="navbar">
        <img
          className="navbar__logo"
          src={asset("wp-content/uploads/2024/05/4.png")}
          alt="Alpha Tauro Panama"
        />

        <div className="navbar__actions">
          <a className="pill-button" href="#contacto">
            {copy.contactCta}
          </a>
        </div>
      </nav>

      <section className="hero section-shell">
        <div className="hero__copy">
          <p className="section-tag">{copy.heroTag}</p>
          <h1>{copy.heroTitle}</h1>
        </div>

        <div className="hero__visual">
          <div className="hero__glow" aria-hidden="true" />

          <img
            className="hero__container hero__container--front"
            src={asset(
              "wp-content/uploads/2024/08/CONTENEDOR-ALPHA-TAURO-PANAMA.png",
            )}
            alt="Contenedores Alpha Tauro Panama"
          />
        </div>
      </section>

      <section className="services section-shell Offers-Alpha-contenedor">
        <div className="Offers-Alpha">
          <img
            src={asset(
              "wp-content/uploads/2024/08/CONTENEDOR-ALPHA-TAURO-PANAMA-12.png",
            )}
            alt=""
          />
        </div>

        <div className="services__grid">
          <p className="hero__lead">{copy.offersLead}</p>
          {copy.serviceIntro.map((item) => (
            <article className="service-card" key={item.title}>
              <img src={item.icon} alt="" aria-hidden="true" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="provided">
        <div className="section-shell provided-info">
          <div className="provided__copy">
            <p className="section-tag services-tag">
              {copy.servicesProvidedTag}
            </p>
            <h2>{copy.servicesProvidedTitle}</h2>
            <ul className="provided__list">
              {copy.servicesProvidedList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="provided__visual">
            <img
              className="provided__logo"
              src={asset("wp-content/uploads/2024/08/1.png")}
              alt="Alpha Tauro Panama"
            />
            <div className="provided__icons">
              <img
                src={asset("wp-content/uploads/2024/06/terminal.png")}
                alt=""
                aria-hidden="true"
              />
              <img
                src={asset("wp-content/uploads/2024/06/aduanero.png")}
                alt=""
                aria-hidden="true"
              />
              <img
                src={asset("wp-content/uploads/2024/06/maritime.png")}
                alt=""
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="benefits section-shell">
        <p className="benefit-card__eyebrow">{copy.securityTag}</p>
        <div className="benefits__intro">
          <p>{copy.benefitsLeadLeft}</p>
          <p>{copy.benefitsLeadRight}</p>
        </div>

        <div className="benefits__grid">
          {copy.benefitCards.map((card) => (
            <article className="benefit-card" key={card.title}>
              <h3>{card.title}</h3>
              <ul>
                {card.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="security section-shell">
        <div className="section-heading security-header">
          <p className="section-tag">{copy.securityTag}</p>
          <h2>{copy.securityTitle}</h2>
        </div>

        <div className="security__layout">
          <div className="security__checks">
            {copy.securityChecks.map((item) => (
              <div className="check-card" key={item}>
                <span className="check-card__icon">✓</span>
                <p>{item}</p>
              </div>
            ))}
          </div>

          <div className="security__video">
            <video
              controls
              preload="metadata"
              poster={asset("wp-content/uploads/2024/05/vista.jpg")}
            >
              <source
                src={asset("wp-content/uploads/2024/08/ALPHA-TAURO-PANAMA.mp4")}
                type="video/mp4"
              />
            </video>
          </div>

          <div className="security__checks">
            {copy.securityChecks2.map((item, index) => (
              <div className="check-card" key={item}>
                <span className="check-card__icon">✓</span>
                <p>{item}</p>
                {index == 0 ? (
                  <ul>
                    {copy.securityChecks2List.map((item) => (
                      <li>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="warehouse section-shell">
        <div className="section-heading">
          <p className="section-tag">{copy.warehouse}</p>
        </div>
        <div className="warehouse-img"></div>
      </section>

      <section className="gallery section-shell">
        <div className="section-heading">
          <p className="section-tag">{copy.galleryTag}</p>
        </div>

        <div className="gallery__grid gallery__grid--dense">
          {galleryImages.map((image) => (
            <figure className="gallery__item" key={image}>
              <img src={image} alt="Infraestructura Alpha Tauro Panama" />
            </figure>
          ))}
        </div>
      </section>

      <section className="firesystem section-shell">
        <div>
          <p className="section-tag">{copy.firePreventionSystem}</p>
          <p className="section-tag">{copy.firePreventionSystem2}</p>
        </div>

        <div className="gallery__grid fire__grid--dense">
          {galleryPreventionSystem.map((image) => (
            <figure className="gallery__item" key={image}>
              <img src={image} alt="Infraestructura Alpha Tauro Panama" />
            </figure>
          ))}
        </div>
      </section>

      <section className="contact section-shell" id="contacto">
        <div className="contact__panel contact__panel--info">
          <div className="contact__panel-inner contact__panel-inner--info">
            <p className="section-tag">{contactFormCopy.tag}</p>
            <h2>{contactFormCopy.title}</h2>
            <div className="contact__divider" aria-hidden="true" />

            <div className="contact__methods">
              {contactMethods.map((item) => (
                <article className="contact-method" key={item.title}>
                  <a
                    className="contact-method__icon"
                    href={item.href}
                    aria-label={item.title}
                  >
                    <ContactIcon name={item.icon} />
                  </a>
                  <div>
                    <h3>
                      <a href={item.href}>{item.title}</a>
                    </h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="contact__panel contact__panel--form">
          <div className="background-overlay"></div>
          <div className="contact__panel-inner contact__panel-inner--form">
            <form
              className="contact-form"
              method="post"
              onSubmit={(event) => event.preventDefault()}
            >
              <fieldset className="contact-form__field">
                <legend className="contact-form__label">
                  {contactFormCopy.name}{" "}
                  <span className="contact-form__required">*</span>
                </legend>
                <div className="contact-form__split">
                  <input
                    type="text"
                    name="firstName"
                    placeholder={contactFormCopy.firstName}
                    aria-label={contactFormCopy.firstName}
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder={contactFormCopy.lastName}
                    aria-label={contactFormCopy.lastName}
                    required
                  />
                </div>
              </fieldset>

              <label className="contact-form__field">
                <span className="contact-form__label">
                  {contactFormCopy.email}{" "}
                  <span className="contact-form__required">*</span>
                </span>
                <input type="email" name="email" spellCheck="false" required />
              </label>

              <label className="contact-form__field">
                <span className="contact-form__label">
                  {contactFormCopy.message}
                </span>
                <textarea rows="5" name="message" />
              </label>

              <button type="submit" className="contact-form__submit">
                {contactFormCopy.send}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <img
          className="footer__logo"
          src={asset("wp-content/uploads/2024/05/4.png")}
          alt="Alpha Tauro Panama"
        />

        <div className="footer__cards">
          {footerCards.map((card) => (
            <article className="footer-card" key={`${card.icon}-${card.text}`}>
              <span className="footer-card__icon" aria-hidden="true">
                <ContactIcon name={card.icon} />
              </span>
              <p>{card.text}</p>
            </article>
          ))}
        </div>

        <p className="footer__copyright">
          Copyright © 2022 CEOSNM. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
