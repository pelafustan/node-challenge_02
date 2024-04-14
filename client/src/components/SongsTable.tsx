import { useState } from 'react';
import { Button, Modal, Table } from 'antd'
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { EditForm } from './EditForm';
import useSongs from '../hooks/useSongs';

type Song = {
  id: string;
  title: string;
  artist: string;
  key: string;
}


export const SongsTable = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const showModal = () => {
    setOpen(true);
  };

  const { setSubmitted, submitted, songList } = useSongs();

  const columns = [
    {
      title: 'Song',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Artist',
      dataIndex: 'artist',
      key: 'artist',
    },
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_: any, record: Song) => {
        return (
          <>
            <Button
              style={{
                margin: "0 10px",
              }}
              onClick={() => {
                setId(record.id);
                showModal()
              }}
            >
              <EditFilled />
            </Button>
            <Button
              onClick={async () => {
                await fetch(`http://localhost:8089/songs/${record.id}`, {
                  method: 'DELETE',
                });
                setSubmitted(!submitted);
              }}
            >
              <DeleteFilled />
            </Button>
          </>
        )
      }
    }
  ]

  return (
    <>
      <Table
        dataSource={songList}
        columns={columns}
        style={{
          width: '90%',
        }}
      >
      </Table>

      <Modal
        title='Edit song'
        open={open}
        onCancel={() => setOpen(false)}
        footer={[<Button key='cancel' onClick={() => setOpen(false)}>Cancel</Button>]}
      >
        <EditForm id={id} setModal={setOpen} />
      </Modal>
    </>
  )
};
