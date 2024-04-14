import { Divider, Layout  } from 'antd';

import { SongForm } from './SongForm';
import { SongsTable } from './SongsTable';
import { FastBackwardOutlined, FastForwardOutlined, MenuOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

export const Main = () => {

  return (
    <>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          backgroundColor: '#563457',
          color: '#ddd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          fontFamily: 'Pacifico',
          fontSize: '1.5rem',
        }}
      >
        <div>E-Dreams</div>
        <div><FastBackwardOutlined /> My Repertoir <FastForwardOutlined /></div>
        <div><MenuOutlined /></div>
      </Header>
      <Content
        style={{
          padding: '0 1.5rem',
          margin: '1rem 0',
        }}
      >
        <div
          style={{
            padding: 24,
            backgroundColor: '#fff',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h2>Add new song</h2>
          <SongForm />
          <Divider><h2>Setlist</h2></Divider>
          <SongsTable />
        </div>
      </Content>
      <Footer
        style={{
          backgroundColor: "#563457",
          color: "#ddd",
          textAlign: 'center',
        }}
      >
        E-Dreams ©{new Date().getFullYear()} Created by Pela Fustán
      </Footer>
    </>
  )
}
