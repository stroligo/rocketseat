import './style/global.css';

import { Post } from './components/Post';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import Styles from './App.module.css';

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/stroligo.png',
      name: 'Gabriel Stroligo',
      role: 'Web Developer',
    },
    content: [
      { type: 'paragraph' as 'paragraph' | 'link', content: 'Fala galeraa 👋' },
      {
        type: 'paragraph' as 'paragraph' | 'link',
        content:
          'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
      },
      {
        type: 'link' as 'paragraph' | 'link',
        content: 'jane.design/doctorcare',
      },
    ],
    publishedAt: new Date('2024-10-26 20:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Mayk Brito',
      role: 'Front End Developer',
    },
    content: [
      { type: 'paragraph' as 'paragraph' | 'link', content: 'Fala galeraa 👋' },
      {
        type: 'paragraph' as 'paragraph' | 'link',
        content:
          'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
      },
      {
        type: 'link' as 'paragraph' | 'link',
        content: 'jane.design/doctorcare',
      },
    ],
    publishedAt: new Date('2024-10-23 20:00:00'),
  },
];

export function App() {
  return (
    <>
      <Header />
      <div className={Styles.wrapper}>
        <Sidebar />

        <main>
          {posts.map((post) => (
            <Post
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />
          ))}
        </main>
      </div>
    </>
  );
}
