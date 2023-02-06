import React from "react";
import "./style.css";
import { useTranslation } from "react-i18next";

const Book = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div>
      <div className="nav-bar">
        <h1>Reading List</h1>
        <select onChange={handleLanguageChange}>
          <option value="en">English (en)</option>
          <option value="es">Spanish (es)</option>
          <option value="cs">Czech (cs)</option>
          <option value="fr">French (fr)</option>
        </select>
      </div>

      <div className="book-cards">
        <div className="row">
          <div className="col">
            <div className="card-image">
              <img
                src="https://books.google.com/books/content?id=GZAoAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                alt="book"
              />
            </div>
            <p>
              <b>Title</b>: {t("title.title1")}
            </p>
            <p>
              <b>Author</b>: {t("author.author1")}
            </p>
            <p>{t("description.description1")}</p>
          </div>
          <div className="col">
            <div className="card-image">
              <img
                src="http://books.google.com/books/content?id=iYOLzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                alt="book"
              />
            </div>
            <p>
              <b>Title</b>: {t("title.title2")}
            </p>
            <p>
              <b>Author</b>: {t("author.author2")}
            </p>
            <p>{t("description.description2")}</p>
          </div>
          <div className="col">
            <div className="card-image">
              <img
                src="http://books.google.com/books/content?id=yFy2MvBbrr4C&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                alt="book"
              />
            </div>
            <p>
              <b>Title</b>: {t("title.title3")}
            </p>
            <p>
              <b>Author</b>: {t("author.author3")}
            </p>
            <p>{t("description.description3")}</p>
          </div>
          <div className="col">
            <div className="card-image">
              <img
                src="http://books.google.com/books/content?id=FIS8swEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                alt="book"
              />
            </div>
            <p>
              <b>Title</b>: {t("title.title4")}
            </p>
            <p>
              <b>Author</b>: {t("author.author4")}
            </p>
            <p>{t("description.description4")}</p>
          </div>
          <div className="col">
            <div className="card-image">
              <img
                src="http://books.google.com/books/content?id=ZlU3DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                alt="book"
              />
            </div>
            <p>
              <b>Title</b>: {t("title.title5")}
            </p>
            <p>
              <b>Author</b>: {t("author.author5")}
            </p>
            <p>{t("description.description5")}</p>
          </div>
          <div className="col">
            <div className="card-image">
              <img
                src="http://books.google.com/books/content?id=Zc4YyAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                alt="book"
              />
            </div>
            <p>
              <b>Title</b>: {t("title.title6")}
            </p>
            <p>
              <b>Author</b>: {t("author.author6")}
            </p>
            <p> {t("description.description6")}</p>
          </div>
        
        </div>
        <div className="row">
          <div className="col">
            <div className="card-image">
              <img
                src="http://books.google.com/books/content?id=FIS8swEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                alt="book"
              />
            </div>
            <p>
              <b>Title</b>: {t("title.title4")}
            </p>
            <p>
              <b>Author</b>: {t("author.author4")}
            </p>
            <p>{t("description.description4")}</p>
          </div>
          <div className="col">
            <div className="card-image">
              <img
                src="http://books.google.com/books/content?id=ZlU3DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                alt="book"
              />
            </div>
            <p>
              <b>Title</b>: {t("title.title5")}
            </p>
            <p>
              <b>Author</b>: {t("author.author5")}
            </p>
            <p>{t("description.description5")}</p>
          </div>
          <div className="col">
            <div className="card-image">
              <img
                src="http://books.google.com/books/content?id=Zc4YyAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                alt="book"
              />
            </div>
            <p>
              <b>Title</b>: {t("title.title6")}
            </p>
            <p>
              <b>Author</b>: {t("author.author6")}
            </p>
            <p> {t("description.description6")}</p>
          </div>
          <div className="col">
            <div className="card-image">
              <img
                src="https://books.google.com/books/content?id=GZAoAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                alt="book"
              />
            </div>
            <p>
              <b>Title</b>: {t("title.title1")}
            </p>
            <p>
              <b>Author</b>: {t("author.author1")}
            </p>
            <p>{t("description.description1")}</p>
          </div>
          <div className="col">
            <div className="card-image">
              <img
                src="http://books.google.com/books/content?id=iYOLzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                alt="book"
              />
            </div>
            <p>
              <b>Title</b>: {t("title.title2")}
            </p>
            <p>
              <b>Author</b>: {t("author.author2")}
            </p>
            <p>{t("description.description2")}</p>
          </div>
          <div className="col">
            <div className="card-image">
              <img
                src="http://books.google.com/books/content?id=yFy2MvBbrr4C&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                alt="book"
              />
            </div>
            <p>
              <b>Title</b>: {t("title.title3")}
            </p>
            <p>
              <b>Author</b>: {t("author.author3")}
            </p>
            <p>{t("description.description2")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
