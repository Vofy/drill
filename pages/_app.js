import 'styles/App.css';
import 'pages/index.css';
import 'styles/accordion.css';
import 'styles/header.css';
import 'styles/sidebar.css';
import "styles/quiz/answer.css";
import "styles/card.css";
import "styles/quiz/quiz.css";
import 'styles/card.css';

import Header from 'components/layout/header'
import SideBar from 'components/layout/sidebar';

import { RecoilRoot } from 'recoil';
import { MathJaxContext } from 'better-react-mathjax';
import { MantineProvider } from '@mantine/core';


function App({ Component, pageProps }) {

  const mathJaxConfig = {
    dynamic: true
  };

  return (
    <RecoilRoot>
      <MathJaxContext>
        <MantineProvider
          theme={{
            // Override any other properties from default theme
            fontFamily: 'Open Sans, sans serif',
            spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
          }}>
            <div>
              <SideBar/>
              <Header/>
              <Component {...pageProps} />
            </div>
        </MantineProvider>
      </MathJaxContext>
    </RecoilRoot>);
}

export default App;
