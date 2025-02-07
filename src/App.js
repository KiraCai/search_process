import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import $ from 'jquery';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <MyComponent/>

      </div>

    </div>
  );
}

export default App;

const MyComponent = () => {
    const [content, setContent] = useState('');
    const [prevContent, setPrevContent] = useState('');

    useEffect(() => {
        // Функция для загрузки контента
        const loadContent = () => {
            console.log('Загрузка контента...');
            $.get('http://localhost:5000/fetch-data')
                .done((data) => {
                    //setContent(data); // Обновляем состояние контента
                    // Получаем содержимое только из элемента с классом .SearchResults-head
                    const newContent = $(data).find('.SearchResults-head').html();
                    console.log('Получены новые данные для .SearchResults-head:', newContent);
                    // Сравниваем с предыдущим содержимым
                    if (newContent !== prevContent) {
                        console.log('Содержимое изменилось!');
                        setPrevContent(newContent); // Обновляем предыдущее содержимое
                        setContent(newContent); // Обновляем состояние контента
                    } else {
                        console.log('Содержимое не изменилось');
                    }
                })
                .fail((err) => {
                    console.error('Ошибка загрузки:', err);
                });
        };

        // Загрузить контент сразу при монтировании компонента
        loadContent();

        // Устанавливаем интервал для обновления контента каждую минуту (60000 миллисекунд)
        const intervalId = setInterval(loadContent, 60000);
        // Очистка интервала при размонтировании компонента
        return () => clearInterval(intervalId);
    }, [prevContent]); // Зависимость от prevContent, чтобы сравнивать изменения


    return (
        <div className="SearchResults-head" dangerouslySetInnerHTML={{ __html: content }} />
    );
};
